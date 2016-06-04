import { Template } from 'meteor/templating';

import './index.html';

Template.homeIndex.onRendered(function() {
  $('.parallax').parallax();
});