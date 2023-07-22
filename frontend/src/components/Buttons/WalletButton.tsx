"use client";
import {
  ConnectWallet,
    ThirdwebProvider,
    useAddress,
    useNetworkMismatch,
    useSwitchChain
} from "@thirdweb-dev/react";
import {  Mumbai, Polygon } from "@thirdweb-dev/chains";

import NormalButton from "./NormalButton";


export default function WalletButton() {
    const isMismatched = useNetworkMismatch();
    const switchChain = useSwitchChain();

    const address = useAddress();

  return address && isMismatched ? 
  <NormalButton onClick={()=> {
    switchChain(Mumbai.chainId)
  }} text="!Wrong Network" className="btn_primary_1 text-sm px-5 py-2" />
  :
    <ConnectWallet className='text-sm' />
}
