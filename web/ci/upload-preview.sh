#!/bin/sh

set -e

export AWS_DEFAULT_REGION="eu-central-1"

aws s3 sync build s3://trovamascherine.preview.our.buildo.io/ --acl public-read --exclude "*.gz"
aws s3 sync build s3://trovamascherine.preview.our.buildo.io/ --acl public-read --content-encoding gzip --exclude '*' --include '*.gz'
