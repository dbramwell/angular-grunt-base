module.exports = function($scope) {
	$scope.brand = {
		name: 'David Bramwell',
		href: '#home-page'
	};
	$scope.buttons = [{
		name: 'Education',
		href: '#education'
	}];
	$scope.removeHash = function(string) {
        return string.replace("#", '');
    };
};