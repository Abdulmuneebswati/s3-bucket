const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('test', 'root', '12345678', {
    host: 'localhost',
    dialect:"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
    sequelize.authenticate().then(()=>
    console.log('Connection has been established successfully.')
    ).catch((error)=>{
    console.error('Unable to connect to the database:', error);
  })
sequelize.sync({})
module.exports = sequelize