import express from "express";
import shortenRoutes from "./routes/shortenRoutes.js";

const app = express();

app.use(express.json());

app.use(shortenRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});