"use client";

import React, { createContext, useMemo, useState } from 'react';
import {
    useAddress, useSDK, useStorage
} from '@thirdweb-dev/react';
// import { ChessChainGameplayContract, MatchResultEnum } from '@/smartContract/networkDetails';
// import ChessChainGameplay from '@/smartContract/ChessChainGameplay.json';
import { ethers } from 'ethers';

interface ContextProps {
    address: string | undefined,
    sdk: any,
    storage: any,
    // createMatch: (matchId: string, stakeAmount: number) => Promise<boolean>,
    // joinMatch: (matchId: string, stakeAmount: number) => Promise<boolean>,
    // endMatch: (matchId: string, matchDataURI: string, matchNftURI: string, gameResult: MatchResultEnum) => Promise<boolean>,
    // getMatchDetailOf: (matchId: string) => any,
    // getUserNftBalance: () => any
}

export const Web3ConnectionContext = createContext<ContextProps>({
    address: '',
    sdk: '',
    storage: '',
    // createMatch: async (matchId: string, stakeAmount: number) => false,
    // joinMatch: async (matchId: string, stakeAmount: number) => false,
    // endMatch: async (matchId: string, matchDataURI: string, matchNftURI: string, gameResult: MatchResultEnum) => false,
    // getMatchDetailOf: (matchId: string) => { },
    // getUserNftBalance: () => { },
});

const Web3ConnectionWrapper = ({ children }: any) => {
    const address = useAddress();
    const storage = useStorage();
    const sdk = useSDK();

    // async function getContract() {
    //     const OrchidzBuildCreatorContract = await sdk?.getContract(
    //         ChessChainGameplayContract,
    //         ChessChainGameplay.abi
    //     );
    //     return OrchidzBuildCreatorContract;
    // }

    // async function createMatch(matchId: string, stakeAmount: number): Promise<boolean> {
    //     try {
    //         const _contract = await getContract();
    //         const tx = await _contract?.call(
    //             'createMatch', // Name of your function as it is on the smart contract
    //             [
    //                 matchId,
    //                 address,
    //                 ethers.utils.parseUnits(String(stakeAmount), "ether")
    //             ],
    //             {
    //                 value: ethers.utils.parseUnits(String(stakeAmount), "ether")
    //             }
    //         );
    //         return true;
    //     } catch (error) {
    //         console.log("createMatch error", error);
    //         return false
    //     }
    // }

    return (
        <Web3ConnectionContext.Provider value={{
            address, sdk, storage
        }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;
