#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
docker-compose -f  ./local-db/docker-compose.yml up -d
