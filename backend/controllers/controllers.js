import { ethers } from "ethers";
import { SepoliaGenieABI } from "./ContractDetails.js";
import dotenv from "dotenv";

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const fetchContract = async () => {
  const provider = new ethers.JsonRpcProvider(ALCHEMY_API_KEY);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    SepoliaGenieABI,
    wallet
  );
  return contract;
};

export const Claim = async (req, res) => {
  try {
    const { account } = req.body;

    const contract = await fetchContract();

    const sendingEth = await contract.claim(account);
    await sendingEth.wait();

    res.status(200).json(`Successfully Transferred to:${account}`);
  } catch (error) {
    res.status(500).json({ error: "Error in Claim " });
  }
};

export const ContractBalance = async (req, res) => {
  try {
    const contract = await fetchContract();

    console.log("Contract : ", contract);

    const contractBalance = await contract.getBalance();

    console.log(contractBalance);

    const balance = ethers.formatEther(contractBalance);

    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ error: "Error in Fetching Contract Balance" });
  }
};

export const getAllDonors = async (req, res) => {
  try {
    const contract = await fetchContract();

    const allDonors = await contract.allDonors();

    res.status(200).json(allDonors);
  } catch (error) {
    res.status(500).json({ error: "Error in Getting All Donors" });
  }
};
