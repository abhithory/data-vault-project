import React, { useContext, useEffect } from 'react';
import "./style/tailwind.css";
import { Web3ConnectionContext } from './Provider/Web3Provider';
import AllUserData from './section/AllUserData';
import { DataTypeEnum } from './interfaces/DataInterface';

function App() {

  const { address, connectMetamaskWallet, isConnectedPreviously, getAllDataOfUser } = useContext(Web3ConnectionContext);


  useEffect(() => {
    async function checkPreviouslyConnected(){
      const isConnected = await isConnectedPreviously();      
      if (isConnected) {
        connectMetamaskWallet()
      }
    }

    checkPreviouslyConnected()
  },[]);

  useEffect(() => {
    async function loadData(){
      // await getAllDataOfUser();
    }
    if (address) {
      loadData()
    }
  },[address]);
  
  return (
    <div className='app_container overflow-auto'>
      <div className="flex justify-between items-center mx-4 py-2">
        <img src="assets/logo.png" alt="logo" className='w-16' />
        <button className={`${address ? "btn_primary_2" : "btn_primary_1"}`} onClick={connectMetamaskWallet} disabled={Boolean(address)}>
          {address ?
            address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length)
            :
            "Connect Wallet"
          }
        </button>
      </div>

        <div className="flex_center w-full flex-col mt-2 ">
      {address ?
          <>
          <h1 className="text_sub_heading_size text_primary_gradient mb-2">All Credentials</h1>
          <AllUserData type={DataTypeEnum.CREDENTIALS} />
          </>
          :
          <h1 className="text_sub_heading_size text_primary_gradient">Please connect your wallet</h1>
        }
        </div>
    </div>
  );
}

export default App;
