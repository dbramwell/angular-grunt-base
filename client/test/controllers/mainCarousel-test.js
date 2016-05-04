describe('mainCarousel Controller', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.slides', function() {
    it('pictures is set to correct value', function() {
      var $scope = {};
      var controller = $controller('MainCarouselController', {
        $scope: $scope
      });
      expect($scope.slides).toEqual([{
        image: '1.jpg',
        alt: 'David Bramwell'
      }, {
        image: '2.jpg',
        alt: 'David Bramwell'
      }, {
        image: '3.jpg',
        alt: 'David Bramwell'
      }]);
    });
  });
});