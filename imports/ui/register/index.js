import { Template } from 'meteor/templating';

import './index.html';

import { Schemas } from '../../api/businesses/businesses.js';

Template.registerIndexBusiness.helpers({
  businessSchema : function() {
    return Schemas.Business;
  },
  getDate        : function() {
    return new Date();
  },
  googleMapsReady: function() {
    return GoogleMaps.loaded();
  }
});

//Register form hooks
AutoForm.addHooks("registerBusiness", {
  onSuccess: function() {
    //Redirect to the dashboard
    Router.go('dashboardIndex', {username: Meteor.user().username});
  },
  onError  : function(formType, error) {
    console.log("error", formType, error);
  }
});