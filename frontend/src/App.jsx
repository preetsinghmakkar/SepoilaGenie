import React, { useState, useEffect } from "react";
import Donaters from "./component/Donaters";
import Main from "./component/Main";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [enableDonate, setEnableDonate] = useState(false);
  const [contractBalance, setContractBalance] = useState("");

  useEffect(() => {
    const ContractBalance = async (event) => {
      try {
        const contractBalance = await axios.get(
          "http://localhost:3000/ContractBalance"
        );
        setContractBalance(contractBalance.data);
      } catch (error) {
        console.log("Error :", error);
      }
    };

    ContractBalance();
  }, []);

  return (
    <>
      <Router>
        {enableDonate ? (
          <Donaters setEnableDonate={setEnableDonate} />
        ) : (
          <Main
            setEnableDonate={setEnableDonate}
            contractBalance={contractBalance}
          />
        )}
      </Router>
    </>
  );
};

export default App;
