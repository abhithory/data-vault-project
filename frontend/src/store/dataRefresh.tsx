import { StateCreator, create } from 'zustand';


interface StoreInterface {
    refreshCredentials: boolean;
    refreshFiles: boolean;
    changeCredentialsState: (newState: boolean) => void;
    changeFilesState: (newState: boolean) => void;
}

const store: StateCreator<StoreInterface> = (set) => ({
    refreshCredentials: false,
    refreshFiles: false,
    changeCredentialsState: (newState: boolean) => {
        set((store: StoreInterface) => ({
            ...store,
            refreshCredentials: newState,
        }))
    },
    changeFilesState: (newState: boolean) => {
        set((store: StoreInterface) => ({
            ...store,
            refreshFiles: newState,
        }))
    },
})

export const useDataRefreshStore = create(store);