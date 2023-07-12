import { create } from 'zustand';


interface storeInterface{
    refreshCredentials: boolean;
    refreshFiles: boolean;
}

const store = (set) => ({
    refreshCredentials: false,
    refreshFiles: false,
    changeCredentialsState: (newState: boolean) => {
        set((store: storeInterface) => {
            store.refreshCredentials = newState;
        })
    },
    changeFilessState: (newState: boolean) => {
        set((store: storeInterface) => {
            store.refreshCredentials = newState;
        })
    },
})

export const useDataRefreshStore = create(store);