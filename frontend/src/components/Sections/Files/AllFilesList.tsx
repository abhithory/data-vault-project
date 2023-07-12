"use client"
import React, { useContext, useEffect, useState } from 'react'
import FileListItem from './FileListItem'
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import { FileStructInterface } from '@/interfaces/SmartContract';
import { FileExtendedDataInterface } from '@/interfaces/Files';
import { decryptMessage } from '@/utils/MessageEncryption';

function AllFilesList() {
  const { address, getAllFilesOfUser } = useContext(Web3ConnectionContext);

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
        return prev
      })
    } catch (error) {

    }

  }

  async function downloadEncryptedFile(n: number) {
    setIsDownloading(true)
    try {
      // const _fullLink = allFiles[n].fileHash + "/" + allFiles[n].fileName;
      // const _res = await fetch(_fullLink);
      // const encryptedFile = await _res.blob();
      // const decryptedFile = await decryptFile(encryptedFile, allFiles[n].decryptKey);
      // saveAs(decryptedFile, allFiles[n].fileName + ".zip")

    } catch (error) {

    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      {/* <FileListItem key={key} index={key} fileName={file.fileName} fileHash={file.fileHash} decryptedStatus={file.decryptedStatus} DecryptFile={DecryptFile} advanceEncryptionStatus={file.advanceEncryptionStatus} downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading}  />       */}
      <FileListItem key={0} index={0} fileName={"fileName"} fileHash={"fileHash"} decryptedStatus={false} DecryptFile={DecryptFile} downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading} fileSize={55} />
      <FileListItem key={0} index={0} fileName={"fileName"} fileHash={"fileHash"} decryptedStatus={true} DecryptFile={DecryptFile} downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading} fileSize={55} />
    </div>
  )
}

export default AllFilesList