docker run --name=myapp -v $(pwd):/usr/src/app -d -w /usr/src/app -p 3000:3000 node:slim npm start