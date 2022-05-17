#!/bin/bash

BENCH=""
if [ "$1" = "speedometer" ]; then
    echo "Running speedometer benchmarks."
    BENCH="speedometer"
elif [ "$1" = "jetstream" ]; then
    echo "Running jetstream benchmarks."
    BENCH="jetstream"
else
    echo "Please specify benchmark (jetstream or speedometer) e.g. ./run.sh jetstream"
    exit 1
fi

export SPEW=CacheIRHealthReport
export SPEW_UPLOAD=1
export MOZ_UPLOAD_DIR="./out/$BENCH"
export CACHEIR_LOGS=1
export MOZ_DISABLE_CONTENT_SANDBOX=1

mkdir -p $MOZ_UPLOAD_DIR

node drive.js $BENCH

echo "Output will be found in $MOZ_UPLOAD_DIR"
mv -iv /tmp/cacheir* $MOZ_UPLOAD_DIR
