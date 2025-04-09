import express from "express";
import profile from "../controllers/getProtectedController.js";
import verifyToken from "../middlewares/authMiddlewares.js";
import checkRole from "../middlewares/roleMiddlewares.js";

const router = express.Router();

router.get("/profile", verifyToken, profile);
router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: `Hola admin ${req.user.username}` });
});

export default router;
