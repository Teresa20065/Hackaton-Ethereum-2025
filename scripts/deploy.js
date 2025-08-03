async function main() {
  const [deployer] = await ethers.getSigners();
  const CryptoLlama = await ethers.getContractFactory("CryptoLlama");
  const contract = await CryptoLlama.deploy();
  await contract.deployed();

  console.log("Contrato desplegado en:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
