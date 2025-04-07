import bcrypt from "bcrypt";
import prisma from "../db/prisma.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, password } = req.body;

  const userExist = await prisma.user.findUnique({ where: { username } });
  if (userExist) return res.status(400).json({ message: "Usuario ya existe" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  res.status(201).json({ message: "Usuario Registrado!" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user)
    return res.status(400).json({ message: "Credenciales invalidas!" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Credenciales invalidas!" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );

  res.json({ bearer: token });
};

export { register, login };
