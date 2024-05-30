# SepoliaGenie https://sepoila-genie.vercel.app/

SepoliaGenie is a decentralized application (DApp) that allows users to claim 0.05 Sepolia ETH every 24 hours for free. Additionally, users can donate Sepolia ETH to help others receive the same benefit. This project is built with a backend for handling requests, a frontend for user interaction, and smart contracts deployed on the Sepolia testnet.

## Features

- **Claim Sepolia ETH:** Users can claim 0.05 Sepolia ETH every 24 hours.
- **Donate Sepolia ETH:** Users can donate Sepolia ETH to support the faucet.
- **Real-time Contract Balance:** Displays the current balance of the contract.
- **Cooldown Timer:** Enforces a 24-hour cooldown period between claims.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MetaMask extension installed in your browser
- An Infura project ID for connecting to the Sepolia testnet
- A Sepolia testnet wallet with some ETH for transactions

## Installation

Follow these steps to set up the project locally:

### Backend

1. Navigate to the `backend` folder:

   ```sh
   cd backend

   ```

2. Install the dependencies:

```sh

   npm install

```

3. Create a .env file and add the following environment variables:

   PORT=
   CONTRACT_ADDRESS=
   PRIVATE_KEY=
   ALCHEMY_API_KEY=

4. Start the backend server:

```sh
   npm run dev
```

### Frontend.

1. Navigate to the frontend folder:

```sh
   cd frontend
```

2. Install the dependencies:

```sh
   npm install
```

3.Create a .env file and add the following environment variables:

VITE_CONTRACT_ADDRESS=DEPLOYED_CONTRACT_ADDRESS

4. Start the frontend development server:

```sh
   npm start
```

### Hardhat

1.Navigate to the hardhat folder:

```sh
cd hardhat
```

2. Install the dependencies:

```sh
   npm install
```

3. Create a .env file and add the following environment variables:

   ALCHEMY_API_KEY=
   ACCOUNT_PRIVATE_KEY=
   ETHERSCAN_API_KEY=

4. Deploy the smart contract to the Sepolia testnet:

```sh
   npx hardhat run scripts/deploy.js --network sepolia
```
