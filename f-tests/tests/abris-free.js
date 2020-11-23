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
        // .click(Selector('abris-bool.abris-property-createDatabase').find('input'))
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('button.btn-green.abris-action-right').withText('Install'))
        .wait(10000)
        .expect(Selector('iframe #document body #text').withText('Install completed'))
            .ok('Install failed.') // Возможно не совсем верно работает.
        // .hover(Selector('iframe #document body').withText('Install completed'))
        .takeScreenshot("/" + nameTest + "_2.png");
});

test('Login', async t => {
	var nameTest = "login";
	await t
		.resizeWindow(800, 600)
		.navigateTo(url.login)
        // .takeScreenshot("/" + nameTest + "_1.png")
        .wait(750)
        .typeText(Selector('div.authForm').find('input.form-control[data-bind="value: $data.usename, valueUpdate: \\\'keyup\\\'"]'),
        'postgres')
    .typeText(Selector('div.authForm').find('input.form-control[data-bind="value: $data.passwd"]'),
        '123456')
    .click(Selector('div.authForm').find('button.btn-green.abris-action-right'))
    .expect(page.loginMenu.innerText)
        .eql('P', {timeout: 5000})
    .navigateTo(url.login)
    .expect(Selector('div.authLogoutForm label[data-bind="text: $data.userFioMessage"]').innerText)
        .eql('postgres', {timeout: 5000});
		// .takeScreenshot("/" + nameTest + "_2.png");
});

test('Logout', async t => {
	var nameTest = "logout";
	t.expect(page.login());	
	await t
		.resizeWindow(800, 600)
		.expect(page.loginMenu.innerText)
			.eql('P', {timeout: 5000});
	await t
		.navigateTo(url.home)
		.eval(() => location.reload(true));
	await t
		.navigateTo(url.login)
		// .takeScreenshot("/" + nameTest + "_1.png")
		.click(Selector('div.authLogoutForm').find('button.btn-green.abris-action-right').withText('Logout'))     // 4 фантомные кнопки?
		.expect(Selector('span.btn-navbar.btn-login-navbar i.fas.fa-sign-in-alt').visible)
			.ok('Sign in icon not found. User not logged out.')	
		// .takeScreenshot("/" + nameTest + "_2.png");
});

test('Create schema', async t => {
    var nameTest = "create_schema";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.schema)
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('div.abris-property-schema_name').find('input'), 
            'test_schema')
        .typeText(Selector('div.abris-property-title').find('input'), 
            'Test created schema')
        .click(Selector('.abris-detail.abris-detail-schema .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
        // .takeScreenshot("/" + nameTest + "_1.png");
    await t
        .navigateTo(url.home)
        .navigateTo(url.schema)
        .eval(() => location.reload(true));
    await t
        .expect(Selector('div.table-responsive').find('tbody').find('tr').withText('test_schema').exists)
            .ok('Record not displayed.')
        .click(Selector('div.table-responsive').find('tbody').find('tr').withText('test_schema'))
        // .hover(Selector('div.abris-detail-schema').find('div.col-lg-12.actions').nth(1))
        // .takeScreenshot("/" + nameTest + "_2.png");
});

// Нужны скрины.
test('Create project table', async t => {
    var nameTest = "project_table";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li.menu-item').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#test_schema'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-table_name').find('input'), 
            'test_project')
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-title').find('input'),
            'Test Project')
        // .click(Selector('div.panel.panel-default div.abris-detail-entity abris-actions div.row.er-actions-row div.col-lg-12.actions').find('button.btn.btn-default.btn-green'))
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default div.abris-detail.abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        // .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').nth(0));
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('test_project'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'name')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Name')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'caption')
        .click(Selector('.select2-results__option').withText('caption Headline'))        
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default div.abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Project menu item', async t => {
    var nameTest = "project_menu_item";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.home + '/#list/menu_item')
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-property-name').find('input'), 
            'test_project')
        .typeText(Selector('.abris-property-title').find('input'), 
            'Test Project')
        .click(Selector('div.abris-detail-menu_item .abris-property-projection').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'test_project')
        .click(Selector('.select2-results__option').withText('test_schema Test created schema test_project Test Project test_project_key'))
        .click(Selector('div.abris-detail-menu_item .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
        // .takeScreenshot("/" + nameTest + "_1.png");
    await t
        .navigateTo(url.home)
        .eval(() => location.reload(true));
    await t
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Test Project'))
        .expect(Selector('div.table-responsive').exists)
            .ok('Project table not displayed.')
        // .takeScreenshot("/" + nameTest + "_2.png");
});

// Нужны скрины
test('Create employee table', async t => {
    var nameTest = "employee_table";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#test_schema'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-table_name').find('input'), 
            'test_employee')
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-title').find('input'),
            'Test Employees')
        // .click(Selector('div.panel.panel-default div.abris-detail-entity abris-actions div.row.er-actions-row div.col-lg-12.actions').find('button.btn.btn-default.btn-green'))
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        // .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').nth(0));
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('test_employee'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'name')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Name')
        // .click(Selector('div.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        // .typeText(Selector('.select2-search__field'), 
        //     'text')
        // .click(Selector('.select2-results__option').withText('text'))
        // .click(Selector('div.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        // .typeText(Selector('.select2-search__field'), 
        //     'caption')
        // .click(Selector('.select2-results__option').withText('caption Headline'))  
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'work_from')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Work From')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time with time zone')
        .click(Selector('.select2-results__option').withText('time with time zone'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time')
        .click(Selector('.select2-results__option').withText('time Time'))        
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'work_to')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Work To')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time with time zone')
        .click(Selector('.select2-results__option').withText('time with time zone'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time')
        .click(Selector('.select2-results__option').withText('time Time'))        
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Employee menu item', async t => {
    var nameTest = "employee_menu_item";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.home + '/#list/menu_item')
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-property-name').find('input'), 
            'test_employee')
        .typeText(Selector('.abris-property-title').find('input'), 
            'Test Employee')
        .click(Selector('div.abris-detail-menu_item .abris-property-projection').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'test_employee')
        .click(Selector('.select2-results__option').withText('test_schema Test created schema test_employee Test Employees test_employee_key'))
        .click(Selector('div.abris-detail-menu_item .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
        // .takeScreenshot("/" + nameTest + "_1.png");
    await t
        .navigateTo(url.home)
        .eval(() => location.reload(true));
    await t
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Test Employee'))
        .expect(Selector('div.table-responsive').exists)
            .ok('Employee table not displayed.')
        // .takeScreenshot("/" + nameTest + "_2.png");
});

test('Create task table', async t => {
    var nameTest = "task_table";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#test_schema'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-table_name').find('input'), 
            'test_task')
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-title').find('input'),
            'Test Tasks')
        // .click(Selector('div.panel.panel-default div.abris-detail-entity abris-actions div.row.er-actions-row div.col-lg-12.actions').find('button.btn.btn-default.btn-green'))
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('test_task'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'title')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Title')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'caption')
        .click(Selector('.select2-results__option').withText('caption Headline'))        
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'due_time')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Due Time')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'timestamp with time zone')
        .click(Selector('.select2-results__option').withText('timestamp with time zone'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'datetime')
        .click(Selector('.select2-results__option').withText('datetime Date and time'))        
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'progress')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Progress')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'integer')
        .click(Selector('.select2-results__option').withText('integer'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'progress')
        .click(Selector('.select2-results__option').withText('progress Horizontal indicator'))        
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'description')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Description')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text Rich text'))        
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'test_project_key')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Task to project reference')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-ref_entity').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'test_project')
        .click(Selector('.select2-results__option').withText('test_schema Test created schema test_project Test Project test_project_key'))      
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

// test('Create task_project_reference', async t => {
//     var nameTest = "task_to_proj_ref";
//     t.expect(page.login());
//     await t
//         .resizeWindow(1366, 768)
//         .click(page.generalMenu)
//         .click(Selector('ul#side-menu.nav li').withText('Configuration'))
//         .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
//         .click(Selector('div.table-responsive tbody').find('tr#test_schema'));
//     if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
//         await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
//     }
//     await t
//         .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('task'));
//     if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
//         await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
//     }
// });

test('Create task_to_employee table', async t => {
    var nameTest = "task_to_emp_table";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#test_schema'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-table_name').find('input'), 
            'test_task_to_emp')
        .typeText(Selector('.abris-detail.abris-detail-entity .abris-property-title').find('input'),
            'Test Participants')
        // .click(Selector('div.panel.panel-default div.abris-detail-entity abris-actions div.row.er-actions-row div.col-lg-12.actions').find('button.btn.btn-default.btn-green'))
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('test_task_to_emp'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'task_emp_ref')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Test task to employee reference')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-ref_entity').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'test_project')
        .click(Selector('.select2-results__option').withText('test_schema Test created schema test_project Test Project test_project_key'))      
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-column_name').find('input'),
            'test_employee_key')
        .typeText(Selector('.abris-detail.abris-detail-property .abris-property-title').find('input'),
            'Test Employees')
        .click(Selector('.abris-detail.abris-detail-property .abris-property-ref_entity').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'test_employee')
        .click(Selector('.select2-results__option').withText('test_schema Test created schema test_employee Test Employees test_employee_key'))      
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default .abris-detail.abris-detail-entity div.panel.panel-default .abris-detail.abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create task from project', async t => {
    var nameTest = "task_from_project";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Test Project'))
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('div.abris-detail-test_project .abris-property-name').find('input'), 
            'Test Project')
        .click(Selector('div.abris-detail-test_project .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Test Tasks').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Test Tasks'))
    }
    await t
        .click(Selector('div.abris-detail-test_project div.panel.panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('div.abris-detail-test_task .abris-property-title').find('input'), 
            'Test Task')
        .click(Selector('div.abris-detail-test_project abris-panel.relation div.panel.panel-default div.abris-detail-test_task .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create participants from project', async t => {
    var nameTest = "partic_from_project";
    t.expect(page.login());
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Test Project'))
        .click(Selector('div.table-responsive tbody tr').withText('Test Project'))
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Test Participants').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Test Participants'))
    }
    await t
        .click(Selector('div.abris-detail-test_project div.panel.panel-default').find('button.dt-button.btn-blue'))
        .click(Selector('div.abris-detail-test_task_to_emp .abris-property-test_employee_key button.btn-ref').find('i.fas.fa-plus'))
        .typeText(Selector('div.abris-detail-test_employee .abris-property-name').find('input'), 
            'Test Employee')
        .click(Selector('div.abris-detail-test_task_to_emp div.detail-view-col.abris-view-extension div.abris-detail-test_employee .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .click(Selector('div.detail-view-col.abris-view-extension div.abris-view-extension-part abris-actions.abris-view-top-actions .actions button').find('span.action-icon.fa.fa-times'))
        .click(Selector('div.abris-detail-test_project abris-panel.relation div.panel.panel-default div.table-responsive div.abris-detail-test_task_to_emp .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create project_to_emp table', async t => {
    var nameTest = "project_to_emp_table";
    t.expect(page.login());
    await t
        .navigateTo(url.home + '/#list/property')
        .typeText(Selector('.a-search.input-group').find('input'), 
            'view_definition')
        .pressKey('enter')
        .click(Selector('td').withText('view_definition'))
        .click(Selector('div.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'plain')
        .click(Selector('.select2-results__option').withText('plain Text without formatting'))
        .click(Selector('div.abris-detail.abris-detail-property abris-actions.abris-view-bottom-actions .actions').find('button.btn-green.action-save'));
    await t
		.navigateTo(url.home)
		.eval(() => location.reload(true));
    await t    
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#test_schema'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('test_task_to_emp'))
        // .click(Selector('div.abris-detail-schema div.panel.panel-default').find('button.dt-button.btn-blue'))
        // .typeText(Selector('div.abris-detail.abris-detail-entity .abris-property-table_name').find('input'), 
        //     'test_project_to_emp')
        // .typeText(Selector('div.abris-detail.abris-detail-entity .abris-property-title').find('input'),
        //     'Test Project participants')
        .typeText(Selector('div.abris-detail.abris-detail-entity .abris-property-plain.abris-property-view_definition').find('textarea.plainEditor'),
            'SELECT DISTINCT test_task_to_emp.test_task_to_emp_key as test_project_to_emp_key,\n\ttest_task.test_project_key,\n\ttest_task_to_emp.test_employee_key\n\tFROM (test_task_to_emp\n\tJOIN test_task USING (test_task_key));')
        .click(Selector('.abris-detail.abris-detail-schema abris-panel.relation div.panel.panel-default div.abris-detail.abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-save'))
        // .click(Selector('div.abris-detail-schema abris-panel.relation div.panel.panel-default div.abris-detail.abris-detail-entity .abris-view-bottom-actions .er-actions-row .actions').find('button.btn-green').withText('Create')) // Временное решение, не видит кнопку.
        .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').withText('test_project_to_emp'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    await t
        .navigateTo(url.home + '/#list/property')
        .typeText(Selector('.a-search.input-group').find('input'), 
            'View definition')
        .pressKey('enter')
        .click(Selector('td').withText('view_definition'))
        .click(Selector('div.abris-detail.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'code-sql')
        .click(Selector('.select2-results__option').withText('code-sql SQL format'))
        .click(Selector('div.abris-detail.abris-detail-property abris-actions.abris-view-bottom-actions .actions').find('button.btn-green.action-save'));
    }
});
