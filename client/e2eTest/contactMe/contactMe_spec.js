describe('Contact Me page test', function() {

	beforeEach(function() {
		browser.get('http://localhost:9000/index.html');
		element(by.css('a[ui-sref="contactMe"]')).click();
	});

	it('should have "CONTACT ME" as header', function() {
		expect(element(by.css('h1')).getText()).toEqual("CONTACT ME");
	});

	it('should contain input for contact.name', function() {
		expect(element(by.css('input[ng-model="contact.name"]')).isPresent()).toBe(true);
	});

	it('should contain input for contact.email', function() {
		expect(element(by.css('input[ng-model="contact.email"]')).isPresent()).toBe(true);
	});

	it('should contain textarea for contact.content', function() {
		expect(element(by.css('textarea[ng-model="contact.content"]')).isPresent()).toBe(true);
	});

	it('should contain submit button', function() {
		expect(element(by.css('input[type="submit"]')).isPresent()).toBe(true);
	});

	it('submit button is disabled when form is invalid', function() {
		expect(element(by.css('input[type="submit"]')).isEnabled()).toBe(false);
	});

	it('submit button is enabled when form is valid', function() {
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		expect(element(by.css('input[type="submit"]')).isEnabled()).toBe(true);
	});

	it('when send button is clicked notification is displayed asking are you sure?', function() {
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('input[type="submit"]')).click().then(function() {
			browser.wait(EC.textToBePresentInElement($('div.alertify div.dialog p.msg'),
				'Do you want to send an email from:\nDavid\nmyemail@email.com'), 100);
			expect(element(by.css('div.alertify div.dialog p.msg')).getText()).toEqual('Do you want to send an email from:\nDavid\nmyemail@email.com');
		});
	});

	it('when cancel button is clicked in notification, notification is removed', function() {
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('input[type="submit"]')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.cancel'))),
				5000, 'Cancel button not clickable');
			element(by.css('div.alertify div.dialog button.cancel')).click();
			browser.wait(EC.not(EC.presenceOf(element(by.css('div.alertify div.dialog')))),
				5000, 'Alert still visible');
			expect(element(by.css('div.alertify div.dialog')).isPresent()).toBe(false);
		});
	});
});