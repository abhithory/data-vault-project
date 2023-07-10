import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {

  async function deployDataVaultFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DataVault = await ethers.getContractFactory("DataVault");
    const dataVault = await DataVault.deploy();
    return { dataVault, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should be deployed correctly", async function () {
      const { dataVault } = await loadFixture(deployDataVaultFixture);

      // expect(await lock.owner()).to.equal(owner.address);
    });


  });

  describe("Adding Files", function () {
    describe("Validations", function () {
      it("Should add file in array", async function () {
        const { dataVault, owner } = await loadFixture(deployDataVaultFixture);
        const _addFile = await dataVault.addFileOfUser({ advanceEncryptionStatus:true,fileName: "_name1", fileHash: "_hash1",decryptKey:"_key1" });
        const addedfile = await _addFile.wait();

        const _addFile2 = await dataVault.addFileOfUser({advanceEncryptionStatus:false,fileName: "_name2", fileHash: "_hash2",decryptKey:"" });
        const addedfile2 = await _addFile2.wait();

        const _allFiles = await dataVault.getAllFilesOfUser();
        console.log(_allFiles);
        
        expect(_allFiles.length).to.equal(2);
      });

    });

    describe("Adding Credentials", function () {
      it("Should add credential in array", async function () {
        const { dataVault, owner } = await loadFixture(deployDataVaultFixture);
        const _addCredentials = await dataVault.addCredentialOfUser({ website: "websiteeee", usernameOrEmailOrPhone: "emaillll", password: "passss" });
        const addedCredentials = await _addCredentials.wait();

        const _addCredentials2 = await dataVault.addCredentialOfUser({ website: "websiteeee2", usernameOrEmailOrPhone: "emaillll2", password: "passss2" });
        const addedCredentials2 = await _addCredentials2.wait();
        const _allCreds = await dataVault.getAllCredentialsOfUser();
        expect(_allCreds.length).to.equal(2);

      });
    });

  });
});
