import { Meteor } from 'meteor/meteor';

import { Schemas } from './businesses.js';
import { Businesses } from './businesses.js';
import { Menu } from './menu.js';

Meteor.methods({
  registerBusiness: function(business) {
    check(business, Schemas.Business);
    Businesses.insert(business);

    //Add business role to user.
    var role = 'business';

    Roles.addUsersToRoles(Meteor.userId(), role);
  },
  insertDrink     : function(drinkObj) {
    Menu.insert(drinkObj);
  },
  removeDrink     : function(_id) {
    Menu.remove({_id: _id});
  },
  updateDrink     : function(drink) {
    Menu.update({_id: drink._id}, {
      $set: {
        singleDrink: {
          name       : drink.singleDrink.name,
          description: drink.singleDrink.description,
          price      : drink.singleDrink.price,
          sizes      : drink.singleDrink.sizes,
          extras     : drink.singleDrink.extras,
          note       : drink.singleDrink.note
        }
      }
    });
  }
});