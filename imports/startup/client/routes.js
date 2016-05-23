// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/home/index.js';
import '../../ui/register/index.js';
import '../../ui/signin/index.js';
import '../../ui/locations/index.js';
import '../../ui/menu/index.js';
import '../../ui/dashboard/index.js';

Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    layoutsPartialsNav   : {to: 'layoutsPartialsNav'},
    layoutsPartialsFooter: {to: 'layoutsPartialsFooter'}
  }
});

Router.route('/', {
  name: 'homeIndex'
});

Router.route('/register', {
  name: 'registerIndex'
});

Router.route('/register-business', {
  name: 'registerIndexBusiness',
  //Load Google Maps before the form loads.
  onBeforeAction: function() {
    if (!GoogleMaps.loaded()) {
      GoogleMaps.load({
        key: '',
        libraries: 'geometry,places'
      });
    }

    //Continues the route as normal.
    this.next();
  }
});

Router.route('/signin', {
  name: 'signinIndex'
});

Router.route('/locations', {
  name: 'locationsIndex'
});

Router.route('/:username/dashboard', {
  name: 'dashboardIndex'
});

Router.route('/:businessName/menu', {
  name: 'menuIndex'
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('signUp', {
  redirect: '/:username/dashboard'
});
AccountsTemplates.configureRoute('signIn', {
  redirect: '/locations'
});