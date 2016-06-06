import {
  Template
} from 'meteor/templating';

import {
  Businesses
} from '../../api/businesses/businesses.js';
import {
  Schemas
} from '../../api/businesses/businesses.js';

import './index.html';

var Locations = new ReactiveVar(null);
var Map       = null;
var Markers   = [];

Template.locationsIndex.onRendered(function() {
  this.autorun(function() {
    //Load Google Maps.
    if(!GoogleMaps.loaded()) {
      GoogleMaps.load({
        key      : '',
        libraries: 'geometry,places'
      });
    }

    //Google Maps initial settings and options.
    if(GoogleMaps.loaded()) {
      var lat    = 47.6062;
      var lng    = -122.3321;
      var latlng = new google.maps.LatLng(lat, lng);

      var options = {
        zoom                  : 12,
        streetViewControl     : true,
        scaleControl          : true,
        draggable             : true,
        disableDefaultUI      : true,
        disableDoubleClickZoom: true,
        mapTypeId             : google.maps.MapTypeId.ROADMAP,
        center                : latlng
      };

      //Load map into map-container.
      Map = new google.maps.Map(document.getElementById('map-container'),
        options);
    }
  });
});

//////////////////// Search Input ////////////////////
Template.locationsIndexSearchInput.onRendered(function() {
  //Fixes overlapping of placeholder and value on refresh.
  Materialize.updateTextFields();

  this.autorun(function() {
    var locations = Locations.get();

    //If there are locations search for businesses.
    if(locations) {
      Meteor.subscribe('searchBusinesses', locations);
    }
  });
});

Template.locationsIndexSearchInput.helpers({
  googleMapsReady: function() {
    return GoogleMaps.loaded();
  },
  searchSchema   : function() {
    return Schemas.Search;
  },
  businessSchema : function() {
    return Schemas.Business;
  }
});

AutoForm.addHooks('searchBusiness', {
  onSubmit : function(insertDoc, updateDoc, currentDoc) {
    check(insertDoc, Schemas.Search);
    Locations.set(insertDoc);
    this.done();

    return false;
  },
  onSuccess: function(formType, result) {
  },
  onError  : function(formType, error) {
    console.log('error', formType, error);
  }
});
//////////////////// Search Input ////////////////////

//////////////////// Map ////////////////////
var addMarkersToMap = function(businesses) {
  if(!Map) {
    console.log('Map not initialized!');

    return;
  }

  // Remove existing markers
  Markers.forEach(function(marker) {
    marker.setMap(null);
  });
  Markers = [];

  var center = true;

  //Iterate through businesses and add markers.
  businesses.forEach(function(business) {
    var lat = business.location.lat;
    var lng = business.location.lng;

    if(center) {
      Map.setCenter(new google.maps.LatLng(lat, lng));
      center = false;
    }

    var marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      map     : Map
    });

    //Click marker.
    marker.addListener('click', function() {
      console.log('clicked on ', business);
    });

    Markers.push(marker);
  });
};

Template.locationsIndexMap.onRendered(function() {
  this.autorun(function() {
    var businesses = Businesses.find({});

    //If there are businesses add markers to the map.
    if(businesses.count() > 0) {
      addMarkersToMap(businesses.fetch());
    }
  });
});
//////////////////// Map ////////////////////

//////////////////// Locations List ////////////////////

Template.locationsIndexList.onCreated(function() {
  Session.setDefault('business');
});

Template.locationsIndexList.helpers({
  getBusinesses: function() {
    return Businesses.find({});
  }
});

Template.locationsIndexList.events({
  'click #viewMenu': function() {
    var business = {
      _id          : this._id,
      businessName : this.businessName,
      location     : this.location,
      businessPhone: this.businessPhone
    };

    Session.set('business', business);
  }
});
//////////////////// Locations List ////////////////////