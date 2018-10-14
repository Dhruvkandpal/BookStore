var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "buy_sell"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.post("/check-login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  //console.log("check login called");
  var sql = "select * from user where Email='" +
      email +
      "' AND Password = '" +
      password +
      "'";
  con.query(sql, function (err, result, fields) {
		if(err) {throw err;}else{res.send(result);}
		console.log(result);
  });
});

router.post("/signup", function(req, res) {
  var college = req.body.college;
  var password = req.body.password;
  var email = req.body.email;
  var mobile = req.body.phone;
  var address = req.body.address;
  console.log(req.body);
  console.log(email);
  console.log("singup called");
      var sql =
      "insert into user(Name, Email, Password, Phone, Address, College)" +
      "values('" +
	  name +
	  "','" +
      email +
      "','" +
      password +
      "','" +
      mobile +
      "','" +
      address +
      "','" +
      college +
      "')";
  con.query(sql, function (err, fields) {
        if(err) {
          console.error('Error in sql query:' + sql + ' Err', err);
          throw err;
        }
  console.log(fields);
  });
});

router.get("/booklist", function(req, res) {
	con.query("select * from booklist", function(err,result,fields) {
		if(err) {throw err;}else{res.send(result);}
		console.log(result);
	});
});

router.post("/wishlist", function(req, res) {
  var bookID = req.body.bookID;
  var userID = req.body.userID;
  //console.log("check login called");
  var sql = "insert into wish(userID, bookID)" +
      "values('" +
	  userID +
	  "','" +
      bookID +
      "')";
  con.query(sql, function (err, fields) {
        if(err) {
          console.error('Error in sql query:' + sql + ' Err', err);
          throw err;
        }
  console.log(fields);
  });
});

router.post("/wishlist2", function(req, res) {
	console.log("wish list called");
	var userID = req.body.userID;
	var sql = "select * from wish where userID=" + userID;
	con.query(sql, function(err,result,fields) {
		if(err) {throw err;}else{res.send(result);}
		console.log(result);
	});
});

module.exports = router;
