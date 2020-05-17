#!/bin/sh

set -e
set -x

apt-get update
apt-get install -y jq

BRANCH=$(cat ../.git/resource/metadata.json | jq -r '.[] | select(.name == "head_name").value')

NODE_ENV=production yarn build

mv build/index.html build/$BRANCH.html

echo "👀 A new preview is available at\nhttp://trovamascherine.preview.our.buildo.io/$BRANCH.html" > ../../preview/pr_comment
