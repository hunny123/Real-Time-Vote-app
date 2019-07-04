const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/vote');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '815307',
  key: '42c58515e947a2dd2528',
  secret: '0ff121ef5b80fadd2f67',
  cluster: 'ap2',
  encrypted: true
});

router.get('/',(req,res)=>{
    Vote.find().then(votes=>res.json({success:true,votes:votes}));
})
router.post('/',(req,res)=>{
   const newVote = {
     os: req.body.os, 
     points:1
   };
   new Vote(newVote).save().then(vote=>{
     
    pusher.trigger('os-poll', 'os-vote', {
        points:parseInt(vote.points),
        os:vote.os
      });
     return res.json({success:true,message:'thank you for voting'}) ;
    
});
});






module.exports = router;