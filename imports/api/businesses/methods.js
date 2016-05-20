import { Meteor } from 'meteor/meteor';

import { Businesses } from './businesses.js';

Meteor.methods({
  'registerBusiness'(business) {
    Businesses.insert(business);

    //Add business role to user.
    var role = 'business';

    Roles.addUsersToRoles(business.userId, role);
  }
});