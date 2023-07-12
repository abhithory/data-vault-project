import CryptoJS from "crypto-js"
import JSZip from "jszip"

import saveAs from "file-saver"


function generateRandomKey(): string {
    return CryptoJS.lib.WordArray.random(24).toString(CryptoJS.enc.Base64)
}


// For Encrypting & Decrypting file 
export async function advanceEncryptFile(file: Blob):Promise<{key:string,encryptedFile:Blob}> {
    const zipedFile = await zipFile([file as File], (file as File).name) as Blob

    return new Promise((resolve, error) => {
        const reader = new FileReader()
        reader.onload = () => {
            const key = generateRandomKey();
            const _wArray = CryptoJS.lib.WordArray.create(reader.result as any);
            const encryptedFile = CryptoJS.AES.encrypt(_wArray, key).toString();
            resolve({
                key:key,
                encryptedFile: new Blob([encryptedFile])
            })
        }
        reader.readAsArrayBuffer(zipedFile);
    })
}

function convertWordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray) {
    let arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : []
    let length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4
    let uInt8Array = new Uint8Array(length), index = 0, word, i
    for (i = 0; i < length; i++) {
        word = arrayOfWords[i]
        uInt8Array[index++] = word >> 24
        uInt8Array[index++] = (word >> 16) & 0xff
        uInt8Array[index++] = (word >> 8) & 0xff
        uInt8Array[index++] = word & 0xff
    }
    return uInt8Array
}


export function decryptFile(data: Blob, key: string): Promise<Blob> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
            const decrypted = CryptoJS.AES.decrypt(reader.result as any, key)
            const typedArray = convertWordArrayToUint8Array(decrypted)
            resolve(new Blob([typedArray]))
        }
        reader.readAsText(data)
    })
}

  
export function zipFile(files: File[],folderName: string) {
    if (files.length === 0 || folderName === "") return false
    const zip = new JSZip()
    const folder = zip.folder(folderName)!
    files.forEach(file => {
      folder.file(folderName, file as any)
    })
    return zip.generateAsync({ type: "blob" })
}

export function downloadFile(file: File | Blob, fileName: string): boolean {
    
    try {
        saveAs(file, fileName);
        return true
    } catch (error) {
        return false
    }

}

