# Firefox Webdriver

### Setup
```sh
npm i selenium-webdriver
```

### Usage
```sh
./run.sh <benchmark> <testname> [runner]
```
where 
- `benchmark` is either *speedometer* or *jetstream*
- `testname` is the name of the test (specific to each benchmark)
  - to run the default test suite, use `default`
  <!-- - to run all tests, individually, use `all` -->
- `runner` is either *browser* or *cli* (only for jetstream, defaults to *browser*)

### mozilla-unified Build
MOZCONFIG
```
ac_add_options --enable-js-shell

ac_add_options --enable-optimize
ac_add_options --enable-debug
ac_add_options --enable-warnings-as-errors
ac_add_options --enable-ccache=ccache
ac_add_options --enable-tests
ac_add_options --enable-geckodriver
ac_add_options --enable-jitspew

# Dump opt builds into another dir.
mk_add_options MOZ_OBJDIR=@TOPSRCDIR@/obj-optdebug-browser-gecko-@CONFIG_GUESS@

mk_add_options AUTOCLOBBER=1
```
```
hg up FIREFOX_RELEASE_100_BASE
./mach build
```

### Versions
npm:  8.5.5
node: v16.15.0 (this will not work with node v18)

### Notes
Ensure that */tmp/* is free from all *cacheir\** files before running the
script. If if ever the script exits unexpectedly, remove those same files.
