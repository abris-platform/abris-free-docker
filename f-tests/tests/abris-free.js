import { Selector } from 'testcafe';
import URL, { Page } from '../modules/page-model';

const url = new URL();

fixture `Abris-free`
    .page(url.home);

const page = new Page();

test('Abris install', async t => {
	var nameTest = "abris_install";
	await t
        .resizeWindow(1366, 768)
        .navigateTo(url.install)
        // .click(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverPassword"]'))
        // .pressKey('ctrl+a')
        // .typeText(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverPassword"]'),
        //     '123456')
        .click(Selector('abris-bool.abris-property-createDatabase').find('input'))
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('button.btn.btn-default.btn-green.abris-action-right').withText('Install'))
        .wait(60000)
        .expect(Selector('iframe #document body').withText('Install completed'))
            .ok('Install failed.') // Возможно не совсем верно работает.
        .takeScreenshot("/" + nameTest + "_2.png");
});

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
});

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
});

test('Create project table', async t => {
    var nameTest = "project_table";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.home)
        .click(Selector('.abrs-home-item-name-meta'))
        .click(Selector('.abrs-home-item-name-meta.schema'))
        .click(Selector('div.table-responsive tbody').find('tr#public'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('div.abris-detail-schema div.panel.panel-default').find('.btn-default.btn-blue'))
        .typeText(Selector('div.abris-detail-entity .abris-property-table_name').find('input'), 
            'project')
        .typeText(Selector('div.abris-detail-entity .abris-property-title').find('input'),
            'Project')
        .click(Selector('div.abris-detail-entity').find('.btn-default.btn-green'))
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').nth(0));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.panel-heading-caption.left').withText('Properties').find('.btn-default.btn-blue'))
        .typeText(Selector('div.abris-detail-property .abris-property-column_name').find('input'),
            'name')
        .typeText(Selector('div.abris-detail-property .abris-property-title').find('input'),
            'Name')
        .click(Selector('div.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('div.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'caption')
        .click(Selector('.select2-results__option').withText('caption Headline'))        
        .click(Selector('div.abris-detail-property').find('.btn-default.btn-green'));
});
