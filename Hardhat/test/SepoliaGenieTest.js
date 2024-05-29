const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("SepoliaGenie", async function () {
  let SepoliaGenie, sepoliaGenie, addr1, addr2;

  beforeEach(async function () {
    [addr1, addr2] = await ethers.getSigners();
    SepoliaGenie = await ethers.getContractFactory("SepoliaGenie");
    sepoliaGenie = await SepoliaGenie.deploy({ value: ethers.parseEther("3") });
  });

  it("It will check 0.05 ethers", async function () {
    expect(await sepoliaGenie.minvalue()).to.equal(ethers.parseEther("0.05"));
  });

  it("It should revert because there are no funds", async function () {
    expect(await sepoliaGenie.claim()).to.be.revertedWith(
      "Contract balance insufficient"
    );
  });

  it("It should let us donate to contract", async function () {
    expect(
      await sepoliaGenie.donation({ value: ethers.parseEther("1") })
    ).to.changeEtherBalance(addr1, ethers.parseEther("-1"));
  });

  it("it should let us claim 0.05 ethers", async function () {
    expect(await sepoliaGenie.donation({ value: ethers.parseEther("1") }));

    expect(await sepoliaGenie.claim(addr2.address)).to.changeEtherBalance(
      addr2,
      ethers.parseEther("0.05")
    );
  });

  it("it should check that Donaters Address in allDonors ", async function () {
    expect(
      await sepoliaGenie.donation({ value: ethers.parseEther("1") })
    ).to.changeEtherBalance(addr1, ethers.parseEther("-1"));

    expect(await sepoliaGenie.allDonors()).to.include(addr1.address);
  });
});
