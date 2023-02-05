const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DBDATABASE, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: process.env.DBDIALECT,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = connection;