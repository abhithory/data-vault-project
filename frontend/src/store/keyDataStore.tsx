import { StateCreator, create } from 'zustand';

interface KeyDataStoreInterface {
    PEK: string | null;
    setPEK: (newPEK: string) => void;
}

const store: StateCreator<KeyDataStoreInterface> = (set) => ({
    PEK: null,
    setPEK: (newPEK: string) => {
        set((store) => ({
            ...store,
            PEK: newPEK
        }))
    }
})

export const useKeyDataStore = create(store)