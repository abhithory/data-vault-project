import {encrypt} from '@metamask/eth-sig-util'


export async function getEncryptionPublicKey(publicWalletAdr:string): Promise<string> {
        const _key: string = await (window.ethereum as any).request({
            method: 'eth_getEncryptionPublicKey',
            params: [publicWalletAdr],
        });
        return _key
}

export function getEncryptedMessage(msg:string,key:string): string{
    const encryptedObj = encrypt({
        publicKey: key,
        data: msg,
        version: 'x25519-xsalsa20-poly1305'
    })
    console.log("original", encryptedObj)
    return JSON.stringify(encryptedObj)
}

export async function decryptMessage(encryptedMsg: string, publicWalletAdr:string): Promise<string> {
    const data = await (window.ethereum as any).request({
        method: 'eth_decrypt',
        params: [encryptedMsg, publicWalletAdr],
    });
    return data
}
