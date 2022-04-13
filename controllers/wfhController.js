const WFH = require("./../models/wfhModel");
const factory = require("./handlerFactory");

exports.getWfh = factory.getOne(WFH);
exports.getAllWfh = factory.getAll(WFH);

exports.createWfh = factory.createOne(WFH);
exports.updateWfh = factory.updateOne(WFH);
exports.deleteWfh = factory.deleteOne(WFH);
