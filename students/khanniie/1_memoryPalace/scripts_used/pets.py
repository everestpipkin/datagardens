#!/usr/bin/env python

import os
from os.path import isfile, join

def launch():
    print("this script in incomplete.")

def ask_init():
    print("Looks like PETS isn't set up in this particular folder yet. Would you like to set up? Press (y/n)")

current_dir = os.getcwd()

files = [f for f in os.listdir(current_dir) if isfile(join(current_dir, f))]

if ".memory_palace_history" in files:
    launch();
else: 
    ask_init() 

    
