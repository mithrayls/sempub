#!/bin/sh

repo_name=$1
github_username="mithrayls"
test -z $repo_name && echo "Repo name required." 1>&2 && exit 1

curl -u "${github_username}" https://api.github.com/user/repos -d "{\"name\":\"$repo_name\"}"

echo "# ${repo_name}" >> README.md
echo "node_modules" >> .gitignore
git init
git add .
git commit -m "first commit"
git remote add origin git@github.com:${github_username}/${repo_name}.git
git push -u origin master
