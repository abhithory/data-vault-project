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
      accounts: ["0xf5e2eea3a30aeab9b3aca79d76600830df2e21a073ac84b5e90adc2e46ee2845"]
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
