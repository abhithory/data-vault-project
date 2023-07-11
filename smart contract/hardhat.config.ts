import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


require('dotenv').config({ path: __dirname + '/.env' })

const ftmscanKey = process.env.FTMSCAN_API_KEY || "";
const testnetkey = process.env.FTM_TESTNET_WALLET_KEY || "";

const mainnetkey = process.env.FTM_MAINNET_WALLET_KEY || "";


const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
    local:{
      url: "HTTP://127.0.0.1:8545",
      "chainId":1337,
      accounts: ["0x9d5a4603c143c219b40c3a58b3eb170d5384d39f0d570967570e7110cc5f4956"]
  }
  },
  etherscan:{
    apiKey: {
      ftmTestnet:ftmscanKey,      
      opera:ftmscanKey      
    }
  }
};

export default config;
