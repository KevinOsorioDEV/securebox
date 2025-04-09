import prisma from "../db/prisma.js";

const profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.body.id },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });

    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

export default profile;
