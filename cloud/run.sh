#!/bin/sh -e

if [ $# -gt 0 ]; then
    case "$1" in
        shipit)
        shift # command
        ./run.sh serverless deploy
        ;;

        serverless|sls)
        shift # command
        node_modules/.bin/serverless $@
        ;;

        *)
        shift # command
        echo "Invalid command"
        ;;
    esac
else
    echo "Specify a command like 'serverless'."
fi

