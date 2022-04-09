import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  // declare a state with the variable greet
  // use state -> current value and the function
  const [greet, setGreet] = useState("");
  const [greetingValue, setGreetingValue] = useState("");
  const [depositValue, setDepositValue] = useState("");
  const [balance, setBalance] = useState();

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_greeting",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "greet",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_greeting",
          type: "string",
        },
      ],
      name: "setGreeting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // The Contract object
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  // get greeting
  const getGreeting = async () => {
    const greeting = await contract.greet();
    setGreet(greeting);
  };

  useEffect(() => {
    const connectWallet = async () => {
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
    };

    // get wallet balance
    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddress);
      const balanceFormatted = ethers.utils.formatEther(balance);
      setBalance(balanceFormatted);
    };

    connectWallet().catch(console.error);

    getBalance().catch(console.error);

    getGreeting().catch(console.error);
  });

  const handleDepositChange = (e) => {
    setDepositValue(e.target.value);
  };

  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value);
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    console.log(depositValue);
    const ethValue = ethers.utils.parseEther(depositValue);
    const depositEth = await contract.deposit({ value: ethValue });
    await depositEth.wait();
    const balance = await provider.getBalance(contractAddress);
    const balanceFormatted = ethers.utils.formatEther(balance);
    setBalance(balanceFormatted);
    setDepositValue(0);
  };

  const handleGreetingSubmit = async (e) => {
    e.preventDefault();
    const greetingUpdate = await contract.setGreeting(greetingValue);
    await greetingUpdate.wait();
    setGreet(greetingValue);
    setGreetingValue("");
  };

  return (
    <div className="w-full flex flex-col justify-center mt-4 p-4">
      <h1 className="text-3xl font-bold underline">{greet}</h1>
      <div className="flex flex-row justify-between w-3/4 space-x-2">
        <div>Contract Balance: {balance}</div>
        <div>
          <div>
            <form onSubmit={handleDepositSubmit}>
              <input
                type="number"
                className="py-2 px-2 border border-gray-500 rounded-md"
                onChange={handleDepositChange}
                value={depositValue}
              />

              <button
                className="bg-blue-600 mt-2 text-white rounded-md flex justify-center"
                type="submit"
              >
                <div className="py-2 px-2">Deposit</div>
              </button>
            </form>
          </div>

          <div className="my-8">
            <form onSubmit={handleGreetingSubmit}>
              <input
                type="text"
                className="py-2 px-2 border border-gray-500 rounded-md"
                onChange={handleGreetingChange}
                value={greetingValue}
              />

              <button
                className="bg-black mt-2 text-white rounded-md flex justify-center"
                type="submit"
              >
                <div className="py-2 px-2">Change</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
