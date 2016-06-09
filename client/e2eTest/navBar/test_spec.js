describe('Nav Bar test', function() {

	beforeEach(function() {
		browser.get('');
	});

	it('should have "David Bramwell" as header', function() {
		expect(element(by.css('h1')).getText()).toEqual("David\nBramwell");
	});

	it('education button should have active class once clicked', function() {
		element(by.css('a[ui-sref="education"]')).click();
		browser.wait(function() { return element(by.css('li.active')).isPresent() });
		expect(element(by.css('li.active')).getText()).toEqual('Education');
	});

	it('Expertise button should have active class once clicked', function() {
		element(by.css('a[ui-sref="expertise"]')).click();
		browser.wait(function() { return element(by.css('li.active')).isPresent() });
		expect(element(by.css('li.active')).getText()).toEqual('Expertise');
	});

	it('Contact Me button should have active class once clicked', function() {
		element(by.css('a[ui-sref="contactMe"]')).click();
		browser.wait(function() { return element(by.css('li.active')).isPresent() });
		expect(element(by.css('li.active')).getText()).toEqual('Contact Me');
	});
});