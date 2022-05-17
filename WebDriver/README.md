#Firefox Webdriver

```sh
npm i selenium-webdriver
```

```sh
./run drive.js <benchmark>
```
where benchmark is either *speedometer* or *jetstream*

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
hg up FIREFOX_BETA_100_BASE
./mach build
```

### Versions
npm:  8.5.5
node: v16.15.0 (this will not work with node v18)

### Notes
Ensure that */tmp/* is free from all *cacheir\** files before running the
script. If if ever the script exits unexpectedly, remove those same files.
