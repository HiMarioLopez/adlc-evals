#!/usr/bin/env bash
# Reconstruct a sharded markdown report/prompt back into a single flat file.
#
# Shards are split by top-level "##" headings (see scripts/shard-report.sh).
# The `00-header.md` shard contains the H1 + any preamble before the first `##`.
# Subsequent shards are numbered in reading order.
#
# Usage:
#   scripts/reconstruct-report.sh <shard-directory>                 # prints to stdout
#   scripts/reconstruct-report.sh <shard-directory> <output-file>   # writes to file
#
# Examples:
#   scripts/reconstruct-report.sh generated-reports/vercel-aws/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7
#   scripts/reconstruct-report.sh meta-research-prompts/Vercel-AWS-Base-Research-Prompt /tmp/flat.md

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <shard-directory> [output-file]" >&2
  exit 2
fi

dir="$1"
if [[ ! -d "$dir" ]]; then
  echo "Error: '$dir' is not a directory" >&2
  exit 1
fi

shards=()
while IFS= read -r -d '' f; do
  shards+=("$f")
done < <(find "$dir" -maxdepth 1 -type f -name '[0-9]*-*.md' -print0 | sort -z)

if [[ ${#shards[@]} -eq 0 ]]; then
  echo "Error: no shards matching [0-9]*-*.md found in '$dir'" >&2
  exit 1
fi

if [[ $# -eq 2 ]]; then
  cat "${shards[@]}" > "$2"
else
  cat "${shards[@]}"
fi
