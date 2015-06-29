#!/usr/bin/env bash

# This script will test the PRNG using DieHarder. Note that this will take a
# really long time, and that it will use up about 5 GB of disk space.
#
# For information on how to install DieHarder:
# https://gist.github.com/blixt/9abfafdd0ada0f4f6f26
#
# For more information about DieHarder, visit:
# http://www.phy.duke.edu/~rgb/General/dieharder.php

# Generate PRNG output
node dieharder.js

# Test the output
dieharder -g 202 -f dieharder.txt -a
