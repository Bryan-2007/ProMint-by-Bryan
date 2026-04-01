# ProMint Blockchain Deployment Guide

## Overview
This guide explains how to deploy the ProMint smart contract to Sepolia testnet and integrate it with the frontend application.

---

### Deploy the contract using Hardhat to Sepolia

```bash
# 1. Downloads and installs hardhat (--save-dev adds hardhat to project dependencies)
npm install --save-dev hardhat

# It created a new directory 'node_modules' within the project directory containing all packages of hardhat. The OUTPUT:

added 60 packages in 2m
16 packages are looking for funding
  run `npm fund` for details

# 2. Initialize hardhat project (only include '--init' for first time project hardhat integration)
npx hardhat --init

# The OUTPUT

👷 Welcome to Hardhat v3.2.0 👷
√ Which version of Hardhat would you like to use? · hardhat-3
√ Where would you like to initialize the project?
Please provide either a relative or an absolute path: · .
√ What type of project would you like to initialize? · minimal
√ Hardhat only supports ESM projects. Would you like to change ".\package.json" to turn your project into ESM? (Y/n) · true
✨ Template files copied ✨
√ You need to install the necessary dependencies using the following command:
npm install --save-dev "@types/node@^22.8.5" "typescript@~5.8.0"
Do you want to run it now? (Y/n) · true
npm install --save-dev "@types/node@^22.8.5" "typescript@~5.8.0"
added 3 packages, and audited 64 packages in 5s
16 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
✨ Dependencies installed ✨

# 3. Create directories 'contracts' (for .sol files) and 'scripts' (for .s.sol files)

# 4. Create the solidity smart contract (.sol file) in scripts and compile
npx hardhat compile

# The OUTPUT

Compiled 1 Solidity file with solc 0.8.28 (evm target: cancun)
No Solidity tests to compile

# 5. Install toolbox for ethers.js (lets the .ts or .js file interact with blockchain)

npm install --save-dev @nomicfoundation/hardhat-toolbox

# the OUTPUT

added 1 package, and audited 65 packages in 3s
16 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities

# 6. Create deployment script for the created contract file in scripts/deploy.js

# 7. Create a '.env.local' file
# And include your obtained 'RPC url api key', 'private key' to deploy from, obtained 'etherscan api key'
# rpc url from 'alchemy' (bbr2007ptl@gmail.com), private key from main account (ethereum network - metamask), etherscan api from etherscan (bbr2007ptl@gmail.com - mranonymous7)

SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
PRIVATE_KEY=your_private_key_to_deploy_from
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# 8. Check the hardhat config file
# It should contain private key variable, solidity version, network info, etherscan variable
# ERROR ZONE - check for dependencies compatibility

# 9. Deploy to Sepolia

npx hardhat run scripts/deploy.js --network sepolia

# The OUTPUT

[dotenv@17.3.1] injecting env (3) from .env.local -- tip: ⚙️  enable debug logging with { debug: true }
Deploying ProMint contract...
✅ ProMint deployed successfully!
Contract address: 0x01D4E40EC4385BB2F835920bF907E199688b71df
Faculty wallet: 0x26839094202c7582DE5279eB61239B55C481Fe2d

# The contract is deployed permanently on sepolia testnet
# Closing the laptop and local server doesn't erase this. Anyone can verify the contract hereafter on Etherscan
```
