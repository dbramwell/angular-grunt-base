FROM node:slim
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get -qy install xvfb chromium openjdk-7-jre bzip2
RUN npm install protractor ng-html2js browserify -g
RUN webdriver-manager update

EXPOSE 3000

CMD bash