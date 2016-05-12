import { Meteor } from 'meteor/meteor';


Meteor.methods({
  //Add business role when user registers business.
  'assignBusinessRole'(userId) {
    var role = 'business';

    Roles.addUsersToRoles(userId, role);
  }
});

//useraccounts package - postSignUpHook
var postSignUp = function(userId, info) {
  var role = 'customer';

  //Add customer role when user registers.
  Roles.addUsersToRoles(userId, role);
};

AccountsTemplates.configure({
  postSignUpHook: postSignUp
});