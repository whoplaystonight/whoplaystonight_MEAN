
var connection=require('../../config/config.db.js');

var eventsModel={};

eventsModel.getEvents=function(callback){

  if(connection){
    // console.log('*******************Estic al if del getEvents del model********************************');
    var query='SELECT * FROM event ORDER BY event_id';
    connection.query(query, function(error, rows){
      if(error){
        throw error;
      }else{
        // console.log('Estic al else del getEvents del model');
        callback(null, rows);
      }
    });//end of connection.query
  }// end of if connection

};//end of evenstModel.getEvents


// eventsModel.getEvent=function(event_Id, callback){
//   if(connection){
//     var query='SELECT * FROM event WHERE event_id= ' + connection.escape(event_id);
//     connection.query(query, function(error, rows){
//       if(error){
//           throw error;
//       }else{
//         callback(null, rows);
//       }
//     });
//   }//end of if connection
//
// };//enf¡d of eventsModel.getEvent

module.exports=eventsModel;
