const Task = require("./../models/taskModel");
const factory = require("./handlerFactory");

exports.getTask = factory.getOne(Task);
exports.getAllTasks = factory.getAll(Task);

exports.createTask = factory.createOne(Task);
exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);
