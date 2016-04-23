var angular = require('angular');

var app = angular.module('myApp', ['templates-main']);

app.directive('aGreatEye', require('./directives/aGreatEye'));