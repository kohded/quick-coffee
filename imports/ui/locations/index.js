import { Template } from 'meteor/templating';

import { Businesses } from '../../api/businesses/businesses.js';

import '../../api/businesses/businesses.js';

import './index.html';

//Template Search Input
Template.locationsIndexSearchInput.onRendered(function() {
  this.autorun(function() {
    //Get users current locations.
    var latLng = Geolocation.latLng();

    //Set map options.
    if(GoogleMaps.loaded() && latLng) {
      $('#location').geocomplete({
        location     : new google.maps.LatLng(latLng.lat, latLng.lng),
        map          : $('.map-container'),
        mapOptions   : {
          zoom       : 14,
          scrollwheel: false
        },
        markerOptions: {
          draggable: true
        }
      });
    }
  });
});

Template.locationsIndexMap.helpers({
  //Show an error if users current geolocation doesn't exist.
  geolocationError: function() {
    var error = Geolocation.error();

    return error && error.message;
  }
});

//Template Map
Template.locationsIndexMap.onRendered(function() {
  GoogleMaps.load({
    key      : '',
    libraries: 'places'
  });
});

//Template - Locations List
Template.locationsIndexLocation.onCreated(function() {
  Session.setDefault('businesses', businesses);
});

Template.locationsIndexLocation.events({
  'click #viewMenu': function(event) {

    Session.set('thisBusinessId', this._id);
    Session.set('businessInfo', this);
  }
});

Template.locationsIndexLocation.helpers({
  getBusinesses: function() {
    return Businesses.find();
  }
});
