import { Template } from 'meteor/templating';

import '../../api/businesses.js'; //TEMP Only for session business object

import './index.html';

//Template locationsIndexMap
GoogleMaps.load();

Template.locationsIndexMap.onCreated(function() {
  // Use the `ready` callback to interact with the map API once the map is
  // ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready.
    var marker = new google.maps.Marker({
      position: map.options.center,
      map     : map.instance
    });
  });
});

Template.locationsIndexMap.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded.
    if(GoogleMaps.loaded()) {
      // Map initialization options.
      return {
        center: new google.maps.LatLng(47.383871, -122.235361),
        zoom  : 8
      };
    }
  }
});

Template.locationsIndexLocation.events({
  'click #viewMenu': function(event) {
    //prevent the form from refreshing the page
    //event.preventDefault();

    Session.set('thisBusinessId', this.businessId);
    Session.set('businessInfo', this);
  }
});

//Template - locationsIndexLocation
Template.locationsIndexLocation.onCreated(function() {
  Session.setDefault('businesses', businesses);
});

Template.locationsIndexLocation.helpers({
  getBusinesses: function() {
    return Session.get('businesses');
  }
});
