import { DataExtendedInterface, DataStructInterface, DataTypeEnum } from '../interfaces/DataInterface'
import DataItem from './DataItem'

interface UploadDataInterface {
  type: DataTypeEnum
}

function AllUserData(props:UploadDataInterface) {
  async function showDecryptedData(n: number) {
    // try {
    //   const _fullURL: string = await getFileUrlFromIpfsHash(dataArray[n].dataHash);
    //   const _res = await fetch(_fullURL);
    //   const encryptedFile = await _res.blob();
    //   const decryptedFile: Blob = await decryptFile(encryptedFile, dataArray[n].decryptKey);
    //   if (props.type === DataTypeEnum.CREDENTIALS) {
    //     const formData: CredentialsFormData = JSON.parse(await unZipAndGetData(decryptedFile as File));
    //     setCredentialsData(formData)
    //     setShowDataModel(true)
    //   } else if (props.type === DataTypeEnum.FILE) {
    //     downloadFile(decryptedFile, dataArray[n].dataName + ".zip")
    //   }
    // } catch (error) {
    //   console.log("showDecryptedData", error);

    // }
  }

  async function handleDecryptData(n: number) {
    // if (!address) return
    // const _decryptedKey = await decryptMessage(dataArray[n].decryptKey, address);
    // if (_decryptedKey) {
    //   setDecryptKey(dataArray[n].id, _decryptedKey)
    // }
  }

  const fileData:DataExtendedInterface = {
    dataName: "google.com",
    dataType: DataTypeEnum.CREDENTIALS,
    dataHash: "string",
    decryptKey: "string",
    uploadTime: (new Date()).getTime() / 1000,
    id: "string",
    decryptedStatus: false,
  }
  return (
    <div className='flex flex-wrap flex-col h-full w-full px-2'>
       <DataItem
                key={0}
                index={0}
                type={props.type}
                file={fileData}
                showDecryptedData={showDecryptedData}
                handleDecryptData={handleDecryptData}
              />
                     <DataItem
                key={0}
                index={0}
                type={props.type}
                file={fileData}
                showDecryptedData={showDecryptedData}
                handleDecryptData={handleDecryptData}
              />
                     <DataItem
                key={0}
                index={0}
                type={props.type}
                file={fileData}
                showDecryptedData={showDecryptedData}
                handleDecryptData={handleDecryptData}
              />
    </div>
  )
}

export default AllUserData