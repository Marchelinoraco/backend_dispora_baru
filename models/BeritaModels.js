import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Berita = db.define(
  "BERITA",
  {
    id_berita: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    judul_berita: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isi_berita: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gambar: DataTypes.STRING,
    URL: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Berita;
