#!/bin/bash

node Genetic_Algorithm.js > ga_out

#The following line of code was obtained from Indiana University, available at: 
#https://kb.iu.edu/d/acux 
perl -p -e 's/\n/\r\n/' < ga_out > ga_out.txt