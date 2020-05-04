#!/bin/sh

set -e
set -x

apt-get update
apt-get install -y jq

BRANCH=$(cat ../.git/resource/metadata.json | jq -r '.[] | select(.name == "head_name").value')

NODE_ENV=production yarn build

mv build/index.html build/$BRANCH.html
