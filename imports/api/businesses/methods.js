import {
    Meteor
} from 'meteor/meteor';
import {
    Menu
} from './menu.js';
import {
    Businesses
} from './businesses.js';
import {
    Schemas
} from './businesses.js';

Meteor.methods({
    registerBusiness: function(business) {
        check(business, Schemas.Business);
        Businesses.insert(business);

        //Add business role to user.
        var role = 'business';

        Roles.addUsersToRoles(Meteor.userId(), role);
    },
    insertDrink: function(drinkObj) {

        Menu.insert(drinkObj);
    }
});
