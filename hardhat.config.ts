import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const privateKeyWithPrefix = PRIVATE_KEY.startsWith("0x")
  ? PRIVATE_KEY
  : "0x" + PRIVATE_KEY;

export default defineConfig({
  plugins: [hardhatEthers, hardhatVerify],

  solidity: {
    version: "0.8.28",
  },

  networks: {
    sepolia: {
      type: "http",
      url:
        process.env.SEPOLIA_RPC_URL ||
        "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: PRIVATE_KEY ? [privateKeyWithPrefix] : [],
      chainId: 11155111,
    },
  },

  verify: {
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
},
});