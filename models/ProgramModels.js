import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Program = db.define(
  "TabelProgram",
  {
    id_program: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_program: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gambar_program: {
      type: DataTypes.STRING,
    },
    URL: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default Program;
