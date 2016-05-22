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

  describe('$scope.buttons', function() {
    it('buttons are set to correct value', function() {
      var $scope = {};
      var controller = $controller('MainNavController', {
        $scope: $scope
      });
      expect($scope.buttons[0].name).toEqual('Education');
      expect($scope.buttons[0].sref).toEqual('education');
    });
  });
});