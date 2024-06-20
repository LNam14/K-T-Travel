// ratioSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
    ratioList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    ratioList: null,
    originList: null,
    status: "idle",
};

export const getRatioAsync = createAsyncThunk(
    "ratio/get-total",
    async () => {
        try {
            const response = await axios.get("/api/statistical/ratio");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const ratioSlice = createSlice({
    name: "ratio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRatioAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getRatioAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.ratioList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getRatioAsync.rejected, (state, action) => {
                state.status = "failed";
                state.ratioList = null;
                state.originList = null;
            });
    },
});

export const getRatioList = (state: RootState) => state.ratioState.ratioList;
export default ratioSlice.reducer;