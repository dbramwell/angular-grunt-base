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
		.state('expertise', {
			url: '/expertise',
			templateUrl: 'info.html',
			controller: 'Expertise',
			data: {
				bodyClass: 'expertise'
			}
		})
		.state('contactMe', {
			url: '/contactMe',
			templateUrl: 'emailForm.html',
			controller: 'ContactMe',
			data: {
				bodyClass: 'contactMe'
			}
		})
};