import { Template } from 'meteor/templating';

import './index.html';

Template.dashboardIndex.onRendered(function() {
  $(document).ready(function() {
    $('ul.tabs').tabs();
  });
});