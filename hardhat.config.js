
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrumSepolia: {
      url: process.env.ALCHEMY_URL || "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  sourcify: {
    enabled: true
  }
};
