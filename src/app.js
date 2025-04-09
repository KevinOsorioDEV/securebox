import Express from "express";
import authRouters from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import verifyToken from "./middlewares/authMiddlewares.js";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/auth", authRouters);

app.use("/data", protectedRoutes);

app.get("/secure", verifyToken, (req, res) => {
  res.json({
    message: `Hola ${req.user.username}, accediste a contenido protegido.`,
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenido a SecureBoxApi (ESmodules)");
});

export default app;
