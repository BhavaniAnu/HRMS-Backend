const jsend = require("../utils/jsend");
const EmployeeModel = require('../models/employeeModel.js');;
const APIFeatures = require('./../utils/apiFeatures');
// Post Method
exports.create = (req, res) => {
    const newEmployee = new EmployeeModel(req.body);

    newEmployee.save((err, employee) => {
        if (err) {
            return res.status(500).send(
                jsend(500, {
                    message: "Some error occured and a new Employee could not be created!",
                })
            );
        }

        res.status(201).send(
            jsend(201, {
                employee
            })
        );
    });
};

// Get Method

exports.getById = (req, res) => {
    EmployeeModel.findOne({ _id: req.params.employeeId })
      .then((employee) => {
        if (!employee) {
          return res.status(404).send(
            jsend(404, {
              message: "employee not found!",
            })
          );
        }
  
        res.status(200).send(
          jsend(200, {
            employee,
          })
        );
      })
      .catch((err) => {
        res.status(404).send(
          jsend(404, {
            message: "employee not found!",
          })
        );
      });
  };

//   Get All Employees

exports.getAll = EmployeeModel =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.employeeId) filter = { employee: req.params.employeeId };

    const features = new APIFeatures(EmployeeModel.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

//   Patch Method
  EmployeeModel.findOneAndUpdate({ _id: req.params.employeeId }, req.body)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send(
          jsend(404, {
            message: "employee not found!",
          })
        );
      }

      res.status(200).send(
        jsend(200, {
          employee,
        })
      );
    })
    .catch((err) => {
      res.status(404).send(
        jsend(404, {
          message: "employee not found!",
        })
      );
    });

// Delete Method

exports.delete = (req, res) => {
    ProductModel.findOneAndDelete(
      { _id: req.params.employeeId },
      (err, employee) => {
        if (err) {
          return res.status(500).send(
            jsend(500, {
              message: "An error occurred and the employee could not be removed!",
            })
          );
        }
    
        if (!employee) {
          return res.status(404).send(
            jsend(404, {
              message: "employee not found!",
            })
          );
        }
    
        res.status(200).send(
          jsend(200, {
            employee
          })
        );
      }
    );
    };