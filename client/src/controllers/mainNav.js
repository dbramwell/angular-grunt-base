module.exports = function($scope) {

	$scope.brand = {
		name: 'David Bramwell',
		sref: 'home'
	};
	$scope.left = {
		buttons: [{
			name: 'Education',
			sref: 'education'
		}, {
			name: 'Expertise',
			sref: 'expertise'
		}]
	};
	$scope.right = {
		buttons: [{
			name: 'Contact Me',
			sref: 'contactMe'
		}]
	};
	$scope.removeHash = function(string) {
		return string.replace("#", '');
	};
};