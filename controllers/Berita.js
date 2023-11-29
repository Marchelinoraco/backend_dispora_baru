import { response } from "express";
import Berita from "../models/BeritaModels.js";
import path from "path";

export const getBerita = async (req, res) => {
  try {
    const response = await Berita.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBeritaByid = async (req, res) => {
  try {
    const response = await Berita.findOne({
      attributes: [
        "uuid",
        "judul_berita",
        "isi_berita",
        "URL",
        "tanggal_berita",
      ],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createBerita = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const judul_berita = req.body.judul_berita;
  const isi_berita = req.body.isi_berita;
  const tanggal_berita = req.body.tanggal_berita;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const URL = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  console.log(ext);
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: " gambar harus kurang dari 5 MB" });

  file.mv(`./public/images/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };
  try {
    await Berita.create({
      judul_berita: judul_berita,
      isi_berita: isi_berita,
      tanggal_berita: tanggal_berita,
      gambar: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Berita berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateBerita = async (req, res) => {
  const { judul_berita, isi_berita, tanggal_berita, gambar } = req.body;
  const berita = await Berita.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!berita) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await Berita.update(
      {
        judul_berita: judul_berita,
        isi_berita: isi_berita,
        tanggal_berita: tanggal_berita,
        gambar: gambar,
      },
      {
        where: {
          id: berita.id,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil dipebarui" });
  } catch (error) {}
};

export const deleteBerita = async (req, res) => {
  const berita = await Berita.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!berita) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await Berita.destroy({
      where: {
        id: berita.id,
      },
    });
    res.status(201).json({ msg: " Berita berhasil dihapus" });
  } catch (error) {}
};
