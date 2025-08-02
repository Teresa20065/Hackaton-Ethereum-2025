async function main() {
  const CryptoLlama = await ethers.getContractFactory("CryptoLlama");
  const llama = await CryptoLlama.deploy();

  await llama.deployed();
  console.log("✅ CryptoLlama deployed to:", llama.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
