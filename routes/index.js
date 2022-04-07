const authRoutes = require("./employeesRoutes");
const employeesRoutes = require("./employeesRoutes");
const taskRoutes = require("./taskRoutes");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/employees", employeesRoutes);
  app.use("/api/task", taskRoutes);
};
