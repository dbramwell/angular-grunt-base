module.exports = function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'homePage.html'
		})
		.state('education', {
			url: '/education',
			templateUrl: 'info.html',
			controller: 'Education',
			data: {
				bodyClass: 'education'
			}
		})
};