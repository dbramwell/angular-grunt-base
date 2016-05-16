describe('Unit testing home page directive', function() {
  var $compile,
    $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    var element = $compile("<home-page></home-page>")($rootScope);
    $rootScope.$digest();
    expect(element.is('#home-page')).toEqual(true);
  });

  it('Home page contains 4 links', function() {
    var element = $compile("<home-page></home-page>")($rootScope);
    $rootScope.$digest();
    expect(element.find('a').size()).toEqual(4);
  });

  it('Home page header contains my name', function() {
    var element = $compile("<home-page></home-page>")($rootScope);
    $rootScope.$digest();
    expect(element.find('h1').html()).toEqual('David<br>Bramwell');
  });

});