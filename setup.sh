#!/bin/sh

set -e
sleep 5 
mysql -u "root" "-p1234" < /setup.sql
