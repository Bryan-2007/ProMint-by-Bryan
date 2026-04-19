// ============================================================================
// SMART CONTRACT DEPLOYMENT SCRIPT
// Purpose: Deploy ProMint smart contract to the Sepolia testnet
//          Handles contract initialization and logs deployment details
// ============================================================================


// ==================== SECTION 1: IMPORTS ====================
// Description: Import Hardhat network utilities for contract deployment
// ============================================================================

import { network } from "hardhat";


// ==================== SECTION 2: MAIN DEPLOYMENT FUNCTION ====================
// Description: Main async function that orchestrates the contract deployment
//              1. Gets ethers provider for network interaction
//              2. Retrieves ProMint contract factory
//              3. Deploys the contract to the network
//              4. Waits for deployment to complete
//              5. Logs contract address and faculty wallet
// ============================================================================

async function main() {
  // Display deployment start message
  console.log("Deploying ProMint contract...");

  // Connect to Hardhat network and get ethers instance
  const { ethers } = await network.connect();

  // Get the contract factory (contains compiled contract code)
  const ProMint = await ethers.getContractFactory("ProMint");

  // Deploy the contract to the blockchain
  const proMint = await ProMint.deploy();

  // Wait for the deployment transaction to be confirmed
  await proMint.waitForDeployment();

  // Get the deployed contract address
  const contractAddress = await proMint.getAddress();

  // Log successful deployment with contract address
  console.log("✅ ProMint deployed successfully!");
  console.log("Contract address:", contractAddress);

  // Retrieve and log the faculty wallet address from the contract
  const facultyWallet = await proMint.getFacultyWallet();
  console.log("Faculty wallet:", facultyWallet);
}


// ==================== SECTION 3: ERROR HANDLING ====================
// Description: Execute main function and handle any deployment errors
//              If deployment fails, logs error details and exits with code 1
// ============================================================================

main().catch((error) => {
  console.error("❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});