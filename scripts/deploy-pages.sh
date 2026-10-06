#!/usr/bin/env bash
# Build the static export and publish out/ to the gh-pages branch.
#
# Used instead of a GitHub Actions workflow because the local gh token has no
# `workflow` scope (it cannot push workflow files). Run it from a clean tree:
#
#   ./scripts/deploy-pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."

repo=$(basename -s .git "$(git remote get-url origin)")
PAGES_BASE_PATH="/${repo}" \
NEXT_PUBLIC_SITE_URL="https://levicohezy.github.io/${repo}" \
npm run build
touch out/.nojekyll
# The export copies all of public/, including the raw library and the
# references that are not part of the site. Keep only what the pages use.
rm -rf out/images/all out/videos/all out/inspiration

rev=$(git rev-parse --short HEAD)
cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy ${rev}"
git push -q -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
echo "Published ${rev} to gh-pages"
