

var UserApi   = require('../models/userapi.model');


var get_access = function(username, callback){
  var query = {username: username};
  
  UserApi.find(query)
  .exec()
  .then(function(doc){
    if (doc.length > 0 ){
      if (doc.length > 1){
        callback("more than one user with name " + username, {}, false);
      }else{
        callback("user found", doc, true);
      }
    }else{
        callback("no user with name " + username, {}, false);
    }
  })
  .catch(function(err){
    callback("Error querying database", {}, false);
    console.log(err);
  });
};


module.exports.get_access = get_access;
