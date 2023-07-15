import React, { useState } from 'react';

import { useWallet } from './context/WalletProvider';
import { getDataVaultContract } from './helper/ContractConnections';


function App() {
  const { provider, isConnected, connectWallet, disconnectWallet, account } = useWallet();
  const [allCredentials, setAllCredentials] = useState([]);

  async function loadingCredentials() {
    const dataVault = getDataVaultContract(provider);

    const allCredentials = await dataVault.getAllCredentialsOfUser();
    console.log(allCredentials);
    setAllCredentials(allCredentials)

  }


  return (
    <div className='app-container'>
      <button onClick={isConnected ? disconnectWallet : connectWallet} id="wallet-connect">
        {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
      {isConnected &&
        <button onClick={loadingCredentials}>load credentials</button>
      }
      <p>{account}</p>

      {allCredentials.map((item, key) => {
        return (
          <p key={key}>{item.website}</p>
        )
      })
      }
    </div>
  )
}

export default App;
