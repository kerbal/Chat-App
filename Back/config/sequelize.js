import Sequelize from 'sequelize';
import developmentConfig from './development.config';
import productionConfig from './production.config';

const config =
  process.env.MODE === 'DEVELOPMENT'
    ? developmentConfig
    : productionConfig;

const sequelize = new Sequelize(
  config.dbname,
  config.username,
  config.password,
  {
    logging: false,
    host: config.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export { sequelize, Sequelize };