import React, { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import axios from "axios";
import { SepoliaGenieABI } from "../SepoliaGenieABI/sepoliaGenieABI";
import "react-toastify/dist/ReactToastify.css";

const Donaters = ({ setEnableDonate }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [address, setAddress] = useState(null);
  const [allDonor, setAllDonor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const ContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const ContractAddress = "0xaefA776CeB100CbAB55d8BF5CFd99d957383E953";

  const getSigner = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  };

  const connectMetamask = async () => {
    try {
      const signer = await getSigner();
      const address = await signer.getAddress();
      setAddress(address);

      fetchAllDonors();

      toast.success("Metamask Connected!");
    } catch (error) {
      toast.error("Failed to Connect Metamask!");
    }
  };

  const donate = async () => {
    if (!window.ethereum) {
      toast.error("Metamask Not Installed!");
      return;
    }

    setIsLoading(true);
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        ContractAddress,
        SepoliaGenieABI,
        signer
      );
      await contract.donation({
        value: ethers.parseEther(donationAmount),
      });
      toast.success("Successfully Donated!");
    } catch (error) {
      toast.error("Donation Failed!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllDonors = async () => {
    if (!window.ethereum) {
      toast.error("Metamask Not Installed!");
      return;
    }

    try {
      const getAllDonors = await axios.get(
        "https://sepoilageniebackend.vercel.app/allDonors"
      );

      setAllDonor(getAllDonors.data);
    } catch (error) {
      toast.error("Failed to Fetch Donors!");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDonors = async () => {
      await fetchAllDonors();
    };
    fetchDonors();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-purple-100 p-6">
        <h2 className="text-5xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
          Donate to Support Developers!
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          {address ? (
            <div className="bg-purple-200 text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          ) : (
            <button
              className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
              onClick={connectMetamask}
            >
              <MdAccountBalanceWallet className="mr-2" size={24} />
              Connect Metamask
            </button>
          )}
        </div>

        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-3xl font-bold mb-3 text-gray-800 text-center">
            Donation Amount
          </h3>
          <input
            type="number"
            placeholder="Enter Amount (min 0.05 Sepolia ETH)"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            className="flex items-center justify-center w-full bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300 mb-3"
            onClick={donate}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <FaDonate className="mr-2" size={20} />
            )}
            {isLoading ? "Processing..." : "Donate"}
          </button>
        </div>

        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-3xl font-bold mb-3 text-gray-800 text-center">
            Donor Accounts
          </h3>

          {allDonor.length > 0 ? (
            <ul className="space-y-2">
              {allDonor.map((account, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-lg text-gray-700 text-center"
                >
                  {account}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-700">
              Connect to Metamask to see the donors
            </p>
          )}
        </div>

        <button
          className="mt-10 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
          onClick={() => setEnableDonate(false)}
        >
          Back to Landing Page
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Donaters;
