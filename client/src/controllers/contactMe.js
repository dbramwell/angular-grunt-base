module.exports = function($scope, alertify, $http) {

	$scope.contact = {};

	$scope.send = function() {
		alertify.confirm("Do you want to send an email from:<br>" +
			$scope.contact.name + "<br>" +
			$scope.contact.email, onOk);
	};

	function onOk() {
		alertify.maxLogItems(1).delay(0).log("Sending Message");
		$http.post('/sendEmail', $scope.contact).then(emailSent, emailNotSent);
		$scope.$apply(function() {
			$scope.contact = {};
			$scope.emailForm.$setPristine();
			$scope.emailForm.$setUntouched();
		});
	};

	function emailSent() {
		alertify.maxLogItems(1).delay(5000).success("Message Sent");
	};

	function emailNotSent() {
		alertify.maxLogItems(1).delay(5000).error("Message Not Sent");
	};
};