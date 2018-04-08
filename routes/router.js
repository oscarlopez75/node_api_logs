var express = require('express');
var checkToken = require('../modules/auth');
var getLogs = require('../modules/get_logs');

var router = express.Router();

router.get('/', function(req, res){
  res.json({
    message: 'hooray! welcome to our api!',
    message2: 'You can go to /logs/getlogs to get all the logs. Need Authorization'
  });
});

router.get('/getlogs', (req, res) => {
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ){
    checkToken.checkToken(req.headers['authorization'], function(mess, resp){
        if (resp){
          getLogs.get_all_logs(mess.username, function(result){
            res.status(200).json({
              user: mess.username,
              logs: result
            });
          });
        }else{
          res.status(401).json({
            message: mess
          });
        }
    });
  }else {
    res.status(401).json({
        error: {
            message: 'No token!'
        }
    });
  }
});





module.exports = router;
