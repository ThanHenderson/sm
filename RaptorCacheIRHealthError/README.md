# Web driver failure when using CacheIRHealthReport

### Changeset
changeset: FIREFOX_RELEASE_100_BASE

### Mozconfig
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

### Commands
```
export MOZ_DISABLE_CONTENT_SANDBOX=1
```
```
SPEW=CacheIRHealthReport ./mach raptor --browsertime --page-cycles 1 --post-startup-delay 0 --verbose -t jetstream2
```

### Alterations
NoSpew
- SPEW=''

Spew
- SPEW=CacheIRHealthReport with unaltered changeset

SpewNoTrialInline
- Removed #ifdef block from js/src/jit/TrialInlining.cpp
