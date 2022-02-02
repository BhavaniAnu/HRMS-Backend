const express = require('express');
const authController = require('../controllers/authController');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', employeeController.getMe, employeeController.getUser);
router.patch(
  '/updateMe',
  employeeController.uploadUserPhoto,
  employeeController.resizeUserPhoto,
  employeeController.updateMe
);
router.delete('/deleteMe', employeeController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(employeeController.getAllUsers)
  .post(employeeController.createUser);

router
  .route('/:id')
  .get(employeeController.getUser)
  .patch(employeeController.updateUser)
  .delete(employeeController.deleteUser);

module.exports = router;