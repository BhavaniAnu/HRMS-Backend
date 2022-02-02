const authRoutes = require('./employeesRoutes');
const employeesRoutes = require('./employeesRoutes');

module.exports = app => {
    app.use('/api/auth', authRoutes);
    app.use('/api/employees', employeesRoutes);
}