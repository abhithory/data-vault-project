// import createMetaMaskProvider from 'metamask-extension-provider';

export async function decryptMessage(ethereumProvider:any,encryptedMsg: string, publicWalletAdr:string): Promise<string> {
    try {
        // const provider = createMetaMaskProvider();

        // console.log(encryptedMsg);
        // console.log(publicWalletAdr);
        
        const data = await (ethereumProvider as any).request({
            method: 'eth_decrypt',
            params: [encryptedMsg, publicWalletAdr],
        });
        return data
    } catch (error) {
     throw error
    }
}
