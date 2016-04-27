//Mobile Sidebar
Template.layoutsPartialsNav.onRendered(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true,
    edge        : 'right',
    menuWidth   : 200
  });
});