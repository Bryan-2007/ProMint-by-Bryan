// ============================================================================
// HARDHAT CONFIGURATION FILE
// Purpose: Configure Hardhat development environment for smart contract
//          compilation, deployment, and network connectivity
// ============================================================================


// ==================== SECTION 1: ENVIRONMENT SETUP ====================
// Description: Load environment variables from .env.local file
//              Sensitive data like private keys and API keys are stored here
// ============================================================================

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


// ==================== SECTION 2: IMPORTS ====================
// Description: Import required Hardhat plugins and configurations
//              - defineConfig: Main Hardhat configuration function
//              - hardhatEthers: Ethers.js integration for Hardhat
//              - hardhatVerify: Contract verification on Etherscan
// ============================================================================

import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";


// ==================== SECTION 3: WALLET CONFIGURATION ====================
// Description: Extract and format the private key from environment variables
//              Ensures private key has "0x" prefix for blockchain compatibility
// ============================================================================

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const privateKeyWithPrefix = PRIVATE_KEY.startsWith("0x")
  ? PRIVATE_KEY
  : "0x" + PRIVATE_KEY;


// ==================== SECTION 4: HARDHAT CONFIGURATION ====================
// Description: Define Hardhat settings including plugins, Solidity version,
//              and blockchain network configurations
// ============================================================================

export default defineConfig({
  // Enable Hardhat plugins

  plugins: [hardhatEthers, hardhatVerify],

  // Solidity compiler configuration

  solidity: {
    version: "0.8.28", // Solidity version for compiling smart contracts
  },

  // Network configurations for deployment and testing

  networks: {
    sepolia: {

      // Sepolia testnet configuration (for testing before mainnet)

      type: "http",

      // RPC URL to connect to Sepolia network

      url:
        process.env.SEPOLIA_RPC_URL ||
        "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",

      // Wallet accounts to use for deployments and transactions

      accounts: PRIVATE_KEY ? [privateKeyWithPrefix] : [],

      // Sepolia chain ID (unique identifier for the network)

      chainId: 11155111,
    },
  },

  // Contract verification settings (for Etherscan)

  verify: {
    etherscan: {

      // API key for Etherscan contract verification
      
      apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
  },
});