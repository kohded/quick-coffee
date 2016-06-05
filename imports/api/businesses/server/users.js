Meteor.startup(function() {
  //Email credentials
  process.env.MAIL_URL = "";

  //Removes the /# in the verification email.
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
});