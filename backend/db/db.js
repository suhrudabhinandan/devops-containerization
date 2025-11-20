// backend/db/db.js
const { Sequelize } = require('sequelize');

const useUrl = !!process.env.DATABASE_URL;

const sequelize = useUrl
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: process.env.DB_DIALECT || 'mysql',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'railway',
      process.env.DB_USER || 'root',
      process.env.DB_PASS || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
      }
    );

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
