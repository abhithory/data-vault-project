import React, { useContext } from 'react';
import "./style/tailwind.css";
import { Web3ConnectionContext } from './Provider/Web3Provider';

function App() {

  const {address, connectMetamaskWallet} = useContext(Web3ConnectionContext);
  return (
    <div className='app_container'>
      <h1 className='text-xl text-white'>address: {address}</h1>

      <button className="btn_primary_1" onClick={connectMetamaskWallet}>
        Connect Wallet
      </button>
    </div>
  );
}

export default App;
