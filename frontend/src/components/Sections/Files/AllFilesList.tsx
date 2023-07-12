"use client"
import React, { useContext, useEffect, useState } from 'react'
import FileListItem from './FileListItem'
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import { FileStructInterface } from '@/interfaces/SmartContract';
import { FileExtendedDataInterface } from '@/interfaces/Files';
import { decryptMessage } from '@/utils/MessageEncryption';
import { decryptFile, downloadFile } from '@/utils/FileEncryption';
import SimpleLoader from '@/components/Loader/loader';


function AllFilesList() {
  const { address, getAllFilesOfUser,getFileUrlFromIpfsHash } = useContext(Web3ConnectionContext);

  const [allFiles, setAllFiles] = useState<FileExtendedDataInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState(false);

  async function loadAllFiles() {
    if (!address) return;
    setIsLoading(true)
    const _allCredentials: FileStructInterface[] | null = await getAllFilesOfUser();
    if (_allCredentials) {
      const extendedFiles: FileExtendedDataInterface[] = _allCredentials.map(((item: FileStructInterface) => {
        return { ...item, decryptedStatus: false }
      }))
      setAllFiles(extendedFiles)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadAllFiles()
  }, [address])

  async function DecryptFile(n: number) {
    if (!address) return
    try {
      const _decryptedMsg = await decryptMessage(allFiles[n].decryptKey, address);
      if (!_decryptedMsg) return
      setAllFiles((prev) => {
        prev[n] = { ...prev[n], decryptKey: _decryptedMsg, decryptedStatus: true }                
        return [...prev]
      })
    } catch (error) {

    }

  }

  async function downloadEncryptedFile(n: number) {
    setIsDownloading(true)
    try {
      const _fullLink: string | null = await getFileUrlFromIpfsHash(allFiles[n].fileHash);
      if (!_fullLink) return;
      console.log(_fullLink);
      
      const _res = await fetch(_fullLink);
      console.log("_res",_res);
      const encryptedFile = await _res.blob();
      // const decryptedFile = await decryptFile(encryptedFile, allFiles[n].decryptKey);
      downloadFile(encryptedFile, allFiles[n].fileName + ".zip")
    } catch (error) {

    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
    <div className="flex flex-wrap gap-4">
      {allFiles &&
      allFiles.map((file:FileExtendedDataInterface, key:number ) => {
        return (
          <FileListItem key={key} index={key} fileName={file.fileName} fileHash={file.fileHash} decryptedStatus={file.decryptedStatus} DecryptFile={DecryptFile} downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading}  />      
        )
      })}
    </div>
    {isLoading &&
        <div className="flex_center w-full">
          <SimpleLoader className='w-12' />
        </div>
      }
    </>
  )
}

export default AllFilesList