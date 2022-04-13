const authRoutes = require("./employeesRoutes");
const employeesRoutes = require("./employeesRoutes");
const taskRoutes = require("./taskRoutes");
const wfhRoutes = require("./wfhRoutes");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/employees", employeesRoutes);
  app.use("/api/task", taskRoutes);
  app.use("/api/wfh", wfhRoutes);
};
