import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems } from "../services/item-api";

export const getItems = createAsyncThunk("items/getItems", fetchItems);

export interface Item {
    guid: string;
    name: string;
    path: string[];
    properties: Record<string, string>;
}
export interface Items{
    items: Item[];
    selectedItem: Item;
    error: string;
    isLoading: boolean;
}

const initialState: Items = {
    items: [],
    selectedItem: {
        guid: "",
        name: "",
        path: [],
        properties: {},
    },
    error: '',
    isLoading: false,
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        selectItem: (state, action: PayloadAction<Item>) => {
            state.selectedItem = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        })
        .addCase(getItems.rejected, (state, action) => {
            state.error = action.error.message || 'An unknown error occurred';
        }).addCase(getItems.pending, (state) => {
            state.isLoading = true;
        });
    },
});

export const { selectItem } = itemSlice.actions;

export default itemSlice.reducer;