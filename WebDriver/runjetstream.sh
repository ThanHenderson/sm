#!/bin/bash

echo "THIS SCRIPT IS DEPRECATED. USE run.sh instead."
echo "Running jetstream benchmarks."
timestamp=$(date +"%Y%m%d%H%M%S")
collection_name="jetstream.$1.$timestamp"
connection_string="mongodb://localhost:27017/ir"

export SPEW=CacheIRHealthReport
export SPEW_UPLOAD=1
export MOZ_UPLOAD_DIR="./out/jetstream/$1/$timestamp"
export CACHEIR_LOGS=1
export MOZ_DISABLE_CONTENT_SANDBOX=1

mkdir -p $MOZ_UPLOAD_DIR

node drive.js jetstream $1
# (cd ~/Desktop/sm/sm/JetStream2 && ~/Desktop/sm/mozilla-unified/obj-optdebug-browser-gecko-aarch64-apple-darwin21.2.0/dist/bin/js cli.js $1)


for filename in ./out/jetstream/$1/$timestamp/spew*; do
    mongoimport -c=$collection_name $connection_string --file=$filename --jsonArray
done

mv -iv /tmp/cacheir* $MOZ_UPLOAD_DIR

echo "Output will be found in $MOZ_UPLOAD_DIR"