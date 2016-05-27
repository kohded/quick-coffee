import {
    Template
} from 'meteor/templating';

import './index.html';

import {
    Menu
} from '../../api/businesses/menu.js';

import {
    Businesses
} from '../../api/businesses/businesses.js';

//Template - menuIndex
Template.menuIndex.helpers({
    getBusinessName: function() {
        return Router.current().params.businessName;
    }
});


Template.menuDashboard.helpers({
    getMenuInfo: function() {

        var businessId;

        var business = Businesses.find({
            userId: Meteor.userId()
        });

        business.forEach(function(doc) {
            businessId = doc._id;
        });

        Meteor.subscribe('menu', businessId);

        return Menu.find({
            id: businessId
        });
    }
});

Template.menuIndexMenu.helpers({
    getMenu: function() {

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


Template.menuForm.onCreated(function() {
    Meteor.subscribe('getBusiness', Meteor.userId());

    var counter = 0;
    // Drink Size counter used to create unique IDs for forms
    Session.setDefault('counterDS', counter);

    // Drink Extras counter used to create unique IDs for forms
    Session.setDefault('counterDE', counter);

    // Session used to store all the unique drink size forms
    Session.setDefault('drinkSizeForm', []);

    // Session used to store all the unique drink extra forms
    Session.setDefault('drinkExtrasForm', []);


});

Template.menuForm.events({
    'click #addMoreSizes': function(e) {
        e.preventDefault();
        var counter = Session.get('counterDS');
        var forms = Session.get('drinkSizeForm');

        var isDefined = $('#' + counter + '_drinkSize').val() ? $('#' + counter + '_drinkSize').val() : "";
        var drinkSizeInput = '<input placeholder="Drink size (example: 12oz)" type="text" id="' + counter + '_drinkSize" value="' + isDefined + '">';

        forms.push(drinkSizeInput);

        counter++;

        Session.set('counterDS', counter);
        Session.set('drinkSizeForm', forms);
    },

    'click #removeASize': function(e) {
        e.preventDefault();
        var forms = Session.get('drinkSizeForm');
        forms.splice(forms.length - 1, 1);
        Session.set('drinkSizeForm', forms);

    },

    'click #addMoreExtras': function(e) {
        e.preventDefault();

        var counter = Session.get('counterDE');
        var forms = Session.get('drinkExtrasForm');

        var isDefined = $('#' + counter + '_drinkExtra').val() ? $('#' + counter + '_drinkExtra').val() : "";

        var drinkExtrasInput = '<input placeholder="Drink Extra (example: whip cream)" type="text" id="' + counter + '_drinkExtra" value="' + isDefined + '">';

        forms.push(drinkExtrasInput);

        counter++;

        Session.set('counterDE', counter);
        Session.set('drinkExtrasForm', forms);
    },

    'click #removeAExtra': function(e) {
        e.preventDefault();
        var forms = Session.get('drinkExtrasForm');
        forms.splice(forms.length - 1, 1);
        Session.set('drinkExtrasForm', forms);
    },

    'click #addDrink': function(e) {
        e.preventDefault();

        var drinkName = $('#drinkName').val();
        var drinkDesc = $('#drinkDesc').val();
        var drinkPrice = $('#drinkPrice').val();
        var drinkSizes = [];
        var drinkExtras = [];
        var note = $('#note').val();

        var firstDrinkSize = $('#drinkSize').val();

        if (firstDrinkSize) {
            drinkSizes.push(firstDrinkSize);
        }

        for (var i = 0; i < Session.get('counterDS'); i++) {
            var dynamicSizeInput = $('#' + i + '_drinkSize').val();

            if (dynamicSizeInput) {
                drinkSizes.push(dynamicSizeInput);
            }
        }

        var firstDrinkExtra = $('#drinkExtra').val();

        if (firstDrinkExtra) {
            drinkExtras.push(firstDrinkExtra);
        }

        for (var i = 0; i < Session.get('counterDE'); i++) {
            var dynamicExtraInput = $('#' + i + '_drinkExtras').val();

            if (dynamicExtraInput) {
                drinkExtras.push(dynamicExtraInput);
            }
        }

        var drink = {
            name: drinkName,
            description: drinkDesc,
            price: drinkPrice,
            sizes: drinkSizes,
            extras: drinkExtras,
            note: note
        }

        if (drinkName && firstDrinkSize && drinkPrice) {

            var businessId;

            var business = Businesses.find({
                userId: Meteor.userId()
            });

            business.forEach(function(doc) {
                businessId = doc._id;
            });

            var drinkObj = {
                id: businessId,
                singleDrink: drink
            }

            Meteor.call('insertDrink', drinkObj);

        } else {
            // validation of some sort
        }
    }
});

Template.menuForm.helpers({
    drinkSizeInput: function() {
        return Session.get('drinkSizeForm');
    },
    drinkExtrasInput: function() {
        return Session.get('drinkExtrasForm');
    }

});
