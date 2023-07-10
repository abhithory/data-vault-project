"use client"
import React, { useState } from 'react'
import FileListItem from './FileListItem'

function AllFilesList() {
  const [allFiles, setAllFiles] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState(false);

  async function loadAllFiles() {

  }

  async function DecryptFile(n: number) {

  }

  async function downloadEncryptedFile(n: number) {

  }

  return (
    <div className="flex flex-wrap gap-4">
      {/* <FileListItem key={key} index={key} fileName={file.fileName} fileHash={file.fileHash} decryptedStatus={file.decryptedStatus} DecryptFile={DecryptFile} advanceEncryptionStatus={file.advanceEncryptionStatus} downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading}  />       */}
      <FileListItem key={0} index={0} fileName={"fileName"} fileHash={"fileHash"} decryptedStatus={false} DecryptFile={DecryptFile}  downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading} fileSize={55} />
      <FileListItem key={0} index={0} fileName={"fileName"} fileHash={"fileHash"} decryptedStatus={true} DecryptFile={DecryptFile}  downloadEncryptedFile={downloadEncryptedFile} isDownloading={isDownloading} fileSize={55}  />
    </div>
  )
}

export default AllFilesList