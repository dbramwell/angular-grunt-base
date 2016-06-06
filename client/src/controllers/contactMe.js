module.exports = function($scope, alertify) {
	$scope.send = function(contact) {
        alertify.confirm("Do you want to send an email from:<br>" +
        	$scope.contact.name + "<br>" +
        	$scope.contact.email);
    };
};