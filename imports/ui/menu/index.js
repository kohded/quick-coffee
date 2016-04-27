import { Template } from 'meteor/templating';

import '../../api/menu.js';

import './index.html';

//Template - menuIndexMenu
Template.menuIndexMenu.onCreated(function() {
  Session.setDefault('menu', menu);
});

Template.menuIndexMenu.helpers({
  getMenu: function() {
    var menu           = Session.get('menu');
    var thisBusinessId = Session.get('thisBusinessId');

    return menu[thisBusinessId];
  }
});