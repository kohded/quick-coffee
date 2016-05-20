import { Template } from 'meteor/templating';

import { Businesses } from '../../api/businesses/businesses.js';

import './index.html';

Template.locationsIndex.onCreated(function() {
  Meteor.subscribe('businesses');
});

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

Template.locationsIndexLocation.helpers({
  getBusinesses: function() {
    return Businesses.find();
  }
});