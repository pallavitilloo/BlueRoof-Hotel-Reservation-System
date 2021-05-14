const e = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET New User page. */
router.get('/invalid', function(req, res) {
  res.render('invalid', { title: 'Error' });
});

/* GET New User page. */
router.get('/gallery', function(req, res) {
  res.render('gallery', { title: 'Gallery' });
});

/* GET New User page. */
router.get('/map', function(req, res) {
  res.render('map', { title: 'How To Reach' });
});

router.get('/reviews', function(req, res) {
  var db = req.db;
  var collection = db.get('feedback');
  collection.find({},{},function(e,docs){
      res.render('reviews', {
          "itemlist" : docs,
          title: 'Review List'
      });
  });
});

router.get('/feedback', function(req, res) {
  res.render('feedback', { title: 'Feedback' });
});


router.post('/feedback', function(req, res) {
   // Set our internal DB variable
   var db = req.db;

   // Get our form values. These rely on the "name" attributes   
   var userEmail = req.body.email;
   var content = req.body.feedback;
  
   // Set our collection
   var collection = db.get('feedback');
 
   // Submit to the DB
   collection.insert({
     "username":userEmail,
     "feedback":content
   }, function (err, doc) {
       if (err) {
           // If it failed, return error
           res.redirect("invalid");
       }
       else {
           // And forward to success page
           res.redirect("/");
       }
   });
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

/* GET New User page. */
router.get('/payment', function(req, res) {
  res.render('payment', { title: 'Make Payment' });
});


/* GET New User page. */
router.get('/confirmation', function(req, res) {
  res.render('confirmation', { title: 'Booking Confirmation' });
});

/* GET New User page. */
router.get('/admin', function(req, res) {
  res.render('admin', { title: 'Admin Login' });
});

/* GET New User page. */
router.post('/adminlogin', function(req, res) {
  // Get our form values. These rely on the "name" attributes
  var password = req.body.password;
  if(password == 'admin'){
    res.redirect("reservationlist");
  }
  else{
    res.redirect('invalid');
  }
});


/* POST to Add User Service */
router.post('/makepayment', function(req, res) {
  res.redirect("confirmation");
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
          res.redirect("invalid");
      }
      else {
          // And forward to success page
          res.redirect("payment");
      }
  });

});

module.exports = router;
