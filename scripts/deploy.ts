import { network } from "hardhat";

async function main() {
  console.log("Deploying ProMint contract...");

  const { ethers } = await network.connect();

  const ProMint = await ethers.getContractFactory("ProMint");
  const proMint = await ProMint.deploy();

  await proMint.waitForDeployment();

  const contractAddress = await proMint.getAddress();

  console.log("✅ ProMint deployed successfully!");
  console.log("Contract address:", contractAddress);

  const facultyWallet = await proMint.getFacultyWallet();
  console.log("Faculty wallet:", facultyWallet);
}

main().catch((error) => {
  console.error("❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});