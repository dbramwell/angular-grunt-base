describe('education Controller', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
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
          title: 'DEGREE',
          content: ['2:2 BSC Degree in Mathematics from Nottingham University']
        }, {
          title: 'A-LEVELS',
          content: [
            'Maths: A',
            'Further Maths: A',
            'Physics: C'
          ]
        }, {
          title: 'GCSEs',
          content: [
            'Maths: A*',
            'Biology: A',
            'Chemistry: A',
            'Physics: A',
            'French: A',
            'Spanish: A',
            'English Language: B',
            'English Literature: B',
            'Latin: B',
            'Information Technology: B',
            'Religious Education: C'
          ]
        }]
      }]);
    });
  });
});