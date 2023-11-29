import Program from "../models/ProgramModels.js";
import router from "../routes/UserRoute.js";
import path from "path";

export const getProgram = async (req, res) => {
  try {
    const response = await Program.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProgramById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProgram = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const nama_program = req.body.nama_program;
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
    return res.status(422).json({ msg: " images must be less 5 MB" });

  file.mv(`./public/images/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };
  try {
    await Program.create({
      nama_program: nama_program,
      gambar_program: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Program berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateProgram = async (req, res) => {
  const { nama_program, gambar_program, URL } = req.body;
  const program = await Program.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!program) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await Program.update(
      {
        nama_program: nama_program,
        gambar_program: gambar_program,
        URL: URL,
      },
      {
        where: {
          id: program.id,
        },
      }
    );
    res.status(200).json({ msg: "Program Berhasil dipebarui" });
  } catch (error) {}
};

export const deleteProgram = async (req, res) => {
  const program = await Program.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!program) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await Program.destroy({
      where: {
        id: program.id,
      },
    });
    res.status(201).json({ msg: "Program berhasil dihapus" });
  } catch (error) {}
};
