describe('Unit testing sub-section directive', function() {
  var $compile,
    $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    var element = $compile('<sub-section></sub-section>')($rootScope);
    $rootScope.$digest();
    expect(element.is('.sub-section')).toEqual(true);
  });

  it('Contains one h2 with correct scope', function() {
  	$rootScope.subSection = {title: 'Test'};
    var element = $compile('<sub-section></sub-section>')($rootScope);
    $rootScope.$digest();
    expect(element.is('.sub-section')).toEqual(true);
    expect(element.children().size()).toEqual(1);
    expect(element.find('h2').text()).toEqual('Test');
  });

  it('Contains one h2 and one p with correct scope', function() {
  	$rootScope.subSection = {title: 'Test', content: ['test']};
    var element = $compile('<sub-section></sub-section>')($rootScope);
    $rootScope.$digest();
    expect(element.is('.sub-section')).toEqual(true);
    expect(element.children().size()).toEqual(2);
    expect(element.find('h2').text()).toEqual('Test');
    expect(element.find('p').text()).toEqual('test');
  });

    it('Contains one h2 and two p with correct scope', function() {
  	$rootScope.subSection = {title: 'Test', content: ['test', 'test 2']};
    var element = $compile('<sub-section></sub-section>')($rootScope);
    $rootScope.$digest();
    expect(element.is('.sub-section')).toEqual(true);
    expect(element.children().size()).toEqual(3);
    expect(element.find('h2').text()).toEqual('Test');
    expect(element.find('p').eq(0).text()).toEqual('test');
    expect(element.find('p').eq(1).text()).toEqual('test 2');
  });

});