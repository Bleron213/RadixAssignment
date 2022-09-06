import sequelizeInstance from "../database";
import { DataTypes } from 'sequelize';

export const User = sequelizeInstance.define("users", 
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName :{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName : {
            type:DataTypes.STRING,
            allowNull: false
        }
    }
  );
  