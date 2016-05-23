import { Businesses } from '../../businesses/businesses.js';

Meteor.startup(function() {
  //Ensures the correct index is defined for the location geometry search
  Businesses._ensureIndex({'location.geometry': '2dsphere'});
});