import { ethers } from "ethers";
import { SepoliaGenieABI } from "./ContractDetails.js";
import dotenv from "dotenv";

dotenv.config();

const CONTRACT_ADDRESS = "0xaefA776CeB100CbAB55d8BF5CFd99d957383E953";
const PRIVATE_KEY =
  "6789d0a31997141b52b9a17b8abdc9e64c5d920491af616a27d884d3f89a49f4";
const ALCHEMY_API_KEY =
  "https://eth-sepolia.g.alchemy.com/v2/ttrfiYa7JJgxBPZ_e3XroIoDwyRuEJhd";

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
