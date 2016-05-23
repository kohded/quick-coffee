import { Meteor } from 'meteor/meteor';

import { Businesses } from '../businesses.js';

//Publish search results for locations within a given radius.
Meteor.publish('searchBusinesses', function(businesses) {
  if(!businesses) {
    return [];
  }

  var radius    = businesses.radius;
  var centerLat = businesses.location.lat;
  var centerLon = businesses.location.lng;

  //Geospatial query selector to find businesses within a given radius.
  var selector = {
    'location.geometry': {
      $near: {
        $geometry   : {
          type       : 'Point',
          coordinates: [centerLon, centerLat]
        },
        $maxDistance: radius * 1000,
        $minDistance: 0
      }
    }
  };

  return Businesses.find(selector);
});