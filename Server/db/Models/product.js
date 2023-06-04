const sequelize = require("../conn");
const { DataTypes } = require('sequelize');


const Product = sequelize.define('Products', {
    // Model attributes are defined here
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           isIn: {
                args: [['winter', "summer"]],
                msg: "Must be Summer or Winter"
              }
        }
      },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  

  console.log(Product === sequelize.models.Product);
module.exports = Product ;