import { DataExtendedInterface } from '@/interfaces/DataInterface';
import { StateCreator, create } from 'zustand';

interface dataStoreInterface {
    allData: DataExtendedInterface[];
    setData: (dataArray: DataExtendedInterface[]) => void;
    pushData: (dataArray: DataExtendedInterface[]) => void;
    addData: (data: DataExtendedInterface) => void;
    setDecryptKey: (id: string, key: string) => void;
}

const store: StateCreator<dataStoreInterface> = (set) => ({
    allData: [],
    setData: (dataArray: DataExtendedInterface[]) => {
        set((store) => ({
            ...store,
            allData: dataArray,
        }))
    },
    pushData: (dataArray: DataExtendedInterface[]) => {
        set((store) => ({
            ...store,
            allData: [...store.allData,...dataArray],
        }))
    },
    addData: (data: DataExtendedInterface) => {
        set((store) => ({
            ...store,
            allData: [...store.allData, data]
        }))
    },
    setDecryptKey: (id: string, key:string) => {
        set((store) => {
            const updatedData = store.allData.map((data)=>{
                if (data.id === id) {
                    data.decryptKey = key;
                    data.decryptedStatus = true;
                }
                return data;
            })

            return {
                ...store,
                allData:updatedData
            }
        })
    },


})

export const useDataStore = create(store)