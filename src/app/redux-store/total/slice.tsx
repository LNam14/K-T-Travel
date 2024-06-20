// totalSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
interface AuthenticationState {
    totalList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    totalList: null,
    originList: null,
    status: "idle",
};

export const getTotalAsync = createAsyncThunk(
    "total/get-total",
    async () => {
        try {
            const response = await axios.get("/api/statistical/total");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const totalSlice = createSlice({
    name: "total",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTotalAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTotalAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.totalList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getTotalAsync.rejected, (state, action) => {
                state.status = "failed";
                state.totalList = null;
                state.originList = null;
            });
    },
});

export const getTotalList = (state: RootState) => state.totalState.totalList;
export default totalSlice.reducer;