#!/bin/bash

if [ $# -lt 1]; then
    echo $0: usage: commit branch-name [commit-message]
	exit 1
fi

branch=$1

git add .

if [$# -eq 2]; then
	git commit -m "$2"
else
	git commit -m 'End of Day Commit'
fi

git push -u origin $branch


