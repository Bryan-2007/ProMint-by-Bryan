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

---

## Step 2: Update Frontend Configuration

### Update the app.js file with deployed contract

1. **Open** `docs/app.js`

2. **Find the CONTRACT_ADDRESS constant** (around line 3)
   - Replace `0x0000000000000000000000000000000000000000` with your deployed address

3. **Example:**
   ```javascript
   const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
   ```

---

## Step 3: Ensure MetaMask is on Sepolia Testnet

1. **Open MetaMask extension**
2. **Click on network dropdown** (top of MetaMask)
3. **Select "Sepolia"** testnet
4. **Get test ETH:**
   - Visit: https://sepoliafaucet.com
   - Enter your wallet address
   - Request test ETH (need small amount for gas)

---

## Step 4: Test the Application

### Test Student Workflow
1. **Login with non-faculty wallet**
   - Click "MetaMask Login"
   - Use a wallet that is NOT `0x26839094202c7582DE5279eB61239B55C481Fe2d`
   - Should be redirected to Student Dashboard

2. **Create a Project**
   - Click "New Project +"
   - Fill in project details:
     - Project Name: "AI Image Classifier"
     - Domains: "Web3, AI"
     - Date Completed: "15th March 2026"
   - Click Submit
   - Approve the MetaMask transaction
   - Wait for confirmation (1-2 minutes)
   - Project should appear in "YOUR PROJECTS"

3. **Search Projects**
   - Type in the search box
   - Projects should filter in real-time

### Test Faculty Workflow
1. **Logout from student account**
   - Click "Logout" button

2. **Login with faculty wallet**
   - Use wallet: `0x26839094202c7582DE5279eB61239B55C481Fe2d`
   - Should be redirected to Faculty Dashboard

3. **View All Projects**
   - Should see all student projects
   - Each pending project has a "Mint Project" button

4. **Mint a Project**
   - Click "Mint Project" on any project with "Pending Mint" status
   - Approve the MetaMask transaction
   - Wait for confirmation
   - Status should change to "NFT Minted (Non-transferrable)"

---

## Step 5: Verify on Blockchain Explorer

1. **Visit Sepolia Etherscan**
   - Go to: https://sepolia.etherscan.io

2. **Search for your contract address**
   - Paste your deployed contract address
   - Can view all transactions and contract details

3. **Check transaction hashes**
   - After each project creation or mint, MetaMask shows transaction hash
   - Paste into Sepolia Etherscan to verify

---

## Troubleshooting

### Error: "User rejected request"
- Make sure you approve the transaction in MetaMask

### Error: "Contract does not exist" or "Unable to connect"
- Verify CONTRACT_ADDRESS is correct in app.js
- Ensure you're on Sepolia testnet in MetaMask

### Error: "Insufficient funds"
- Get test ETH from faucet: https://sepoliafaucet.com

### Transactions taking too long
- Sepolia testnet can take 1-2 minutes per block
- Check Etherscan for transaction status
- Don't refresh or navigate away during transaction

### Projects not showing up
- Wait for transaction to be mined (~1-2 minutes)
- Refresh the page after confirmation
- Check browser console for errors (F12)

---

## Contract Functions Reference

### For Students
- **createProject(name, domains, date)** - Create a new project
  - Stores project on blockchain
  - Associated with caller's wallet address

### For Faculty
- **mintProject(projectId)** - Mint a project as NFT
  - Only faculty wallet can call this
  - Marks project as minted on blockchain

### Read-Only Functions (Anyone)
- **getAllProjects()** - Get all projects
- **getStudentProjects(wallet)** - Get projects for specific student
- **getProject(projectId)** - Get single project details
- **getTotalProjects()** - Get total project count
- **getFacultyWallet()** - Get current faculty address

---

## Gas Cost Estimates (Sepolia Testnet)

- **Create Project**: ~80,000 - 150,000 gas
- **Mint Project**: ~50,000 - 100,000 gas
- **Gas Price**: Usually 1-2 gwei on Sepolia (very cheap)
- **Total Cost**: Usually less than $0.01 USD in test ETH

---

## Important Notes

✅ **Do Not Share**
- Your private key
- MetaMask seed phrase
- Your wallet's recovery words

✅ **Safety Tips**
- Always verify contract address before deploying
- Test thoroughly on Sepolia before mainnet
- Keep backup of contract ABI and address

✅ **Production Deployment**
- For mainnet, use same process but connect to Mainnet
- Ensure significant testing before mainnet
- Consider security audit for production contracts

---

## Support & Resources

- **Sepolia Faucet**: https://sepoliafaucet.com
- **Etherscan Sepolia**: https://sepolia.etherscan.io
- **Remix IDE**: https://remix.ethereum.org
- **MetaMask Docs**: https://docs.metamask.io
- **Solidity Docs**: https://docs.soliditylang.org

---

## Next Steps

1. Deploy the contract following Step 1
2. Update CONTRACT_ADDRESS in app.js with deployed address
3. Test the workflows in Step 4
4. Verify on Etherscan (Step 5)
5. Everything should work! 🚀
