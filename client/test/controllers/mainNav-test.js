describe('mainNav Controller', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.brand', function() {
    it('brand is set to correct value', function() {
      var $scope = {};
      var controller = $controller('MainNavController', {
        $scope: $scope
      });
      expect($scope.brand.name).toEqual('David Bramwell');
      expect($scope.brand.sref).toEqual('home');
    });
  });

  describe('$scope.left.buttons', function() {
    it('buttons are set to correct value', function() {
      var $scope = {};
      var controller = $controller('MainNavController', {
        $scope: $scope
      });
      expect($scope.left.buttons[0].name).toEqual('Education');
      expect($scope.left.buttons[0].sref).toEqual('education');
      expect($scope.left.buttons[1].name).toEqual('Expertise');
      expect($scope.left.buttons[1].sref).toEqual('expertise');
    });
  });

  describe('$scope.right.buttons', function() {
    it('buttons are set to correct value', function() {
      var $scope = {};
      var controller = $controller('MainNavController', {
        $scope: $scope
      });
      expect($scope.right.buttons[0].name).toEqual('Contact Me');
      expect($scope.right.buttons[0].sref).toEqual('contactMe');
    });
  });
});