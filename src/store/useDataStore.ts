import {create} from "zustand";
import {api} from "../api/api";
import {Option} from "../libs/custom-select/types.ts";

// Define the structure of the data coming from the API
interface DataOption {
    objectId: string;
    Name: string;
}

// Define the structure of the response
export interface ResponseData {
    results: DataOption[];
}

// Define the structure of the store state
interface DataStore {
    data: Option[];
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
}

/**
 * Creates a zustand store for managing data fetched from an API.
 */
export const useDataStore = create<DataStore>((set) => ({
    data: [],
    loading: false,
    error: null,

    fetchData: async () => {
        set({loading: true, error: null});

        try {
            const response = await api.get<ResponseData>("/classes/Complete_List_Names?keys=Name");
            // Transform API data into options for the CustomSelect
            const mappedOptions: Option[] = [
                ...response.data.results.map(({ objectId, Name }) => ({
                    value: objectId,
                    label: Name
                }))
            ];
            set({data: mappedOptions, loading: false});
        } catch (error) {
            set({error: error instanceof Error ? error.message : "An unknown error occurred", loading: false});
        }
    },
}));
