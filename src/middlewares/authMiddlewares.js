import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(400).json({ message: "Token no proporcionado!" });

  const token = header.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalido o expirado!" });
  }
};

export default verifyToken;
