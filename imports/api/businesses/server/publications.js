import { Meteor } from 'meteor/meteor';

import { Businesses } from '../businesses.js';

//Publish Business collection
Meteor.publish('businesses', function() {
  return Businesses.find();
});