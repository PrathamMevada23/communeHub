const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/adminControllers');
const verifyToken = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all users (accessible only to admin)
router.get("/user", verifyToken, adminMiddleware, getAllUsers);

// Delete user by ID
// router.delete("/api/users/:userId",verifyToken, adminMiddleware,  getAllUsers.deleteUser);

module.exports = router;


/*auth.js - verifyToekn
  getAllUsers - adminControllers
  adminMiddleWare.js - adminMiddleWare
   
*/ 
