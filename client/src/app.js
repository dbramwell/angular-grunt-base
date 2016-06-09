window.jQuery = window.$ = require("jquery");
require('bootstrap');
var angular = require('angular');
require('angular-ui-router');
require('ngalertify');

function easeInOutQuint(t) {
	return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};

var app = angular.module('myApp', ['templates-main', 'ui.router', "ngAlertify"]);

app.run(['$rootScope', '$state',
    function ($rootScope, $state) {
        $rootScope.$state = $state;
    }
]);

app.controller('MainNavController', ['$scope', require('./controllers/mainNav')]);
app.directive('navBar', require('./directives/navBar'));

app.controller('MainCarouselController', ['$scope', require('./controllers/mainCarousel')]);
app.directive('carousel', require('./directives/carousel'));

app.directive('subSection', require('./directives/subSection'));

app.controller('Education', ['$scope', require('./controllers/education')]);
app.controller('Expertise', ['$scope', require('./controllers/expertise')]);
app.controller('ContactMe', ['$scope', 'alertify', '$http', require('./controllers/contactMe')]);

app.config(require('./routing'));