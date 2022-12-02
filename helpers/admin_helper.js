const { ADMIN_COLLECTION } = require("../config/collection");
const bcrypt = require("bcrypt");

const db = require("../config/connection");
module.exports = {
  doLogin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      let adminPassword = "980";
      let userName = "admin";
      let response = {};
      let admin = await db.get().collection(ADMIN_COLLECTION).find().toArray();
      if (admin.length == 0) {
        adminPassword = await bcrypt.hash(adminPassword, 10);
        let adminDetails = {
          adminName: userName,
          adminPassword: adminPassword,
        };
        db.get()
          .collection(ADMIN_COLLECTION)
          .insertOne(adminDetails)
          .then((data) => {
            console.log(adminDetails, "Admin data added successfully");
            // userData._id = data.insertedId;
            resolve(adminDetails);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let adminDetails = await db
          .get()
          .collection(ADMIN_COLLECTION)
          .findOne({ adminName: adminData.adminName });
        if (adminDetails) {
          bcrypt
            .compare(adminData.adminPwd, adminDetails.adminPassword)
            .then((status) => {
              console.log(status, "status===========");
              if (status) {
                response.admin = adminDetails;
                response.status = true;
                resolve(response);
                console.log("Loginned Successfully");
              } else {
                console.log("Login failed");
                response.status = false;
                resolve(response);
              }
            });
        } else {
          response.status = false;
          console.log("admin not found");
          resolve(response);
        }
      }
    });
  },
};
