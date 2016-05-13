import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //Add business role when user registers business.
  'assignBusinessRole'(userId) {
    var role = 'business';

    Roles.addUsersToRoles(userId, role);
  },
  'updateUsername'(userId, username){
    Meteor.users.update({_id: userId}, {$set: {username: username}});
  },
  'updateEmail'(userId, email){
    Meteor.users.update({_id: userId}, {$set: {email: email}});
  },
  'updatePassword'(userId, password){
    Accounts.setPassword(userId, password, {logout: false});
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