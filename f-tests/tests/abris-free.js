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
        .typeText(Selector('.authForm').find('input.form-control[data-bind="value: $data.usename, valueUpdate: \\\'keyup\\\'"]'),
        'postgres')
    .typeText(Selector('.authForm').find('input.form-control[data-bind="value: $data.passwd"]'),
        '123456')
    .click(Selector('.authForm').find('button.btn-green.abris-action-right'))
    .expect(page.loginMenu.innerText)
        .eql('P', {timeout: 5000})
    .navigateTo(url.login)
    .expect(Selector('.authLogoutForm label[data-bind="text: $data.userFioMessage"]').innerText)
        .eql('postgres', {timeout: 5000});
		// .takeScreenshot("/" + nameTest + "_2.png");
});

test('Logout', async t => {
	var nameTest = "logout";
    await page.login(t);
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
		.click(Selector('.authLogoutForm').find('button.btn-green.abris-action-right').withText('Logout'))     // 4 фантомные кнопки?
		.expect(Selector('span.btn-navbar.btn-login-navbar i.fas.fa-sign-in-alt').visible)
			.ok('Sign in icon not found. User not logged out.')	
		// .takeScreenshot("/" + nameTest + "_2.png");
});

test('Create schema', async t => {
    var nameTest = "create_schema";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.schema)
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-property-schema_name').find('input'), 
            'test_schema')
        .typeText(Selector('.abris-property-title').find('input'), 
            'Created schema')
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

test('Create project table', async t => {
    var nameTest = "project_table";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li.menu-item').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#public'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .takeScreenshot("/" + nameTest + "_1.png")    
        .click(Selector('.abris-list-schema .abris-detail-schema .panel-default').find('button.dt-button.btn-blue'))
        .takeScreenshot("/" + nameTest + "_2.png")
        .typeText(Selector('.abris-list-schema .abris-detail-entity .abris-property-table_name').find('input'), 
            'project')
        .typeText(Selector('.abris-list-schema .abris-detail-entity .abris-property-title').find('input'),
            'Project')
        .click(Selector('.abris-property-bool.abris-property-create_pkey', {timeout: 0}).find('abris-checkbox'))
        .click(Selector('.abris-list-schema .abris-detail-schema .panel-default .abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        // .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').nth(0));
        .click(Selector('.panel-default div.table-responsive tbody').find('tr').withText('project'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .takeScreenshot("/" + nameTest + "_3.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .takeScreenshot("/" + nameTest + "_4.png")
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'name')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Name')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'caption')
        .click(Selector('.select2-results__option').withText('caption Headline'))        
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'info')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Information')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'plain')
        .click(Selector('.select2-results__option').withText('plain Text without formatting'))        
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'cost')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Total cost')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'numeric')
        .click(Selector('.select2-results__option').withText('numeric'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'money')
        .click(Selector('.select2-results__option').withText('money Money'))        
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'deadline')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Deadline')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'date')
        .click(Selector('.select2-results__option').withText('date'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'date')
        .click(Selector('.select2-results__option').withText('date Date'))        
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add')); 
});

test('Project menu item', async t => {
    var nameTest = "project_menu_item";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.home + '/#list/menu_item')
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-property-name').find('input'), 
            'project')
        .typeText(Selector('.abris-property-title').find('input'), 
            'Project')
        .click(Selector('.abris-list-menu_item .abris-detail-menu_item .abris-property-projection').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'project')
        .click(Selector('.select2-results__option').withText('public standard public schema project Project project_key'))
        .click(Selector('.abris-list-menu_item .abris-detail-menu_item .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
        // .takeScreenshot("/" + nameTest + "_1.png");
    await t
        .navigateTo(url.home)
        .eval(() => location.reload(true));
    await t
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Project'))
        .expect(Selector('div.table-responsive').exists)
            .ok('Project table not displayed.')
        // .takeScreenshot("/" + nameTest + "_2.png");
});

test('Create employee table', async t => {
    var nameTest = "employee_table";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#public'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-list-schema .abris-detail-schema .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-list-schema .abris-detail-entity .abris-property-table_name').find('input'), 
            'employee')
        .typeText(Selector('.abris-list-schema .abris-detail-entity .abris-property-title').find('input'),
            'Employees')
        .click(Selector('.abris-property-bool.abris-property-create_pkey', {timeout: 0}).find('abris-checkbox'))
        // .click(Selector('div.panel.panel-default div.abris-detail-entity abris-actions div.row.er-actions-row div.col-lg-12.actions').find('button.btn.btn-default.btn-green'))
        .click(Selector('.abris-list-schema .abris-detail-schema .panel-default .abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        // .click(Selector('div.panel.panel-default div.table-responsive tbody').find('tr').nth(0));
        .click(Selector('.panel-default div.table-responsive tbody').find('tr').withText('employee'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .takeScreenshot("/" + nameTest + "_1.png")
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'name')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Name')
        .takeScreenshot("/" + nameTest + "_2.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'work_from')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Work From')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time with time zone')
        .click(Selector('.select2-results__option').withText('time with time zone'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time')
        .click(Selector('.select2-results__option').withText('time Time'))
        .takeScreenshot("/" + nameTest + "_3.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'work_to')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Work To')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time with time zone')
        .click(Selector('.select2-results__option').withText('time with time zone'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'time')
        .click(Selector('.select2-results__option').withText('time Time'))
        .takeScreenshot("/" + nameTest + "_4.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Employee menu item', async t => {
    var nameTest = "employee_menu_item";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .navigateTo(url.home + '/#list/menu_item')
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-property-name').find('input'), 
            'employee')
        .typeText(Selector('.abris-property-title').find('input'), 
            'Employee')
        .click(Selector('div.abris-detail-menu_item .abris-property-projection').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'employee')
        .click(Selector('.select2-results__option').withText('public standard public schema employee Employees employee_key'))
        .click(Selector('div.abris-detail-menu_item .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
        // .takeScreenshot("/" + nameTest + "_1.png");
    await t
        .navigateTo(url.home)
        .eval(() => location.reload(true));
    await t
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Employee'))
        .expect(Selector('div.table-responsive').exists)
            .ok('Employee table not displayed.')
        // .takeScreenshot("/" + nameTest + "_2.png");
});

test('Create task table', async t => {
    var nameTest = "task_table";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#public'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-detail-schema .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-entity .abris-property-table_name').find('input'), 
            'task')
        .typeText(Selector('.abris-detail-entity .abris-property-title').find('input'),
            'Tasks')
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .click(Selector('.panel-default div.table-responsive tbody').find('tr').withText('task'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'title')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Title')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'caption')
        .click(Selector('.select2-results__option').withText('caption Headline'))
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'due_time')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Due Time')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'timestamp with time zone')
        .click(Selector('.select2-results__option').withText('timestamp with time zone'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'datetime')
        .click(Selector('.select2-results__option').withText('datetime Date and time'))
        .takeScreenshot("/" + nameTest + "_2.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'progress')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Progress')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'integer')
        .click(Selector('.select2-results__option').withText('integer'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'progress')
        .click(Selector('.select2-results__option').withText('progress Horizontal indicator'))
        .takeScreenshot("/" + nameTest + "_3.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'description')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Description')
        .click(Selector('.abris-detail-property .abris-property-data_type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'text')
        .click(Selector('.select2-results__option').withText('text Rich text'))
        .takeScreenshot("/" + nameTest + "_4.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'project_key')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Task to project reference')
        .click(Selector('.abris-detail-property .abris-property-ref_entity').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'project')
        .click(Selector('.select2-results__option').withText('public standard public schema project Project project_key'))
        .takeScreenshot("/" + nameTest + "_5.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create task_to_employee table', async t => {
    var nameTest = "task_to_emp_table";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#public'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.abris-detail-schema .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-entity .abris-property-table_name').find('input'), 
            'task_to_emp')
        .typeText(Selector('.abris-detail-entity .abris-property-title').find('input'),
            'Participants')
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .click(Selector('.panel-default div.table-responsive tbody').find('tr').withText('task_to_emp'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    }
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'task_emp_ref')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Task to employee reference')
        .click(Selector('.abris-detail-property .abris-property-ref_entity').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'project')
        .click(Selector('.select2-results__option').withText('public standard public schema project Project project_key'))
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
    await t
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('.abris-detail-property .abris-property-column_name').find('input'),
            'employee_key')
        .typeText(Selector('.abris-detail-property .abris-property-title').find('input'),
            'Employees')
        .click(Selector('.abris-detail-property .abris-property-ref_entity').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'employee')
        .click(Selector('.select2-results__option').withText('public standard public schema employee Employees employee_key'))
        .takeScreenshot("/" + nameTest + "_2.png")
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .panel-default .abris-detail-property .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create task from project', async t => {
    var nameTest = "task_from_project";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Project'))
        .click(Selector('.dt-buttons').find('button.dt-button.btn-blue'))
        .typeText(Selector('div.abris-detail-project .abris-property-name').find('input'), 
            'Project')
        .click(Selector('div.abris-detail-project .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        .expect(Selector('div.alert.in.fade.alert-success').visible)
            .ok('Record not created.')
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Tasks').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Tasks'))
    }
    await t
        .click(Selector('div.abris-detail-project .panel-default').find('button.dt-button.btn-blue'))
        .typeText(Selector('div.abris-detail-task .abris-property-title').find('input'), 
            'Task')
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('div.abris-detail-project .panel-default div.abris-detail-task .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create participants from project', async t => {
    var nameTest = "partic_from_project";
    await page.login(t);
    await t
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Project'))
        .click(Selector('div.table-responsive tbody tr td').withText('Project'))
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Participants').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Participants'))
    }
    await t
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('div.abris-detail-project .panel-default').find('button.dt-button.btn-blue'))
        .click(Selector('div.abris-detail-task_to_emp .abris-property-employee_key button.btn-ref').find('i.fas.fa-plus'))
        .typeText(Selector('div.abris-detail-employee .abris-property-name').find('input'), 
            'Employee')
        .click(Selector('div.abris-detail-task_to_emp div.detail-view-col.abris-view-extension div.abris-detail-employee .abris-view-bottom-actions .actions').find('button.btn-green.action-add'))
        // .click(Selector('div.detail-view-col.abris-view-extension div.abris-view-extension-part abris-actions.abris-view-top-actions .actions button').find('span.action-icon.fa.fa-times'))
        .click(Selector('div.abris-detail-project .panel-default div.table-responsive div.abris-detail-task_to_emp .abris-view-bottom-actions .actions').find('button.btn-green.action-add'));
});

test('Create project_to_emp table', async t => {
    var nameTest = "project_to_emp_table";
    await page.login(t);
    await t
        .navigateTo(url.home + '/#list/property')
        .typeText(Selector('.a-search.input-group').find('input'), 
            'view_definition')
        .pressKey('enter')
        .click(Selector('td').withText('view_definition'))
        .click(Selector('div.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'plain')
        .click(Selector('.select2-results__option').withText('plain Text without formatting'))
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('div.abris-detail-property abris-actions.abris-view-bottom-actions .actions').find('button.btn-green.action-save'));
    await t
		.navigateTo(url.home)
		.eval(() => location.reload(true));
    await t    
        .resizeWindow(1366, 768)
        .click(page.generalMenu)
        .click(Selector('ul#side-menu li.menu-item').withText('Configuration'))
        .click(Selector('ul.nav.nav-second-level li').withText('Schemas'))
        .click(Selector('div.table-responsive tbody').find('tr#public'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Entities').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Entities'))
    }
    await t
        .click(Selector('.panel-default div.table-responsive tbody').find('tr').withText('task_to_emp'))
        .typeText(Selector('.abris-detail-entity .abris-property-plain.abris-property-view_definition').find('textarea.plainEditor'),
            'SELECT DISTINCT task_to_emp.task_to_emp_key as project_to_emp_key,\n\ttask.project_key,\n\ttask_to_emp.employee_key\n\tFROM (task_to_emp\n\tJOIN task USING (task_key));')
        .click(Selector('.abris-detail-schema .panel-default .abris-detail-entity .abris-view-bottom-actions .actions').find('button.btn-green.action-save'))
        .click(Selector('.panel-default div.table-responsive tbody').find('tr').withText('project_to_emp'));
    if (await Selector('div.panel-heading.clearfix.collapsed').withText('Properties').exists) {
        await t.click(Selector('.panel-heading-caption.left').withText('Properties'))
    await t
        .navigateTo(url.home + '/#list/property')
        .typeText(Selector('.a-search.input-group').find('input'), 
            'View definition')
        .pressKey('enter')
        .click(Selector('td').withText('view_definition'))
        .click(Selector('.abris-detail-property .abris-property-type').find('.select2-selection.select2-selection--single'))
        .typeText(Selector('.select2-search__field'), 
            'code-sql')
        .click(Selector('.select2-results__option').withText('code-sql SQL format'))
        .click(Selector('.abris-detail-property abris-actions.abris-view-bottom-actions .actions').find('button.btn-green.action-save'));
    }
});