import "dotenv/config";   // 👈 THIS is the key fix

import express from "express";
import cors from "cors";

import contactsRoutes from "./routes/contacts.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
