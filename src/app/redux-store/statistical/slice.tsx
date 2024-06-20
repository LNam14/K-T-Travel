// statisticalSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
interface AuthenticationState {
    statisticalList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    statisticalList: null,
    originList: null,
    status: "idle",
};

export const getStatisticalAsync = createAsyncThunk(
    "statistical/get-statistical",
    async () => {
        try {
            const response = await axios.get("/api/statistical");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);


export const statisticalSlice = createSlice({
    name: "statistical",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatisticalAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getStatisticalAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.statisticalList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getStatisticalAsync.rejected, (state, action) => {
                state.status = "failed";
                state.statisticalList = null;
                state.originList = null;
            });
    },
});

export const getStatisticalList = (state: RootState) => state.statisticalState.statisticalList;
export default statisticalSlice.reducer;