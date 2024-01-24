const express = require("express");
const router = express.Router();

const empController = require("../controllers/empController");

//display all records
router.get("/", empController.view);

//addUser
router.get("/addUser", empController.addUser);
router.post("/addUser", empController.save);

//editUser
router.get("/editUser/:id", empController.editUser);
router.post("/editUser/:id", empController.edit);

//deleteUser
router.get("/deleteUser/:id", empController.delete);
module.exports = router;
