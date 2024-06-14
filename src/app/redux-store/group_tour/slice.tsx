// tourSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
    groupTourList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    groupTourList: null,
    originList: null,
    status: "idle",
};

export const getGroupTourAsync = createAsyncThunk(
    "groupTour/get-groupTour",
    async () => {
        try {
            const response = await axios.get("/api/group-tour/get");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createGroupTourAsync = createAsyncThunk(
    "groupTour/create",
    async ({ data }: { data: any }) => {
        try {
            const response = await axios.post("/api/group-tour/create", {
                ...data,
            });
            console.log("response.data", response.data);

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const updateGroupTourAsync = createAsyncThunk(
    "groupTour/update",
    async (data: any) => {
        const response = await axios.post("/api/group-tour/update", data);

        console.log("response.data", response.data);
        return response.data;
    }
);

export const groupTourSlice = createSlice({
    name: "groupTour",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroupTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getGroupTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.groupTourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getGroupTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.groupTourList = null;
                state.originList = null;
            })
            .addCase(createGroupTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createGroupTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.groupTourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createGroupTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.groupTourList = null;
                state.originList = null;
            })
            .addCase(updateGroupTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateGroupTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.groupTourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(updateGroupTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.groupTourList = null;
                state.originList = null;
            });
    },
});

export const getGroupTourList = (state: RootState) => state.groupTourState.groupTourList;
export default groupTourSlice.reducer;