#!/bin/bash

if [ $# -lt 1]; then
    echo $0: usage: commit branch-name [commit-message]
	exit 1
fi

branch=$1

git add .

if [$# -e 2]; then
	commitMessage=$2
	git commit -m $commitMessage
else
	git commit -m 'End of Day Commit'
fi

git push -u origin $branch


