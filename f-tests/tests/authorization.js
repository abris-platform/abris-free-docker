import { Selector } from 'testcafe';
import URL, { Page } from '../modules/page-model';

const url = new URL();

fixture `Authorization`
    .page(url.home);

const page = new Page();

test('Login', async t => {
	var nameTest = "login";
	await t
		.resizeWindow(800, 600)
		.navigateTo(url.login)
		// .takeScreenshot("/" + nameTest + "_1.png")
		.typeText(Selector('.authForm .row').find('input.form-control[data-bind="value: $data.usename, valueUpdate: \\\'keyup\\\'"]'),
			'postgres')
		.typeText(Selector('.authForm .row').find('input.form-control[data-bind="value: $data.passwd"]'),
			'123456')
		.click(Selector('.authForm .er-actions-row .col-lg-12.actions').find('button.btn.btn-default.btn-green.abris-action-right'))
		.expect(page.loginMenu.innerText)
			.eql('postgres');
		// .takeScreenshot("/" + nameTest + "_2.png");
	}
);

test('Logout', async t => {
	var nameTest = "logout";
	t.expect(page.login());	
	await t
		.resizeWindow(800, 600)
		.expect(page.loginMenu.innerText)
			.eql('postgres', {timeout: 5000});
	await t
		.navigateTo(url.home)
		.eval(() => location.reload(true));
	await t
		.navigateTo(url.login)
		// .takeScreenshot("/" + nameTest + "_1.png")
		.click(Selector('.authLogoutForm .er-actions-row .col-lg-12.actions').find('button.btn.btn-default.btn-green.abris-action-right'))
		.expect(page.loginMenu.innerText)
			.eql('Вход')		
		// .takeScreenshot("/" + nameTest + "_2.png");
	}
);
