import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Main = ({ setEnableDonate, contractBalance }) => {
  const [account, setAccount] = useState("");
  const [cooldownExpired, setCooldownExpired] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setAccount(e.target.value);
  };

  useEffect(() => {
    const lastClaimTime = localStorage.getItem("lastClaimTime");
    if (lastClaimTime) {
      const cooldownEndTime = parseInt(lastClaimTime) + 24 * 60 * 60 * 1000;
      const currentTime = Date.now();
      if (currentTime < cooldownEndTime) {
        setCooldownExpired(false);
        const cooldownTimer = setTimeout(() => {
          setCooldownExpired(true);
          localStorage.removeItem("lastClaimTime");
        }, cooldownEndTime - currentTime);
        return () => clearTimeout(cooldownTimer);
      }
    }
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!cooldownExpired) {
      toast.error("Please wait for the cooldown period to expire.");
      return;
    }

    setIsLoading(true);
    try {
      const Claim = await axios.post(
        "https://sepoilageniebackend.vercel.app/claim",
        {
          account,
        }
      );
      toast.success(Claim.data);
      localStorage.setItem("lastClaimTime", Date.now());
      setCooldownExpired(false);
      const cooldownTimer = setTimeout(() => {
        setCooldownExpired(true);
        localStorage.removeItem("lastClaimTime");
      }, 24 * 60 * 60 * 1000);
      return () => clearTimeout(cooldownTimer);
    } catch (error) {
      toast.error("Claim failed!");
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-200">
      <header className="text-center mt-12">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Welcome to SepoliaGenie
        </h1>
        <p className="text-lg text-white mt-4">
          Want to Donate Sepolia For Others?
          <button
            className="ml-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
            onClick={() => setEnableDonate(true)}
          >
            Donate
          </button>
        </p>
        <p className="text-lg text-white mt-2">
          You can get 0.05 Sepolia Testnet every 24 hours!
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-8 w-full max-w-sm text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Contract Balance
        </h2>
        <p className="text-xl text-gray-700 mt-2">{contractBalance} ETH</p>
      </div>

      <div className="mt-8 w-full max-w-md">
        <form onSubmit={handleForm} className="flex flex-col items-center">
          <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-full">
            <img
              src="metamask-icon.png"
              width={40}
              height={40}
              alt="MetaMask Icon"
              className="ml-2"
            />
            <input
              required
              onChange={handleChange}
              name="account"
              type="text"
              value={account}
              placeholder="Enter your Wallet Address"
              className="px-4 py-2 outline-none flex-grow"
            />
          </div>
          <button
            type="submit"
            className={`mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
              !cooldownExpired || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!cooldownExpired || isLoading}
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
              "Claim"
            )}
          </button>
        </form>
      </div>

      <p className="text-md text-white mt-8 text-center">
        If you happily received your Sepolia Testnet, then you can give me a
        star on GitHub!
      </p>

      <div className="mt-12">
        <div className="flex justify-center items-center">
          <Link
            to="https://github.com/preetsinghmakkar/SepoilaGenie"
            target="_blank"
          >
            <div className="relative w-40 h-40">
              <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-md transform -translate-y-2 -translate-x-2"></div>
              <div className="relative w-full h-full bg-white rounded-md flex justify-center items-center">
                <FaGithub className="text-black text-6xl" />
              </div>
            </div>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Main;
