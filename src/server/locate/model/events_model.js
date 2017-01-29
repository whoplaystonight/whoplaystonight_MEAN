
var connection=require('../config.js');

var eventsModel={};

eventsModel.getEvents=function(callback){

  if(connection){
    // console.log('*******************Estic al if del getEvents del model********************************');

    connection.query('SELECT * FROM event ORDER BY event_id', function(error, rows){
      if(error){
        throw error;
      }else{
        console.log('Estic al else del getEvents del model');
        callback(null, rows);
      }
    });//end of connection.query
  }// end of if connection

};//end of evenstModel.getEvents

module.exports=eventsModel;
