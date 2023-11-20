import User from "../models/UserModel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "roleId"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "roleId"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { username, password, confirmPassword, role, email, name } = req.body;
  console.log(password, confirmPassword);
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Kata Sandi dan Konfirmasi Kata Sandi tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      username: username,
      email: email,
      name: name,
      password: hashPassword,
      isActive: true,
      role: role,
    });

    res.status(201).json({ message: "Pengguna berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
