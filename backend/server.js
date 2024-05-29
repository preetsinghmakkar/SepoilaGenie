import express from "express";
import dotenv from "dotenv";
import {
  Claim,
  ContractBalance,
  getAllDonors,
} from "./controllers/controllers.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/claim", Claim);
app.get("/ContractBalance", ContractBalance);
app.get("/allDonors", getAllDonors);

app.listen(PORT, () => {
  console.log("Listening On Port: ", PORT);
});
