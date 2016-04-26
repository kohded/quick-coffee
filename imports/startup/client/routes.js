// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/home/index.js';
import '../../ui/register/index.js';
import '../../ui/signin/index.js';
import '../../ui/locations/index.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: "homeIndex"
});

Router.route('/register', {
  name: "registerIndex"
});

Router.route('/signin', {
  name: "signinIndex"
});

Router.route('/locations', {
  name: "locationsIndex"
});