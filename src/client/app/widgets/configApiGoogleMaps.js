(function(){

  'use strict';

  var widgets=angular.module('app.widgets');

  //Google maps configuration
  widgets.config(function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      // key: 'AIzaSyAhxaDfVV53FiAvq_HxOzdYIrGqszV_VM4',
      v:'3.26',
      libraries:'weather,geometry,visualization'
    });

  });

})();
