#!/usr/bin/env bash

# This script will test the PRNG using Dieharder. Note that this will take a
# really long time, and that it will use up about 5 GB of disk space.
#
# For information on how to install Dieharder:
# https://gist.github.com/blixt/9abfafdd0ada0f4f6f26
#
# For more information about Dieharder, visit:
# http://www.phy.duke.edu/~rgb/General/dieharder.php

# Generate PRNG output
node dieharder.js

# Test the output
dieharder -g 202 -f dieharder.txt -a
