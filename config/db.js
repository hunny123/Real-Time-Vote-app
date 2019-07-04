const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://hunny0402:hunny@cluster0-4gpa9.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true }).then(()=>console.log("connected"))
.catch(err=>console.log("error"));