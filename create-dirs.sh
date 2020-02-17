#!/bin/bash

# This script auto-creates a list of directories containing index barrel-files.
# Jason Lewis 7/1/2020
# v1

# Store parameters as directories list.
DIRS=$*

# Check for parameters and create defaults if none.

if [ -z $1 ] ; then
  DIRS="components containers services directives constants models enums guards utils helpers pipes interceptors"
fi

echo "creating directories: $DIRS"

# For loop that takes parameters from the command line as directory names to create
FILENAME="index.ts"
for i in $DIRS ; do
	mkdir -p $i
	touch $i/"$FILENAME"
done
