#!/usr/bin/env bash
set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if [[ -n $(git status --porcelain) ]]; then
  echo "Aborting, you have uncommited git changes!" 2>&1
  exit 1
fi

if [[ $(git rev-parse --abbrev-ref HEAD) != master ]]; then
  echo "Please check out to master branch first." 2>&1
  exit 1
fi

hugo -D

git checkout publish
cp -R public/* .
git add -A .
git commit -m "Site published at $(date)"
git push -u origin publish

git checkout -