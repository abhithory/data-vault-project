import { useContext, useEffect, useState } from 'react';
import { DataExtendedInterface, DataStructInterface, DataTypeEnum } from '../interfaces/DataInterface'
import { decryptFile, unZipAndGetData } from '../utils/FileEncryption';
import { ipfsHashToUrl } from '../utils/Helper';
import DataItem from './DataItem'
import { CredentialsFormData } from '../interfaces/Credentials';
import { decryptMessage } from '../utils/MessageEncryption';
import { Web3ConnectionContext } from '../Provider/Web3Provider';
import { useDataStore } from '../store/dataStore';
import SimpleLoader from '../components/Loader/loader';
import PopUpModel from '../components/PopupModel/PopUpModel';
import CredentialsForm from './Credentials/CredentialsForm';

interface UploadDataInterface {
  type: DataTypeEnum
}

function AllUserData(props: UploadDataInterface) {

  const { address,ethereumProvider } = useContext(Web3ConnectionContext);


  const [allData, setDecryptKey, loadingStatus] = useDataStore((store) => [store.allData, store.setDecryptKey, store.loadingStatus]);

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

    chrome.tabs.create({ url: chrome.extension.getURL('index.html') }, function(tab) {
      console.log(tab);
      
    });

    const _decryptedKey = await decryptMessage(ethereumProvider,dataArray[n].decryptKey, address);
    if (_decryptedKey) {
      setDecryptKey(dataArray[n].id, _decryptedKey)
    }
  }


  useEffect(() => {
    const specificData = allData.filter(data => data.dataType === props.type);
    if (specificData) {
      setDataArray(specificData);
    }
  }, [allData])

  return (

    <>
    {dataArray &&
          <div className='flex flex-wrap flex-col h-full w-full px-2 gap-1'>
          {dataArray.map((file: DataExtendedInterface, key: number) => {
            return (
              <DataItem
                key={key}
                index={key}
                type={props.type}
                file={file}
                showDecryptedData={showDecryptedData}
                handleDecryptData={handleDecryptData}
              />
            )
          })}
        </div>
      }

      <div className="flex_center w-full">
        {loadingStatus ?
          <SimpleLoader className='w-6' />
          : dataArray.length < 1 &&
          <h1 className="text-sm">You Don't have data. Please Upload Something</h1>
        }
      </div>

      <PopUpModel isOpen={showDataModel} closeModal={() => setShowDataModel(false)}>
        <div className="text-center">
          <h1 className="text_primary_gradient_2 text_sub_heading_size">Your Credentials</h1>
          <CredentialsForm
            type="update"
            setCredentialsData={() => { }}
            submitForm={() => { }}
            credentialsData={credentialsData} />
        </div>
      </PopUpModel>
    </>
  )
}

export default AllUserData