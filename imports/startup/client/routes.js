// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/home/index.js';
import '../../ui/register/index.js';
import '../../ui/signin/index.js';
import '../../ui/locations/index.js';
import '../../ui/menu/index.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'homeIndex'
});

Router.route('/register', {
  name: 'registerIndex'
});

Router.route('/signin', {
  name: 'signinIndex'
});

Router.route('/locations', {
  name: 'locationsIndex'
});

Router.route('/:businessName/menu', {
  name: 'menuIndex'
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('verifyEmail');