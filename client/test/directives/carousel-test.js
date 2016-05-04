describe('Unit testing carousel directive', function() {
  var $compile,
    $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    var element = $compile("<carousel></carousel>")($rootScope);
    $rootScope.$digest();
    expect(element.is('#myCarousel')).toEqual(true);
  });

  it('Has the correct number of pictures', function() {
    $rootScope.slides = [{
      image: 'test.png',
      alt: 'Slide 1'
    }, {
      image: 'test2.png',
      alt: 'Slide 2'
    }];
    var element = $compile("<carousel></carousel>")($rootScope);
    $rootScope.$digest();
    expect(element.find('.item').size()).toEqual(2);
  });

  it('Has the correct number of indicators', function() {
    $rootScope.slides = [{
      image: 'test.png',
      alt: 'Slide 1'
    }, {
      image: 'test2.png',
      alt: 'Slide 2'
    }];
    var element = $compile("<carousel></carousel>")($rootScope);
    $rootScope.$digest();
    expect(element.find('.carousel-indicators li').size()).toEqual(2);
  });

  it('First picture is active', function() {
    $rootScope.slides = [{
      image: 'test.png',
      alt: 'Slide 1'
    }, {
      image: 'test2.png',
      alt: 'Slide 2'
    }];
    var element = $compile("<carousel></carousel>")($rootScope);
    $rootScope.$digest();
    expect(element.find('.item').eq(0).hasClass('active')).toEqual(true);
    expect(element.find('.item').eq(1).hasClass('active')).toEqual(false);
  });

  it('First indicator is active', function() {
    $rootScope.slides = [{
      image: 'test.png',
      alt: 'Slide 1'
    }, {
      image: 'test2.png',
      alt: 'Slide 2'
    }];
    var element = $compile("<carousel></carousel>")($rootScope);
    $rootScope.$digest();
    expect(element.find('.carousel-indicators li').eq(0).hasClass('active')).toEqual(true);
    expect(element.find('.carousel-indicators li').eq(1).hasClass('active')).toEqual(false);
  });

});