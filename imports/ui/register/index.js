import { Template } from 'meteor/templating';

import './index.html';

Template.registerIndexBusiness.events({
  'submit #register-business': function(event) {
    event.preventDefault();

    var userId   = Meteor.userId();
    var business = {
      userId              : userId,
      businessName        : $('#business-name').val(),
      businessAddress     : $('#business-address').val(),
      businessAddress2    : $('#business-address2').val(),
      businessAddressCity : $('#business-address-city').val(),
      businessAddressState: $('#business-address-state').val(),
      businessAddressZip  : $('#business-address-zip').val(),
      businessPhone       : $('#business-phone').val(),
      dateRegistered      : new Date(),
      businessDrinkMenu   : []
    };

    //Assign business role when registering business.
    Meteor.call('registerBusiness', business);

    //Clear form values
    event.target.reset();

    Router.go('dashboardIndex', Meteor.user().username);
  }
});