var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/reservationlist', function(req, res) {
  var db = req.db;
  var collection = db.get('datacollection');
  collection.find({},{},function(e,docs){
      res.render('reservationlist', {
          "itemlist" : docs,
          title: 'Reservation List'
      });
  });
});

/* GET New User page. */
router.get('/makereservation', function(req, res) {
  res.render('makereservation', { title: 'Make Reservation' });
});

/* POST to Add User Service */
router.post('/makereservation', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userFName = req.body.firstname;
  var userLName = req.body.lastname;
  var userEmail = req.body.email;
  var fromDate = req.body.fromdate;
  var toDate = req.body.todate;
  var noOfAdults = req.body.adults;
  var noOfChildren = req.body.children;
 
  // Set our collection
  var collection = db.get('datacollection');

  // Submit to the DB
  collection.insert({
    "FirstName":userFName,
    "LastName":userLName,
    "Email":userEmail,
    "FromDate":fromDate,
    "ToDate":toDate,
    "Adults":noOfAdults,
    "Children":noOfChildren
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("reservationlist");
      }
  });

});

module.exports = router;
