#!/bin/bash
BENCH=""
TESTNAME=""
RUNNER="browser"

if [ "$1" = "speedometer" ]; then
    echo "Running speedometer benchmarks."
    BENCH="speedometer"
    TESTNAME=all
elif [ "$1" = "jetstream" ]; then
    echo "Running jetstream benchmarks."
    BENCH="jetstream"

    if [ "$3" = "cli" ]; then
        echo "Running jetstream tests in the cli"
        RUNNER="cli"
    fi

    if [ "$2" != "" ]; then
        echo "Running test: $2"
        TESTNAME=$2
    else
        echo "Please specify test. e.g. ./run.sh jetstream Air"
        exit 1
    fi

else
    echo "Please specify benchmark (jetstream or speedometer) e.g. ./run.sh jetstream"
    exit 1
fi

timestamp=$(date +"%Y%m%d%H%M%S")
collection_name="$BENCH.$TESTNAME.$timestamp"
connection_string="mongodb://localhost:27017/ir"

export SPEW=CacheIRHealthReport,OnAttach
export SPEW_UPLOAD=1
export MOZ_UPLOAD_DIR="./out/$BENCH/$TESTNAME/$timestamp"
export CACHEIR_LOGS=1
export MOZ_DISABLE_CONTENT_SANDBOX=1

mkdir -p $MOZ_UPLOAD_DIR

if [ "$RUNNER" = "cli" ]; then
    (cd ~/Desktop/sm/sm/JetStream2 && ~/Desktop/sm/mozilla-unified/obj-optdebug-browser-gecko-aarch64-apple-darwin21.2.0/dist/bin/js cli.js $TESTNAME)
else
    node drive.js $BENCH $TESTNAME
fi

for filename in ./out/$BENCH/$TESTNAME/$timestamp/spew*; do
    mongoimport -c=$collection_name $connection_string --file=$filename --jsonArray
done

echo "Output will be found in $MOZ_UPLOAD_DIR"
mv -iv /tmp/cacheir* $MOZ_UPLOAD_DIR
