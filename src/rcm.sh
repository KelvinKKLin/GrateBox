#!/bin/bash

node Car_Model.js > cm_out

#The following line of code was obtained from Indiana University, available at:
#https://kb.iu.edu/d/acux
perl -p -e 's/\n/\r\n/' < cm_out > cm_out.txt