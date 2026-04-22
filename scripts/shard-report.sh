#!/usr/bin/env bash
# Shard a large markdown report/prompt into numbered section files.
#
# Splits input file at every top-level `## ` heading (markdown H2).
# Content before the first H2 becomes `00-header.md` (keeps H1 and preamble).
# Each H2 section becomes `NN-<kebab-slug>.md`, where NN is a zero-padded
# sequential index and the slug is derived from the heading text.
#
# Also generates an `index.md` with a table of contents listing every shard
# and its line count, plus a reconstruction hint.
#
# Byte-identity: `cat NN-*.md` reproduces the input file exactly. The script
# verifies this with `diff` before exiting non-zero.
#
# Usage:
#   scripts/shard-report.sh <input-file.md> <output-directory>
#
# Example:
#   scripts/shard-report.sh \
#     generated-reports/vercel-aws/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7.md \
#     generated-reports/vercel-aws/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <input-file.md> <output-directory>" >&2
  exit 2
fi

src="$1"
out="$2"

if [[ ! -f "$src" ]]; then
  echo "Error: input file '$src' does not exist" >&2
  exit 1
fi

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
reconstruct="$script_dir/reconstruct-report.sh"

mkdir -p "$out"

# Use awk to do the splitting. It:
#   - Writes the H1 + preamble (lines up to but not including the first `## `) into 00-header.md
#   - Starts a new shard at every `## ` line, numbered 01, 02, ...
#   - Derives a slug from the heading text (lowercase, alnum + hyphens)
#   - Writes each shard into the target directory
#   - Emits a tab-separated manifest (number<TAB>title<TAB>filename<TAB>lines) on stderr for the TOC
awk -v outdir="$out" '
  function slugify(s,    t) {
    t = tolower(s)
    sub(/^[0-9]+[a-z]?\.?[ \t)]+/, "", t)
    gsub(/[^a-z0-9]+/, "-", t)
    sub(/^-+/, "", t)
    sub(/-+$/, "", t)
    if (length(t) > 60) t = substr(t, 1, 60)
    sub(/-+$/, "", t)
    return t
  }
  function close_current() {
    if (current_file != "") {
      close(current_file)
    }
  }
  BEGIN {
    idx = 0
    current_file = outdir "/00-header.md"
    current_title = "Header & preamble"
    line_count = 0
  }
  /^## / {
    # Emit manifest line for the section we just finished
    printf("%02d\t%s\t%s\t%d\n", idx, current_title, current_file, line_count) > "/dev/stderr"
    close_current()

    idx++
    title = $0
    sub(/^## +/, "", title)
    slug = slugify(title)
    if (slug == "") slug = "section"
    current_file = sprintf("%s/%02d-%s.md", outdir, idx, slug)
    current_title = title
    line_count = 0
  }
  {
    print $0 > current_file
    line_count++
  }
  END {
    printf("%02d\t%s\t%s\t%d\n", idx, current_title, current_file, line_count) > "/dev/stderr"
    close_current()
  }
' "$src" 2> "$out/.manifest.tsv"

if ! diff -q "$src" <("$reconstruct" "$out") > /dev/null; then
  echo "FATAL: reconstruction does not match source. Aborting." >&2
  echo "Diff:" >&2
  diff "$src" <("$reconstruct" "$out") | head -40 >&2
  exit 3
fi

h1="$(grep -m1 -E '^# ' "$src" | sed -E 's/^# +//')"
if [[ -z "$h1" ]]; then
  h1="$(basename "$src" .md)"
fi

total_lines="$(wc -l < "$src" | tr -d ' ')"
shard_count="$(wc -l < "$out/.manifest.tsv" | tr -d ' ')"
src_basename="$(basename "$src")"

{
  echo "# $h1"
  echo
  echo "> **Sharded for editability.** This report was split at every \`##\` heading to keep each file small enough for agent edit tooling."
  echo "> To reconstruct the flat file byte-for-byte: \`scripts/reconstruct-report.sh <this-directory>\`"
  echo
  echo "**Source:** \`$src_basename\` · **Total:** $total_lines lines across $shard_count shards"
  echo
  echo "## Sections"
  echo
  echo "| # | Section | File | Lines |"
  echo "|---|---------|------|-------|"
  while IFS=$'\t' read -r num title file lines; do
    filename="$(basename "$file")"
    title_escaped="${title//|/\\|}"
    if [[ "$num" == "00" ]]; then
      num_display="—"
    else
      num_display="$((10#$num))"
    fi
    echo "| $num_display | $title_escaped | [$filename]($filename) | $lines |"
  done < "$out/.manifest.tsv"
} > "$out/index.md"

rm -f "$out/.manifest.tsv"

echo "Sharded $src → $out"
echo "  Shards: $shard_count  ·  Total: $total_lines lines  ·  Verified: byte-identical reconstruction"
