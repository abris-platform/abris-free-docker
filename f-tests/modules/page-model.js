import { Selector, t } from 'testcafe';

export default class URL {
    constructor() {
        this.home                   = process.env.TEST_PAGE_ADDRESS || `http://localhost`;
        this.install                = this.home + '/#install';
        this.login                  = this.home + '/#login';
        this.schema                 = this.home + '/#list/schema';
        this.entity                 = this.home + '/#list/entity_edit'; 
        this.property               = this.home + '/#list/property';
        this.projection             = this.home + '/#list/projection_entity';
        this.textTypes              = this.home + '/#list/text_types';
        this.bookings               = this.home + '/#list/bookings';
        this.tickets                = this.home + '/#list/tickets';
        this.aircrafts              = this.home + '/#list/aircrafts';
        this.aircraftsData          = this.home + '/#list/aircrafts_data';
        this.airports               = this.home + '/#list/airports';
        this.flights                = this.home + '/#list/flights';
        this.reportForms            = this.home + '/#list/reporting_forms';
        this.airportElement         = this.home + '/#treedetailed/airport_element';
        this.crossAirportElement    = this.home + '/#treecrossdetailed/cross_airport_element';
        this.airportsMap            = this.home + '/#datamaplist/airports_map';
    }
}

export class Page {
    constructor () {
        this.loginMenu              = Selector('.btn-navbar.btn-login-navbar');
        this.loginInput             = Selector('.modal-content .authForm abris-string').find('input.form-control');
        this.passwordInput          = Selector('.modal-content .authForm abris-passwordinput').find('input.form-control');
        this.signInButton           = Selector('.modal-content .authForm').find('.abris-action-right');
        this.signOutButton          = Selector('.modal-content .authLogoutForm').find('.abris-action-right');
        this.generalMenu            = Selector('#menu-toggler');
        this.tableMenu              = Selector('.dropdown-toggle').find('.btn.btn-default.btn-blue');
        this.searchInput            = Selector('.abrs-page-title-buttons abris-search').find('input');
    }

    async login (t) {
        await t
            .setTestSpeed(0.9)
            .resizeWindow(1366, 768)
            .click(this.loginMenu)
            .wait(750)
            .typeText(this.loginInput, 'postgres')            
            .typeText(this.passwordInput, '123456')
            .click(this.signInButton);
    }

    async logout (t) {
        await t
            .setTestSpeed(0.9)
            .resizeWindow(1366, 768)
            .click(this.loginMenu)
            .click(this.signOutButton);
    }
}
