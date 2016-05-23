module.exports = function($scope) {

	$scope.brand = {
		name: 'David Bramwell',
		sref: 'home'
	};
	$scope.buttons = [{
		name: 'Education',
		sref: 'education'
	}, {
		name: 'Expertise',
		sref: 'expertise'
	}];
	$scope.removeHash = function(string) {
        return string.replace("#", '');
    };
};