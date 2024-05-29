const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const ethers = require("ethers");

module.exports = buildModule("SepoliaGenie", (m) => {
  const sepoliaGenie = m.contract("SepoliaGenie", [], {
    value: ethers.parseEther("3"),
  });

  return { sepoliaGenie };
});
