#!/bin/bash

set -e

cd trovamascherine/web

yarn install --network-timeout 120000
yarn metarpheus-diff
