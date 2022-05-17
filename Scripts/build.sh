#!/bin/bash

if [ "$1" == "shell" ]; then
    export MOZCONFIG=/Users/than/Development/sm/mozconfigs/opt_shell.mozconfig
else
    export MOZCONFIG=/Users/than/Development/sm/mozconfigs/opt_browser_debug_geckodriver.mozconfig
fi

CURR_PATH=`pwd`
PATH_TO_MOZ="/Users/than/Development/sm/mozilla-unified"

cd $PATH_TO_MOZ
hg up FIREFOX_BETA_100_BASE
./mach build
cd $CURR_PATH
