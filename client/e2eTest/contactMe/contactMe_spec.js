var HttpBackend = require('httpbackend');
var backend = null;

describe('Contact Me page test', function() {

	beforeEach(function() {
		backend = new HttpBackend(browser);
		browser.manage().logs().get('browser').then(function(browserLogs) {
			// browserLogs is an array of objects with level and message fields
			browserLogs.forEach(function(log) {
				if (log.level.value > 900) { // it's an error log
					console.log('Browser console error!');
					console.log(log.message);
				}
			});
		});
		browser.get('#contactMe');
	});

	afterEach(function() {
		backend.clear();
	});

	it('should have correct elements', function() {
		expect(element(by.css('h1')).getText()).toEqual("CONTACT ME");
		expect(element(by.css('input[ng-model="contact.name"]')).isPresent()).toBe(true);
		expect(element(by.css('input[ng-model="contact.email"]')).isPresent()).toBe(true);
		expect(element(by.css('textarea[ng-model="contact.content"]')).isPresent()).toBe(true);
		expect(element(by.css('button.send')).isPresent()).toBe(true);
	});

	it('submit button is disabled when form is invalid', function() {
		expect(element(by.css('button.send')).isEnabled()).toBe(false);
	});

	it('submit button is enabled when form is valid', function() {
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		expect(element(by.css('button.send')).isEnabled()).toBe(true);
	});

	it('when send button is clicked notification is displayed asking are you sure?', function() {
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.textToBePresentInElement($('div.alertify div.dialog p.msg'),
				'Do you want to send an email from:\nDavid\nmyemail@email.com'), 1000);
			expect(element(by.css('div.alertify div.dialog p.msg')).getText()).toEqual('Do you want to send an email from:\nDavid\nmyemail@email.com');
		});
	});

	it('when cancel button is clicked in notification, notification is removed', function() {
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.cancel'))),
				5000, 'Cancel button not clickable');
			element(by.css('div.alertify div.dialog button.cancel')).click();
			browser.wait(EC.not(EC.presenceOf(element(by.css('div.alertify div.dialog')))),
				5000, 'Alert still visible');
			expect(element(by.css('div.alertify div.dialog')).isPresent()).toBe(false);
		});
	});

	it('when ok button is clicked in notification, notification is removed', function() {
		backend.whenPOST(/sendEmail/).respond(function(method, url, data) {
            setTimeout(function() {return [200, data];},5000);
        });
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.ok'))),
				5000, 'Ok button not clickable');
			element(by.css('div.alertify div.dialog button.ok')).click();
			browser.wait(EC.not(EC.presenceOf(element(by.css('div.alertify div.dialog')))),
				5000, 'Alert still visible');
			expect(element(by.css('div.alertify div.dialog')).isPresent()).toBe(false);
		});
	});

	it('when ok button is clicked in notification, notification log is added showing "Sending Message"', function() {
		backend.whenPOST(/sendEmail/).respond(function(method, url, data) {
            setTimeout(function() {return [200, data];},5000);
        });

		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.ok'))),
				5000, 'Ok button not clickable');
			element(by.css('div.alertify div.dialog button.ok')).click();
			browser.wait(EC.presenceOf(element(by.css('div.alertify-logs div.show'))),
				5000, 'Log message not visible');
			expect(element(by.css('div.alertify-logs div.show')).getText()).toEqual("Sending Message");
		});
	});

	it('when ok button is clicked in notification, form is reset', function() {
		backend.whenPOST(/sendEmail/).respond(function(method, url, data) {
            setTimeout(function() {return [200, data];},5000);
        });

		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.ok'))),
				5000, 'Ok button not clickable');
			element(by.css('div.alertify div.dialog button.ok')).click();
			expect(element(by.css('input[ng-model="contact.name"]')).getAttribute('value')).toEqual('');
			expect(element(by.css('input[ng-model="contact.email"]')).getAttribute('value')).toEqual('');
			expect(element(by.css('textarea[ng-model="contact.content"]')).getAttribute('value')).toEqual('');
		});
	});

	it('when email is sent successfully, success log appears', function() {
		backend.whenPOST(/sendEmail/).respond(function(method, url, data) {
            return [200, data];
        });
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.ok'))),
				5000, 'Ok button not clickable');
			element(by.css('div.alertify div.dialog button.ok')).click();
			browser.wait(EC.presenceOf(element(by.css('div.alertify-logs div.success.show'))),
				5000, 'Log message not visible');
			expect(element(by.css('div.alertify-logs div.success.show')).getText()).toEqual("Message Sent");
		});
	});

	it('when email is not sent successfully, error log appears', function() {
		backend.whenPOST(/sendEmail/).respond(function(method, url, data) {
            return [404, data];
        });
		element(by.css('input[ng-model="contact.name"]')).sendKeys('David');
		element(by.css('input[ng-model="contact.email"]')).sendKeys('myemail@email.com');
		element(by.css('textarea[ng-model="contact.content"]')).sendKeys('A message');
		var EC = protractor.ExpectedConditions;
		element(by.css('button.send')).click().then(function() {
			browser.wait(EC.elementToBeClickable(element(by.css('div.alertify div.dialog button.ok'))),
				5000, 'Ok button not clickable');
			element(by.css('div.alertify div.dialog button.ok')).click();
			browser.wait(EC.presenceOf(element(by.css('div.alertify-logs div.error.show'))),
				5000, 'Log message not visible');
			expect(element(by.css('div.alertify-logs div.error.show')).getText()).toEqual("Message Not Sent");
		});
	});
});