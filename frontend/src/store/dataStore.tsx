import { DataExtendedInterface, DataStructInterface, DataTypeEnum } from '@/interfaces/DataInterface';
import { StateCreator, create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';



interface dataStoreInterface {
    allData: DataExtendedInterface[];
    loadingStatus: boolean;
    setData: (dataArray: DataStructInterface[]) => void;
    setLoadingStatus: (status: boolean) => void;
    pushData: (dataArray: DataStructInterface[]) => void;
    addData: (data: DataStructInterface) => void;
    setDecryptKey: (id: string, key: string) => void;
}

const store: StateCreator<dataStoreInterface> = (set) => ({
    allData: [],
    loadingStatus: false,
    setData: (dataArray: DataStructInterface[]) => {
        set((store) => {
            const extendedData: DataExtendedInterface[] = dataArray.map(((item: DataStructInterface) => {
                return { ...item, decryptedStatus: false, id: uuidv4() }
            }))            
            return {
                ...store,
                allData: extendedData
            }
        })
    },
    setLoadingStatus: (status: boolean) => {
        set((store)=>({...store, loadingStatus: status}))
    },
    pushData: (dataArray: DataStructInterface[]) => {
        set((store) => {
            const extendedData: DataExtendedInterface[] = dataArray.map(((item: DataStructInterface) => {
                return { ...item, decryptedStatus: false, id: uuidv4() }
            }))
            return {
                ...store,
                allData: [...store.allData, ...extendedData],
            }
        })
    },
    addData: (data: DataStructInterface) => {
        set((store) => ({
            ...store,
            allData: [...store.allData, { ...data, decryptedStatus: false, id: uuidv4() }]
        }))
    },
    setDecryptKey: (id: string, key: string) => {
        set((store) => {
            const updatedData = store.allData.map((data) => {
                if (data.id === id) {
                    data.decryptKey = key;
                    data.decryptedStatus = true;
                }
                return data;
            })

            return {
                ...store,
                allData: updatedData
            }
        })
    },


})

export const useDataStore = create(store)