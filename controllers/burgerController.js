var express = require("express");

var router = express.Router();

// Import the model (burgers.js) to use its database functions.
var burger = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res) {
  res.redirect("/index");
});

router.get("/index", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name"], 
  [req.body.burger_name], function(res) {
    res.redirect('/index');
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id=" + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});



// Export routes for server.js to use.
module.exports = router;
