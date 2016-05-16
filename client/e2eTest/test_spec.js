describe('Simple Test', function() {

	beforeEach(function() {
		browser.get('http://localhost:9000/index.html');
	});

	it('should have "David Bramwell" as header', function() {
		expect(element(by.css('h1')).getText()).toEqual("David\nBramwell");
	});

	it('should have active class once clicked', function() {
		element(by.css('a[href="#education"]')).click();
		browser.wait(function() { return element(by.css('li.active')).isPresent() });
		expect(element(by.css('li.active')).getText()).toEqual('Education');
	});
});