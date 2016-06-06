import { Template } from 'meteor/templating';

import './index.html';

import { Menu } from '../../api/businesses/menu.js';

//Template - menuIndex
Template.menuIndex.helpers({
  getBusinessName: function() {
    return Router.current().params.businessName;
  }
});

Template.menuIndexMenu.helpers({
  getMenu       : function() {

    var business = Session.get('business');

    Meteor.subscribe('menu', business._id);

    return Menu.find({
      id: business._id
    });
  },
  drinkSizeCount: function(arr) {
    return arr.length;
  }
});