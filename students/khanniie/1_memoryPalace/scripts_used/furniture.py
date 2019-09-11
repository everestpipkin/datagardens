#!/usr/bin/env python

import os
from os.path import isfile, join
from stat import * # ST_SIZE etc

current_dir = os.getcwd()

files = [f for f in os.listdir(current_dir) if isfile(join(current_dir, f))]

for f in files:
    if f != ".DS_Store":
     print("\n__________________________________________________\n")
     print(f + " is " + str(os.stat(f)[ST_SIZE]) + "lbs\n")
     with open(f, 'r') as f:
         print(f.read())

print("______________________________________________\n")
