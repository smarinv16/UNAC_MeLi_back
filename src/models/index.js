const {sequelize} = require('../config/database');
const Product = require('./Product');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

module.exports = {
  Product,
  syncDatabase,
};