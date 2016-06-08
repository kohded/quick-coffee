import { Template } from 'meteor/templating';

import './index.html';

import { Checkout } from '../../api/businesses/checkout.js';

import { Menu } from '../../api/businesses/menu.js';


Template.menuIndexMenu.onCreated(function() {
    Session.setDefault("checkOutCart", {});
});

//Template - menuIndex
Template.menuIndex.helpers({
  getBusinessName: function() {
    return Router.current().params.businessName;
  }
});

Template.menuIndexMenu.helpers({
  getMenu       : function() {

    var business = Session.get('business');

    Meteor.subscribe('menu', business._id);

    return Menu.find({
      id: business._id
    });
  },
  drinkSizeCount: function(arr) {
    return arr.length;
  }
});

Template.menuIndexMenu.events({
    'click #orderBtn': function(e) {
        e.preventDefault();

        var checkOutCart = Session.get("checkOutCart");

        // Checks to see if the object is empty to determine
        // if there needed to be an initialized value stored
        // in the session or not
        if (Object.keys(checkOutCart).length == 0) {

            var tempCart = {
                businessId: Session.get('business')._id,
                cart: [],
                total: 0,
                date: 0
            }

            tempCart.cart.push(this.singleDrink);
            Session.set("checkOutCart", tempCart);
        } else {
            checkOutCart.cart.push(this.singleDrink);
            Session.set("checkOutCart", checkOutCart);
        }

    }
});

Template.menuCheckOut.helpers({
    itemsOrdered: function() {
        return Session.get("checkOutCart").cart;
    },
    total: function() {
        var checkOutCart = Session.get("checkOutCart").cart;

        var total = 0;

        checkOutCart.forEach(function(element) {
            total += Number(element.price);
        });

        var salesTax = Number(total) * 0.095;
        var grandTotal = Number(total) + Number(salesTax);
        var wholeTotal = {

            wTotal: total.toFixed(2),
            wSalesTax: salesTax.toFixed(2),
            wGrandTotal: grandTotal.toFixed(2)

        }
        var tempCheckOut = Session.get("checkOutCart");
        tempCheckOut.total = wholeTotal;
        Session.set("checkOutCart", tempCheckOut);
        return wholeTotal;
    }
});

Template.menuCheckOut.events({
    'click #removeDrinkBtn': function(e) {
        e.preventDefault();

        var checkOutCart = Session.get("checkOutCart");

        for (var i = 0; i < checkOutCart.cart.length; i++) {
            if (checkOutCart.cart[i].name == this.name) {
                checkOutCart.cart.splice(i, 1);
                break;
            }
        }

        Session.set("checkOutCart", checkOutCart);
    },
    'click #placeOrder': function(e) {
        e.preventDefault();

        var tempCheckOut = Session.get("checkOutCart");

        //sets date and time order was given
        tempCheckOut.date = new Date();
        tempCheckOut.businessId = Session.get('business')._id;

        Session.set("checkOutCart", tempCheckOut);

        Meteor.call("insertOrder", Session.get("checkOutCart"));

        var tempCart = {
            businessId: Session.get('business')._id,
            cart: [],
            total: 0,
            date: 0
        }

        Session.set("checkOutCart", tempCart);
    }
});
