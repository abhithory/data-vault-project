import React, { useState } from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';

export const WalletContext = React.createContext();
export const useWallet = () => React.useContext(WalletContext);

export function withWallet(Component) {
    const WalletComponent = props => (
        <WalletContext.Consumer>
            {contexts => <Component {...props} {...contexts} />}
        </WalletContext.Consumer>
    );
    return WalletComponent;
}

const WalletProvider = React.memo(({ children }) => {
    const [chainId, setChainId] = useState(null);
    const [account, setAccount] = useState(null);
    const [ethereumProvider, setEthereumProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectingWallet, setConnectingWallet] = useState(false)

    const getProvider = () => {
        if (window.ethereum) {
            console.log('found window.ethereum>>');
            return window.ethereum;
        } else {
            const provider = createMetaMaskProvider();
            return provider;
        }
    }

    const getAccounts = async (provider) => {
        if (provider) {
            const [accounts, chainId] = await Promise.all([
                provider.request({
                    method: 'eth_requestAccounts',
                }),
                provider.request({ method: 'eth_chainId' }),
            ]);
            return [accounts, chainId, provider];
        }
        return false;
    }

    const connectWallet = async () => {
        try {
            const _provider = getProvider();
            const [accounts, chainId, provider] = await getAccounts(_provider);
            if (accounts && chainId) {
                setConnectingWallet(true);
                const account = accounts[0];
                setEthereumProvider(provider)
                setAccount(account);
                setChainId(chainId);
                setIsConnected(true);
            }
        } catch (e) {
            console.log("error while connect", e);
        } finally {
            setConnectingWallet(false);
        }
    }

    const disconnectWallet = () => {
        try {
            setAccount(null);
            setChainId(null);
            setIsConnected(false);
            setEthereumProvider(null);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <WalletContext.Provider
            value={{
                disconnectWallet,
                connectWallet,
                isConnected,
                connectingWallet,
                provider: ethereumProvider,
                chainId,
                account
            }}
        >
            {children}
        </WalletContext.Provider>
    )
});

export default WalletProvider
