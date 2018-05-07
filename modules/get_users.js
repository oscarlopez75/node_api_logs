var Log       = require('../models/userapi.model');
var get_access = require('./get_access');


var get_all_users = function(username, callback){

  get_access.get_access(username, function(message, result, control){
    var cleared = false;
    if (control){
      if (result[0].access === "admin" && result[0].status === "active"){
        Log.find()
        .exec()
        .then(function(doc){
          cleared = true;
          callback(cleared, doc);
        })
        .catch(function(err){
          callback(cleared, err);
        });
      }else{
        callback(cleared, {message: "User does not have access to the api"});
      }
    }else{
      callback(cleared, {message: message});
    }
  });

};

module.exports.get_all_users = get_all_users;
