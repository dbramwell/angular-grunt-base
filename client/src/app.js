window.jQuery = window.$ = require("jquery");
require('bootstrap');
var angular = require('angular');
require('angular-scroll');

function easeInOutQuint(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t };

var app = angular.module('myApp', ['templates-main', 'duScroll']);

app.controller('MainNavController', ['$scope', require('./controllers/mainNav')]);
app.directive('navBar', require('./directives/navBar'));

app.controller('MainCarouselController', ['$scope', require('./controllers/mainCarousel')]);
app.directive('carousel', require('./directives/carousel'));

app.directive('homePage', require('./directives/homePage'));

app.directive('info', require('./directives/info'));

app.directive('subSection', require('./directives/subSection'));

app.controller('Education', ['$scope', require('./controllers/education')]);

app.value('duScrollDuration', 1000).value('duScrollOffset', 50).value('duScrollEasing', easeInOutQuint);