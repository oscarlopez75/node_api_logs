var express = require('express');
var checkToken = require('../modules/auth');
var getLogs = require('../modules/get_logs');
var connect = require('../modules/dbConnect');
const mongoose = require('mongoose');

var router = express.Router();

router.get('/', function(req, res){
  res.json({
    message: 'hooray! welcome to our api!',
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
                res.status(200).json({
                  user: mess.username,
                  cleared: cleared,
                  logs: result
                });
              });
            }else{
              res.status(401).send(mess);
            }
        });
      }else {
        res.status(401).send('No token');
      }
    }else{
      res.status(400).send("Connection to the Database error, contact support");
      console.log("Database is down. Restart it and then restart the service");
    }






  });


});





module.exports = router;
