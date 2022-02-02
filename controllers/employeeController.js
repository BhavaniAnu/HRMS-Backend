const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
// 2) Filtered out unwanted fields names that are not allowed to be updated
const filteredBody = filterObj(req.body, 'name', 'email');
if (req.file) filteredBody.photo = req.file.filename;

// 3) Update user document
const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
  new: true,
  runValidators: true
});

res.status(200).json({
  status: 'success',
  data: {
    user: updatedUser
  }
});
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

// const jsend = require("../utils/jsend");
// const EmployeeModel = require('../models/employeeModel.js');;
// const APIFeatures = require('./../utils/apiFeatures');

// exports.create = (req, res) => {
//     const newEmployee = new EmployeeModel(req.body);

//     newEmployee.save((err, employee) => {
//         if (err) {
//             return res.status(500).send(
//                 jsend(500, {
//                     message: "Some error occured and a new Employee could not be created!",
//                 })
//             );
//         }

//         res.status(201).send(
//             jsend(201, {
//                 employee
//             })
//         );
//     });
// };


// exports.getById = (req, res) => {
//     EmployeeModel.findOne({ _id: req.params.employeeId })
//       .then((employee) => {
//         if (!employee) {
//           return res.status(404).send(
//             jsend(404, {
//               message: "employee not found!",
//             })
//           );
//         }
  
//         res.status(200).send(
//           jsend(200, {
//             employee,
//           })
//         );
//       })
//       .catch((err) => {
//         res.status(404).send(
//           jsend(404, {
//             message: "employee not found!",
//           })
//         );
//       });
//   };

// exports.getAll = EmployeeModel =>
//   catchAsync(async (req, res, next) => {
//     let filter = {};
//     if (req.params.employeeId) filter = { employee: req.params.employeeId };

//     const features = new APIFeatures(EmployeeModel.find(filter), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();
//     const doc = await features.query;

//     res.status(200).json({
//       status: 'success',
//       results: doc.length,
//       data: {
//         data: doc
//       }
//     });
//   });

//   EmployeeModel.findOneAndUpdate({ _id: req.params.employeeId }, req.body)
//     .then((employee) => {
//       if (!employee) {
//         return res.status(404).send(
//           jsend(404, {
//             message: "employee not found!",
//           })
//         );
//       }

//       res.status(200).send(
//         jsend(200, {
//           employee,
//         })
//       );
//     })
//     .catch((err) => {
//       res.status(404).send(
//         jsend(404, {
//           message: "employee not found!",
//         })
//       );
//     });


// exports.delete = (req, res) => {
//     ProductModel.findOneAndDelete(
//       { _id: req.params.employeeId },
//       (err, employee) => {
//         if (err) {
//           return res.status(500).send(
//             jsend(500, {
//               message: "An error occurred and the employee could not be removed!",
//             })
//           );
//         }
    
//         if (!employee) {
//           return res.status(404).send(
//             jsend(404, {
//               message: "employee not found!",
//             })
//           );
//         }
    
//         res.status(200).send(
//           jsend(200, {
//             employee
//           })
//         );
//       }
//     );
//     };