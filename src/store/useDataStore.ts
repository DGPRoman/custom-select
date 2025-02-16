import {create} from "zustand";
import {api} from "../api/api";
import {ResponseData} from "../types/data.ts";


interface DataStore {
    data: ResponseData;
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
    data: {results: []},
    loading: false,
    error: null,

    fetchData: async () => {
        set({loading: true, error: null});

        try {
            const response = await api.get<ResponseData>("/classes/Complete_List_Names?keys=Name");
            set({data: response.data, loading: false});
        } catch (error) {
            set({error: error instanceof Error ? error.message : "Unknown error", loading: false});
        }
    },
}));
