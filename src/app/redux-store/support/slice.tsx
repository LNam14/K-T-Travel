// tourSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
    supportList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    supportList: null,
    originList: null,
    status: "idle",
};

export const getSupportAsync = createAsyncThunk(
    "support/get-support",
    async () => {
        try {
            const response = await axios.get("/api/support/get");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createSupportAsync = createAsyncThunk(
    "support/create",
    async ({ dataSP }: { dataSP: any }) => {
        try {
            const response = await axios.post("/api/support/create", {
                ...dataSP,
            });

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSupportAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getSupportAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.supportList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getSupportAsync.rejected, (state, action) => {
                state.status = "failed";
                state.supportList = null;
                state.originList = null;
            })
            .addCase(createSupportAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createSupportAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.supportList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createSupportAsync.rejected, (state, action) => {
                state.status = "failed";
                state.supportList = null;
                state.originList = null;
            });
    },
});

export const getSupportList = (state: RootState) => state.supportState.supportList;
export default supportSlice.reducer;