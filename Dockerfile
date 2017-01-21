FROM node:slim
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get -qy install xvfb chromium openjdk-7-jre
RUN npm install protractor -g
RUN webdriver-manager update

EXPOSE 3000

CMD bash