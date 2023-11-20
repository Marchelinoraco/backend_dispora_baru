import { response } from "express";
import Berita from "../models/BeritaModels.js";

export const getBerita = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id_berita"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBeritaByid = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["id_berita"],
      where: {
        id_berita: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createBerita = async (req, res) => {
  const { judul_berita, isi_berita, gambar, URL } = req.body;
  try {
    await Berita.create({
      judul_berita: judul_berita,
      isi_berita: isi_berita,
      gambar: gambar,
      URL: URL,
    });

    res.status(201).json({ message: "Berita berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateBerita = async (req, res) => {};
export const deleteBerita = async (req, res) => {};
