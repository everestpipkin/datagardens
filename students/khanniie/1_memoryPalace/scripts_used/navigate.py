#!/usr/bin/env python

import os
from os.path import isfile, join
from stat import * # ST_SIZE etc
import time

import subprocess

current_dir_full = os.getcwd()
str2 = current_dir_full.split('/')
n = len(str2)
current_dir = str2[n-1]

DIALOGUE = "From your current location, you can navigate to the below places. \nPlease type the number of your selection.\n"  

PATH_TO_SCRIPTS = "/Users/connieye/scripts/"

PATH_TO_COMMON_AREA = "/Users/connieye/Documents/memory_palace/"
COMMON_AREA = "common area/"

map = {"outside" : ["common area"], 
       "common area" : ["connie's room", "bathroom", "evelyn's room", "alyssa's room", "outside"],
       "connie's room" : ["common area"],
       "bathroom" : ["common area"],
       "evelyn's room" : ["common area"],
       "alyssa's room" : ["common area"]}

map_images_dict = {"connie's room" : PATH_TO_SCRIPTS + "map-connie.txt", 
                   "common area" : PATH_TO_SCRIPTS + "map-common-area.txt", 
                   "bathroom": PATH_TO_SCRIPTS + "map-bathroom.txt",
                   "evelyn's room" : PATH_TO_SCRIPTS + "map-evelyn.txt",
                   "alyssa's room" : PATH_TO_SCRIPTS + "map-alyssa.txt",
                   "outside" : PATH_TO_SCRIPTS + "map-home.txt"};

map_of_paths = {"outside" : PATH_TO_COMMON_AREA, 
                   "common area" : PATH_TO_COMMON_AREA + COMMON_AREA, 
                   "bathroom": PATH_TO_COMMON_AREA + COMMON_AREA + "bathroom",
                   "evelyn's room" : PATH_TO_COMMON_AREA + COMMON_AREA + "evelyn's room",
                   "alyssa's room" : PATH_TO_COMMON_AREA + COMMON_AREA + "alyssa's room",
                   "connie's room" : PATH_TO_COMMON_AREA + COMMON_AREA + "connie's room"};

if current_dir not in map_images_dict.keys():
    current_dir = "outside"

with open(map_images_dict[current_dir], 'r') as f:
    print(f.read())

print(DIALOGUE)
options = map[current_dir]

for idx, p in enumerate(options):
    print(str(idx + 1) + ": " + p + "\n")

response_str = input("Your selection: ")

if str.isdigit(response_str): 
    response = int(response_str) - 1
    if response < 0 or response >= len(options):
        print("Invalid number! Please try again.")
    else:
        print("\nWALKING...\n")
        time.sleep(0.5)
        print("WALKING...\n")
        time.sleep(0.5)
        print("WALKING...\n\n")
        time.sleep(0.5)
        print("...arrived!")
        with open(map_images_dict[options[response]], 'r') as f:
            print(f.read())
        os.chdir(map_of_paths[options[response]])
        os.system("/bin/bash")
else: 
    print("Your input was invalid (negative value, not a number, etc...)")
