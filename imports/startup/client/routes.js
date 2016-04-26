// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/home/index.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: "homeIndex"
});