import { Template } from 'meteor/templating';

import './index.html';

Template.dashboardIndex.onRendered(function() {
  $(document).ready(function() {
    $('ul.tabs').tabs();
  });
  $(document).ready(function() {
    $('.collapsible').collapsible({
      accordion: true
    });
  });
});

Template.dashboardIndexAccount.events({
  'submit #update-username': function(event) {
    event.preventDefault();

    var username = $('#username').val();

    //Update username
    Meteor.call('updateUsername', Meteor.userId(), username);

    //Clear form values
    event.target.reset();
  },
  'submit #update-email'   : function(event) {
    event.preventDefault();

    var email = $('#email').val();

    //Update email
    Meteor.call('updateEmail', Meteor.userId(), email);

    //Clear form values
    event.target.reset();
  },
  'submit #update-password': function(event) {
    event.preventDefault();

    var password = $('#password').val();

    //Update password
    Meteor.call('updatePassword', Meteor.userId(), password);

    //Clear form values
    event.target.reset();
  }
});