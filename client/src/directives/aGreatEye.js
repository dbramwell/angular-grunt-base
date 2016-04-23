module.exports = function () {
	console.log("Doing this");
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'template.html'
    };
}