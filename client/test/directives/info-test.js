describe('Unit testing info directive', function() {
  var $compile,
    $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    var element = $compile("<info></info>")($rootScope);
    $rootScope.$digest();
    expect(element.is('.info')).toEqual(true);
  });

  it('Contains exactly one h1 with correct scope', function() {
    $rootScope.info = [{
      title: 'Title'
    }]
    var element = $compile("<info></info>")($rootScope);
    $rootScope.$digest();
    expect(element.find('div').size()).toEqual(1);
    expect(element.find('div').children().size()).toEqual(1);
    expect(element.find('div h1').text()).toEqual('Title');
  });

  it('Contains exactly one h1 and one p with correct scope', function() {
    $rootScope.info = [{
      title: 'Title',
      content: 'This is some test content'
    }]
    var element = $compile("<info></info>")($rootScope);
    $rootScope.$digest();
    expect(element.find('div').size()).toEqual(1);
    expect(element.find('div').children().size()).toEqual(2);
    expect(element.find('div h1').text()).toEqual('Title');
    expect(element.find('div p').text()).toEqual('This is some test content');
  });

  it('Contains exactly one h1 and one div with correct scope', function() {
    $rootScope.info = [{
      title: 'Title',
      subContent: [{}]
    }]
    var element = $compile("<info></info>")($rootScope);
    $rootScope.$digest();
    expect(element.find('div h1').text()).toEqual('Title');
    expect(element.find('div div.sub-section').size()).toEqual(1);
  });

  it('Contains exactly one h1, one p, and two sub-sections with correct scope', function() {
    $rootScope.info = [{
      title: 'Title',
      content: 'Some content',
      subContent: [{}, {}]
    }];
    var element = $compile("<info></info>")($rootScope);
    $rootScope.$digest();
    expect(element.find('div h1').text()).toEqual('Title');
    expect(element.find('div p').text()).toEqual('Some content');
    expect(element.find('div div.sub-section').size()).toEqual(2);
  });

});