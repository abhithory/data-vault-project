import { ethers } from 'ethers'
import DataVaultABI from '../consts/DataVaultABI.json'
import { dataVaultContractAddr } from '../consts/NetworkDetails';

export function getDataVaultContract(_provider) {
    const provider = new ethers.providers.Web3Provider(_provider);
    const contract = new ethers.Contract(dataVaultContractAddr, DataVaultABI, provider.getSigner());
    return contract;
}