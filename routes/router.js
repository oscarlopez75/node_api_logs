var express = require('express');
var checkToken = require('../modules/auth');
var getLogs = require('../modules/get_logs');
var getUsers = require('../modules/get_users');
var connect = require('../modules/dbConnect');
const mongoose = require('mongoose');

var router = express.Router();

router.get('/', function(req, res){
  res.json({
    message: 'Welcome to our api!',
    message2: 'You can go to /logs/getlogs to get all the logs. Need Authorization'
  });
});

router.get('/getlogs', (req, res) => {

  connect.checkCon(function(ready){

    if (ready){
      if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ){
        checkToken.checkToken(req.headers['authorization'], function(mess, resp){
            if (resp){
              getLogs.get_all_logs(mess.username, function(cleared,result){
                if(cleared){
                  res.status(200).json({
                    user: mess.username,
                    cleared: cleared,
                    logs: result
                  });
                }else{
                  res.status(401).json({message: result.message});
                }
              });
            }else{
              res.status(401).json({message: mess});
            }
        });
      }else {
        res.status(401).json({message: "No Token"});
      }
    }else{
      res.status(500).json({message: "Connection to the Database error, contact support"});
      console.log("Database is down. Restart it and then restart the service");
    }






  });


});


router.get('/getusers', (req, res) => {
  connect.checkCon(function(ready){
    if (ready){
      if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ){
        checkToken.checkToken(req.headers['authorization'], function(mess, resp){
          if (resp){
            getUsers.get_all_users(mess.username, function(cleared,result){
              if(cleared){
                res.status(200).json({
                  user: mess.username,
                  users: result
                });
              }else{
                res.status(401).json({message: result.message});
              }
            });
          }else{
            res.status(401).json({message: mess});
          }
        });
      }else{
        res.status(401).json({message: "No Token"});
      }
    }else{
      res.status(500).json({message: "Connection to the Database error, contact support"});
      console.log("Database is down. Restart it and then restart the service");
    }
  });
});





module.exports = router;
