import Program from "../models/ProgramModels.js";
export const getProgram = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id_program"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProgramById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["id_program"],
      where: {
        id_program: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProgram = async (req, res) => {
  const { nama_program, gambar_program, URL } = req.body;
  try {
    await Berita.create({
      nama_program: nama_program,
      gambar_program: gambar_program,
      URL: URL,
    });

    res.status(201).json({ message: "Program berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateProgram = async (req, res) => {};
export const deleteProgram = async (req, res) => {};
