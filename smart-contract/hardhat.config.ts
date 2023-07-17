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
      accounts: ["0xad3127ae52e32027ee1d05f5aafd367588529e7fde4b41c83f586250065d69d4"]
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
