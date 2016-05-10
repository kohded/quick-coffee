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
    event.preventDefault();

    AccountsTemplates.logout();

    Router.go('signinIndex');
  }
});