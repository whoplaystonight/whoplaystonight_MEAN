var eventsModel=require('../model/events_model');


exports.getEvents=function(req, res){
  // console.log('*************Estic al events_controller************************');
  eventsModel.getEvents(function(error, data){
    if(error){
      res.send(error);
    }

    res.json(200,data);

  });
};
