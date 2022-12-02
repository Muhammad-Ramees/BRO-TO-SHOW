const { response } = require("express");
var express = require("express");
const admin_helper = require("../helpers/admin_helper");
var router = express.Router();

/* VERIFY LOGIN FOR ALL */
const verifyLogin = (req, res, next) => {
  let log = req.session.adminLoggedIn;
  if (log) {
    next();
  } else {
    console.log("admin-login===============");
    res.render("admin/admin-login", { adminPage: true });
  }
};

/* GET home page. */
router.get("/", verifyLogin, (req, res) => {
  let adminDetails = req.session.admin;

  res.render("admin/index", {
    admin: true,
    adminDetails,
    adminPage: true,
    dashboard: true,
  });
});

/* GET Login  page. */
router.get("/admin-login", (req, res) => {
  if (req.session.adminLoggedIn) {
    res.redirect("/admin");
  } else {
    res.render("admin/admin-login", {
      loginErr: req.session.LoginErr,
      adminPage: true,
    });
    req.session.LoginErr = false;
  }
});

/* VERIFY ADMIN LOGIN . */
router.post("/admin-login", (req, res, next) => {
  console.log(req.body);
  admin_helper
    .doLogin(req.body)
    .then((response) => {
      if (response.status) {
        req.session.admin = response.admin;
        req.session.adminLoggedIn = true;
        res.redirect("/admin");
      } else {
        req.session.adminLoggedIn = false;
        req.session.LoginErr = "Invalid username/email or password";
        res.redirect("/admin/admin-login");
      }
    })
    .catch((err) => {
      return next(err);
    });
});

/* LOGOUT ADMIN  */
router.get("/admin-logout", (req, res) => {
  req.session.adminLoggedIn = false;
  res.render("admin/admin-login", { adminPage: true });
});

// THEATRE MANAGEMENT
router.get("/theatre-management", (req, res) => {
  res.render("admin/theatre-management", {
    admin: true,
    adminPage: true,
    theatreManagemnet: true,
  });
});

//USER MANAGEMENT
router.get("/users-management", (req, res) => {
  res.render("admin/users-management", {
    admin: true,
    adminPage: true,
    userManagement: true,
  });
});

//TRACK USER ACTIVITIES
router.get("/users-activity", (req, res) => {
  res.render("admin/users-activity", {
    admin: true,
    adminPage: true,
    userActivity: true,
  });
});

// THEATRE OVERVIEW
router.get("/theatre-overview", (req, res) => {
  res.render("admin/theatre-overview", {
    admin: true,
    adminPage: true,
    theatreManagemnet: true,
  });
});

// ADMIN PROFILE
router.get("/admin-profile", (req, res) => {
  res.render("admin/admin-profile", {
    admin: true,
    adminPage: true,
    adminProfile: true,
  });
});

// ADD THEATRE OWNERE
router.get("/add-owner", (req, res) => {
  res.render("admin/add-owner", {
    admin: true,
    adminPage: true,
    theatreManagemnet: true,
  });
});
module.exports = router;
