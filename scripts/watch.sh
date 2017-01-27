docker rm watcher
docker run -d --name=watcher -v $(pwd):/usr/src/app -w /usr/src/app node:slim npm run watch