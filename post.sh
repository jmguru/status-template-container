#!/bin/sh
HERE=$(pwd)

MYSQL_CONTAINER=status-template_dbserver_1

docker cp $HERE/setup.sql $MYSQL_CONTAINER:/
docker cp $HERE/setup.sh $MYSQL_CONTAINER:/
docker exec -it $MYSQL_CONTAINER "./setup.sh"
