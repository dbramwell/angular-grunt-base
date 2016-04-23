var angular = require('angular');

var app = angular.module('myApp', ['templates-main']);

app.directive('aGreatEye', function () {
	console.log("Doing this");
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'template.html'
    };
});