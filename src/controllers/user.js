import { UserService } from "../services/user.js";

async function createUser(req, res) {
  try {
    const user = await UserService.createUser(req.body);

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
}

async function getUsers(req, res) {
  try {
    const users = await UserService.getUsers();
    return res
      .status(200)
      .json({ message: "Success Retrieving Data", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
async function getUser(req, res) {
  try {
    const user = await UserService.getUser(Number(req.params.id));
    return res
      .status(200)
      .json({ message: "Success Retrieveng Data", data: user });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

async function updateUser(req, res) {
  try {
    const user = await UserService.updateUser(req.body, Number(req.params.id));
    return res.status(200).json({ message: "Success Update Data", data: user });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
async function deleteUser(req, res) {
  try {
    await UserService.deleteUser(Number(req.params.id));
    return res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });

    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
}

export const UserController = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
