const express = require("express");
const wfhController = require("../controllers/wfhController");

const router = express.Router();

router.route("/").get(wfhController.getAllWfh).post(wfhController.createWfh);

router
  .route("/:id")
  .get(wfhController.getWfh)
  .patch(wfhController.updateWfh)
  .delete(wfhController.deleteWfh);

module.exports = router;
