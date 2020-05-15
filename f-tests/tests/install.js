import { Selector } from 'testcafe';
import URL, { Page } from '../modules/page-model';

const url = new URL();

fixture `Install`
    .page(url.install);

const page = new Page();
/*--

--*/
test('Abris install', async t => {
	var nameTest = "abris_install";
	await t
        .resizeWindow(800, 600)
        // .click(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverAddress"'))
        // .pressKey('ctrl+a')
        // .typeText(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverAddress"]'),
        //     'localhost')
        .click(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverPort"]'))
        .pressKey('ctrl+a')
        .typeText(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverPort"]'),
            '45432')
        .click(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverPassword"]'))
        .pressKey('ctrl+a')
        .typeText(Selector('div.abris-property.readwrite').find('input[data-bind="value: $data.serverPassword"]'),
            '123456')
        // checkbox'ы
        .takeScreenshot("/" + nameTest + "_1.png")
        .click(Selector('button.btn.btn-default.btn-green.abris-action-right').withText('Install'))
        .expect(Selector('div.alert.in.fade.alert-success'))
            .ok('Install failed.')
        .takeScreenshot("/" + nameTest + "_2.png");
	}
);
