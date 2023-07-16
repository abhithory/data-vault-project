
export async function decryptMessage(encryptedMsg: string, publicWalletAdr:string): Promise<string> {
    try {
        
        const data = await (window.ethereum as any).request({
            method: 'eth_decrypt',
            params: [encryptedMsg, publicWalletAdr],
        });
        return data
    } catch (error) {
     throw error
    }
}
