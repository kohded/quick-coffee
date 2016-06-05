import { AccountsTemplates } from 'meteor/useraccounts:core';

//onLogoutHook
var logOut = function() {
  Router.go('/signin');
};

AccountsTemplates.configure({
  // Behavior
  confirmPassword      : true,
  enablePasswordChange : true,
  sendVerificationEmail: true,
  focusFirstInput      : true,

  //Appearance
  showForgotPasswordLink         : true,
  showResendVerificationEmailLink: true,

  //Client-side Validation
  continuousValidation: true,
  negativeValidation  : true,
  showValidating      : true,

  // Hooks
  onLogoutHook: logOut,

  //Texts
  texts: {
    signInLink_link: 'Sign In',
    title          : {
      changePwd    : 'Change Password',
      enrollAccount: 'Enroll Account',
      forgotPwd    : 'Forgot Password',
      resetPwd     : 'Reset Password',
      signIn       : 'Sign In',
      signUp       : 'Register',
      verifyEmail  : 'Verify Email'
    },
    button         : {
      //changePwd: 'Password Text',
      //enrollAccount: 'Enroll Text',
      //forgotPwd: 'Forgot Pwd Text',
      resetPwd: 'Reset Password'
      //signIn: 'Sign In Text',
      //signUp: 'Sign Up Text'
    }
  }
});

//Adds both username and email registration/sign in.
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id        : 'username',
    type       : 'text',
    displayName: 'username',
    required   : true,
    minLength  : 5
  },
  {
    _id        : 'email',
    type       : 'email',
    required   : true,
    displayName: 'email',
    re         : /.+@(.+){2,}\.(.+){2,}/,
    errStr     : 'Invalid email'
  },
  {
    _id        : 'username_and_email',
    type       : 'text',
    required   : true,
    displayName: 'Username or Email'
  },
  pwd
]);