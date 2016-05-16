describe('education Controller', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.info', function() {
    it('info is set to correct value', function() {
      var $scope = {};
      var controller = $controller('Education', {
        $scope: $scope
      });
      expect($scope.info).toEqual([{
        title: 'EDUCATION',
        subContent: [{
          title: 'A-LEVELS',
          content: [
            'Maths: A',
            'Further Maths: A',
            'Physics: C'
          ]
        }, {
          title: 'DEGREE',
          content: ['2:2 BSC Degree in Mathematics from Nottingham University']
        }]
      }]);
    });
  });
});