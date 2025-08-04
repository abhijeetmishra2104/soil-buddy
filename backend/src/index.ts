import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome!",
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
