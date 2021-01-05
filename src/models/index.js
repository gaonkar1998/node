const Sequelize = require('sequelize');
require('custom-env').env();
const fs = require('fs');
const path = require('path');
const logger = require('../logger/logger');
const basename = path.basename(__filename);
// require('custom-env').env();
const dbHost = process.env.db_Host;
const dbName = process.env.db_Name;
const username = process.env.user_name;
const password = process.env.Password;
const dbPort = process.env.db_Port;

const sequelize = new Sequelize(`mysql://${username}:${password}@${dbHost}:${dbPort}/${dbName}`);

// // CONNECT TO DB
sequelize
    .authenticate()
    .then(() => {
        logger.info("database connection established");
        console.log(`Connection has been established successfully`);
    })
    .catch(err => {
        logger.error("database connection could not be established");
        console.error('Unable to connect to the database:', err);
    });

const db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename &&
            file.slice(-3) === '.js';
    })
    .forEach(file => {
        // const model = sequelize.import(path.join(__dirname, file));
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
        // logger.debug(`model.name: ${model.name}`);
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 
