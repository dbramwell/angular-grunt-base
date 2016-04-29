describe('Unit testing navBar directive', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('myApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<nav-bar></nav-bar>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.hasClass('navbar')).toEqual(true);
  });

  it('Has the correct brand', function() {
    $rootScope.brand = {name: 'Test', href: 'test'}
    // Compile a piece of HTML containing the directive
    var element = $compile("<nav-bar></nav-bar>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.find('.navbar-brand').text()).toEqual('Test');
    expect(element.find('.navbar-brand').attr('href')).toEqual('test');
  });

  it('Has the correct buttons', function() {
    $rootScope.buttons = [{name: 'Button 1', href: 'button1'}, {name: 'Button 2', href: 'button2'}]
    // Compile a piece of HTML containing the directive
    var element = $compile("<nav-bar></nav-bar>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.find('.navbar-nav a').eq(0).text()).toEqual('Button 1');
    expect(element.find('.navbar-nav a').eq(0).attr('href')).toEqual('button1');
    expect(element.find('.navbar-nav a').eq(1).text()).toEqual('Button 2');
    expect(element.find('.navbar-nav a').eq(1).attr('href')).toEqual('button2');
  });

});