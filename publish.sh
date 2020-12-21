#!/usr/bin/env bash
set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [[ -n $(git status --porcelain) ]]; then
  echo "Aborting, you have uncommited git changes!" 2>&1
  exit 1
fi

hugo -D

temp_dir=$(mktemp -d)
trap "rm -f $temp_dir" EXIT

cp -R "$SCRIPT_DIR/public" "$temp_dir"
git checkout publish
cp -R "$temp_dir/public/*" .
git add -A .
git commit -m "Site published at $(date)"
git push

git checkout -