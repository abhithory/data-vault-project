import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


require('dotenv').config({ path: __dirname + '/.env' })



const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
    local:{
      url: "HTTP://127.0.0.1:8545",
      "chainId":1337,
      accounts: ["0x9a2698927295e87505cb94dc31fac99f3d5b3a9599a8d2ba3eaf94190efcff8d"]
  },
  mumbai: {
    url: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
    accounts: [process.env.POLYGON_MUMBAI_WALLET_KEY || ""]
  },
  // matic: {
  //   url: "https://rpc-mainnet.maticvigil.com",
  //   // accounts: [process.env.privateKey]
  //   accounts: [""]
  // }
  },
  etherscan:{
    apiKey: {
      polygon: process.env.POLYGONSCAN_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_KEY || ""
    }
  }
};

export default config;
