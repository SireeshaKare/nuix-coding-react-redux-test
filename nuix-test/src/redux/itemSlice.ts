import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "../services/item-api";

export const getItems = createAsyncThunk("items/getItems", fetchItems);

const initialState = {
    items: [],
    selectedItem: {},
    error: '',
    isLoading: false,
    
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        selectItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => {
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