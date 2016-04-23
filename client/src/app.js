window.jQuery = window.$ = require("jquery");
require('bootstrap');
var angular = require('angular');

var app = angular.module('myApp', ['templates-main']);

app.directive('aGreatEye', require('./directives/aGreatEye'));
app.directive('navBar', require('./directives/navBar'));