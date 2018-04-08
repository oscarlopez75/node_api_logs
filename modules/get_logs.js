var connect = require('./dbConnect');
const mongoose = require('mongoose');

var Log       = require('../models/log.model');
var get_access = require('./get_access');


var get_all_logs = function(username, callback){

  get_access.get_access(username, function(message, result, control){

    if (control){
      if (result[0].access === "admin" && result[0].status === "active"){
        Log.find()
        .exec()
        .then(function(doc){
          callback(doc);
        })
        .catch(function(err){
          callback(err);
        });
      }else{
        callback({message: "User does not have access to the api"});
      }
    }else{
      callback({message: message});
    }
  });

};

module.exports.get_all_logs = get_all_logs;
