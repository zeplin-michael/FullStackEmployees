import express from "express";
import router from "#api/employees";
const app = express();
app.use(express.json());
app.use("/", router);

// TODO: this file!
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
