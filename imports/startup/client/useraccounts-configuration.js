import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  confirmPassword: true,
  enablePasswordChange: true,
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  texts: {
    signInLink_link: 'Sign In',
    title: {
      changePwd: "Change Password",
      enrollAccount: "Enroll Account",
      forgotPwd: "Forgot Password",
      resetPwd: "Reset Password",
      signIn: 'Sign In',
      signUp: "Register",
      verifyEmail: "Verify Email"
    }
  }
});

//Adds both username and email registration/sign in.
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email'
  },
  pwd
]);