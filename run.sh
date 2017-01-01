#!/bin/bash

if [ "$OSTYPE" == "msys" ]; then
    start src/GrateBoxBootStrap.html
else
    echo "$OSTYPE"
    open src/GrateBoxBootStrap.html
fi