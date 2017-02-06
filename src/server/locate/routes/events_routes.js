// var eventsModel=require('../model/events_model');
var eventsController=require('../controller/events_controller');

module.exports =function(app){
  //mostramos todos los usuarios
  // console.log('Estic al events_routes');
  app.get('/api/events', eventsController.getEvents);
  // app.get('/api/events/:event_id', eventsController.getEvent);
};
