import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Program from "./ProgramModels.js";

const { DataTypes } = Sequelize;
const RegProgram = db.define(
  "TabelRegProgram",
  {
    id_reg_program: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_program: DataTypes.INTEGER,
    nama_reg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    umur_reg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gambar_ktp: {
      type: DataTypes.STRING,
    },
    gambar_khs: {
      type: DataTypes.STRING,
    },
    gambar_spbupati: {
      type: DataTypes.STRING,
    },
    gambar_biodatareg: {
      type: DataTypes.STRING,
    },
    gambar_pasfoto: {
      type: DataTypes.STRING,
    },
    gambar_belumbea: {
      type: DataTypes.STRING,
    },
    gambar_databpp: {
      type: DataTypes.STRING,
    },
    gambar_ketpimpinan: {
      type: DataTypes.STRING,
    },
    gambar_kartumahasiswa: {
      type: DataTypes.STRING,
    },
    gambar_kk: {
      type: DataTypes.STRING,
    },
    gambar_proposalakhir: {
      type: DataTypes.STRING,
    },
    URL_ktp: {
      type: DataTypes.STRING,
    },
    URL_khs: {
      type: DataTypes.STRING,
    },
    URL_spbupati: {
      type: DataTypes.STRING,
    },
    URL_biodatareg: {
      type: DataTypes.STRING,
    },
    URL_pasfoto: {
      type: DataTypes.STRING,
    },
    URL_belumbea: {
      type: DataTypes.STRING,
    },
    URL_databpp: {
      type: DataTypes.STRING,
    },
    URL_ketpimpinan: {
      type: DataTypes.STRING,
    },
    URL_kartumahasiswa: {
      type: DataTypes.STRING,
    },
    URL_kk: {
      type: DataTypes.STRING,
    },
    URL_proposalakhir: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

Program.hasMany(RegProgram);
RegProgram.belongsTo(Program, { foreignKey: "id_program" });
export default RegProgram;
