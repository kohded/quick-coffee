import {
    Template
} from 'meteor/templating';

import '../../api/menu.js';

import './index.html';

//Template - menuIndexMenu
Template.menuIndexMenu.onCreated(function() {
    Session.setDefault('menu', menu);
});

Template.menuIndexMenu.helpers({
    getMenu: function() {
        var menu = Session.get('menu');
        var thisBusinessId = Session.get('thisBusinessId');

        return menu[thisBusinessId];
    },
    drinkSizeCount: function(arr) {
        return arr.length;
    },
    businessInfo: function() {
        var businessInfo = Session.get('businessInfo');
        return businessInfo;
    }
});

Template.menuForm.onCreated(function() {
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

        var drinkSizeInput = '<input placeholder="Drink size (example: 12oz)" type="text" id="' + counter + '_drinksize" value="">';

        forms.push(drinkSizeInput);

        counter++;

        Session.set('counter', counter);
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

        var drinkExtrasInput = '<input placeholder="Drink Extra (example: whip cream)" type="text" id="' + counter + '_drinkextra" value="">';

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
