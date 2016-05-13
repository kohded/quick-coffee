import { Template } from 'meteor/templating';

import { Businesses } from '../../api/businesses/businesses.js';

import './index.html';

Template.registerIndexBusiness.events({
  'submit #register-business': function(event) {
    event.preventDefault();

    var userId               = Meteor.userId();
    var businessName         = $('#business-name').val();
    var businessAddress      = $('#business-address').val();
    var businessAddress2     = $('#business-address2').val();
    var businessAddressCity  = $('#business-address-city').val();
    var businessAddressState = $('#business-address-state').val();
    var businessAddressZip   = $('#business-address-zip').val();
    var businessPhone        = $('#business-phone').val();
    var businessDrinkMenu = [];

    Businesses.insert({
      _id                 : userId,
      businessName        : businessName,
      businessAddress     : businessAddress,
      businessAddress2    : businessAddress2,
      businessAddressCity : businessAddressCity,
      businessAddressState: businessAddressState,
      businessAddressZip  : businessAddressZip,
      businessPhone       : businessPhone,
      businessDrinkMenu :  businessDrinkMenu,
      dateRegistered      : new Date()
    });

    //Assign business role when registering business.
    Meteor.call('assignBusinessRole', userId);

    Router.go('dashboardIndex');
  }
});
