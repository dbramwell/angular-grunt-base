window.jQuery = window.$ = require("jquery");
require('bootstrap');
var angular = require('angular');

var app = angular.module('myApp', ['templates-main']);

app.controller('MainNavController', ['$scope', require('./controllers/mainNav')]);
app.directive('navBar', require('./directives/navBar'));

app.controller('MainCarouselController', ['$scope', require('./controllers/mainCarousel')])
app.directive('carousel', require('./directives/carousel'));


app.directive('homePage', require('./directives/homePage'));