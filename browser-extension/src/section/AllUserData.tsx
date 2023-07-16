import { useContext, useState } from 'react';
import { DataExtendedInterface, DataStructInterface, DataTypeEnum } from '../interfaces/DataInterface'
import { decryptFile, unZipAndGetData } from '../utils/FileEncryption';
import { ipfsHashToUrl } from '../utils/Helper';
import DataItem from './DataItem'
import { CredentialsFormData } from '../interfaces/Credentials';
import { decryptMessage } from '../utils/MessageEncryption';
import { Web3ConnectionContext } from '../Provider/Web3Provider';

interface UploadDataInterface {
  type: DataTypeEnum
}

function AllUserData(props: UploadDataInterface) {

  const { address, connectMetamaskWallet, isConnectedPreviously, getAllDataOfUser } = useContext(Web3ConnectionContext);


  // const [allData, setDecryptKey, loadingStatus] = useDataStore((store) => [store.allData, store.setDecryptKey, store.loadingStatus]);

  const [dataArray, setDataArray] = useState<DataExtendedInterface[]>([]);
  const [showDataModel, setShowDataModel] = useState<boolean>(false);


  const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
    credentialName: "",
    websiteurl: "",
    userid: "",
    password: ""
  });



  
  async function showDecryptedData(n: number) {
    try {
      const _fullURL: string = ipfsHashToUrl(dataArray[n].dataHash);
      const _res = await fetch(_fullURL);
      const encryptedFile = await _res.blob();
      const decryptedFile: Blob = await decryptFile(encryptedFile, dataArray[n].decryptKey);
      if (props.type === DataTypeEnum.CREDENTIALS) {
        const formData: CredentialsFormData = JSON.parse(await unZipAndGetData(decryptedFile as File));
        setCredentialsData(formData)
        setShowDataModel(true)
      } else if (props.type === DataTypeEnum.FILE) {
        // downloadFile(decryptedFile, dataArray[n].dataName + ".zip")
      }
    } catch (error) {
      console.log("showDecryptedData", error);

    }
  }

  async function handleDecryptData(n: number) {
    if (!address) return
    const _decryptedKey = await decryptMessage(dataArray[n].decryptKey, address);
    if (_decryptedKey) {
      // setDecryptKey(dataArray[n].id, _decryptedKey)
    }
  }

  const fileData: DataExtendedInterface = {
    dataName: "google.com",
    dataType: DataTypeEnum.CREDENTIALS,
    dataHash: "string",
    decryptKey: "string",
    uploadTime: (new Date()).getTime() / 1000,
    id: "string",
    decryptedStatus: true,
  }
  return (
    <div className='flex flex-wrap flex-col h-full w-full px-2 gap-1'>
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