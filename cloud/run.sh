#!/bin/sh -e

if [ $# -gt 0 ]; then
    case "$1" in
        shipit)
        shift # command
        ./run.sh build
        ./run.sh serverless deploy
        ;;

        build|tsc)
        shift # command
        node_modules/.bin/tsc $@
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
    echo "Specify a command like 'build' or 'serverless'."
fi

