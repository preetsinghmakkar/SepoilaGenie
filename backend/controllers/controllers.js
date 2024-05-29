import { ethers } from "ethers";
import { SepoliaGenieABI } from "./ContractDetails.js";
import dotenv from "dotenv";

dotenv.config();

const { CONTRACT_ADDRESS, ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;

const fetchContract = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
  console.log("Provider : ", provider);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Wallet : ", wallet);
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    SepoliaGenieABI,
    wallet
  );

  console.log("CONtract in fetchCOntract : ", contract);

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
    console.log("Fetching contract balance...");
    console.log("Contract Address: ", CONTRACT_ADDRESS);
    console.log("Alchemy API Key: ", ALCHEMY_API_KEY);
    console.log("Private Key: ", PRIVATE_KEY);

    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
    console.log("Provider : ", provider);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log("Wallet : ", wallet);
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      SepoliaGenieABI,
      wallet
    );

    // const contract = await fetchContract();

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
