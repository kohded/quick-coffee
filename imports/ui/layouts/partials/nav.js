//Mobile Sidebar
Template.layoutsPartialsNav.onRendered(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true,
    edge        : 'right',
    menuWidth   : 200
  });
});

Template.layoutsPartialsNav.events({
  'click .logout': function(event){
    AccountsTemplates.logout();

    //Reload page on logout so dropdown template shows. After logout, dropdown
    // doesn't work if you log right back in without refresh.
    //location.reload(true); //Seems slower
    Meteor._reload.reload();
  }
});

Template.layoutsPartialsNavDropdownSignedIn.onRendered(function(){
  $(".dropdown-button").dropdown({
    belowOrigin: true
  });
});