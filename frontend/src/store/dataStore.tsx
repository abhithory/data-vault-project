import { CredentialsExtendedDataInterface } from '@/interfaces/Credentials';
import { FileExtendedDataInterface } from '@/interfaces/Files';
import { StateCreator, create } from 'zustand';

interface dataStoreInterface {
    allCredentials: CredentialsExtendedDataInterface[];
    setCredentials: (credentials: CredentialsExtendedDataInterface[]) => void;
    addCredentials: (credentials: CredentialsExtendedDataInterface) => void;
    // allFiles: FileExtendedDataInterface[];
    // setFiles: (files: FileExtendedDataInterface[]) => void;
    // addFiles: (file: FileExtendedDataInterface[]) => void;
}

const store: StateCreator<dataStoreInterface> = (set) => ({
    allCredentials: [],
    allFiles: [],
    setCredentials: (credentials: CredentialsExtendedDataInterface[]) => {
        set((store) => ({
            ...store,
            allCredentials: credentials,
        }))
    },
    addCredentials: (credentials: CredentialsExtendedDataInterface) => {
        set((store) => ({
            ...store,
            allCredentials: [...store.allCredentials,credentials]
        }))
    },

})

export const useKeyDataStore = create(store)