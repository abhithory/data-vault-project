import React, { useContext } from 'react';
import "./style/tailwind.css";
import { Web3ConnectionContext } from './Provider/Web3Provider';

function App() {

  const { address, connectMetamaskWallet } = useContext(Web3ConnectionContext);
  return (
    <div className='app_container'>
      <div className="flex justify-between items-center mx-4 py-2">
        <img src="assets/logo.png" alt="logo" className='w-16' />
        <button className={`${address ? "btn_primary_2" : "btn_primary_1" }`} onClick={connectMetamaskWallet} disabled={Boolean(address)}>
          {address ?
            address.substring(0,4)+"..."+address.substring(address.length - 4 , address.length)
            :
            "Connect Wallet"
          }
        </button>
      </div>

    </div>
  );
}

export default App;
