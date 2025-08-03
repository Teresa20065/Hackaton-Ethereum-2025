const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy CryptoLlama contract
  console.log("\n🚀 Deploying CryptoLlama contract...");
  const CryptoLlama = await ethers.getContractFactory("CryptoLlama");
  const cryptoLlamaContract = await CryptoLlama.deploy();
  await cryptoLlamaContract.waitForDeployment();
  const cryptoLlamaAddress = await cryptoLlamaContract.getAddress();
  console.log("✅ CryptoLlama deployed to:", cryptoLlamaAddress);

  // Deploy LlamaPouDepositETH contract
  console.log("\n🚀 Deploying LlamaPouDepositETH contract...");
  const LlamaPouDepositETH = await ethers.getContractFactory("LlamaPouDepositETH");
  const depositContract = await LlamaPouDepositETH.deploy();
  await depositContract.waitForDeployment();
  const depositAddress = await depositContract.getAddress();
  console.log("✅ LlamaPouDepositETH deployed to:", depositAddress);

  // Deploy TransactionHistory contract
  console.log("\n🚀 Deploying TransactionHistory contract...");
  const TransactionHistory = await ethers.getContractFactory("TransactionHistory");
  const transactionHistoryContract = await TransactionHistory.deploy();
  await transactionHistoryContract.waitForDeployment();
  const transactionHistoryAddress = await transactionHistoryContract.getAddress();
  console.log("✅ TransactionHistory deployed to:", transactionHistoryAddress);

  console.log("\n📋 Summary of deployed contracts:");
  console.log("CryptoLlama:", cryptoLlamaAddress);
  console.log("LlamaPouDepositETH:", depositAddress);
  console.log("TransactionHistory:", transactionHistoryAddress);
  
  console.log("\n🔍 To verify contracts on Arbiscan, run:");
  console.log(`npx hardhat verify --network arbitrumSepolia ${cryptoLlamaAddress}`);
  console.log(`npx hardhat verify --network arbitrumSepolia ${depositAddress}`);
  console.log(`npx hardhat verify --network arbitrumSepolia ${transactionHistoryAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
