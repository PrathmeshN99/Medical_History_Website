
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "This website is designed to store, add, delete and view medical records of students living in hostels far away from their parents. This website provides a platform for worried parents to view and understand about their ward's health. By Group 15 of CS-C comprising of Prathmesh, Swapnil, Gautam and Dhammadeep.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/medicalHistoryDB", {useNewUrlParser: true});

const postSchema = {
  date: String,
  overall: String,
  temp: String,
  bp: String,
  cholestrol: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    date: req.body.postDate,
    overall: req.body.postOverall,
    temp: req.body.postTemp,
    bp: req.body.postBP,
    cholestrol: req.body.postCholestrol
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      date: post.date,
      overall: post.overall,
      temp: post.temp,
      bp: post.bp,
      cholestrol: post.cholestrol

    });
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
