// tourSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
    locationHotList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    locationHotList: null,
    originList: null,
    status: "idle",
};

export const getLocationHotAsync = createAsyncThunk(
    "locationHot/get-locationHot",
    async () => {
        try {
            const response = await axios.get("/api/location-hot/get");


            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createLocationHotAsync = createAsyncThunk(
    "locationHot/create",
    async ({ data }: { data: any }) => {
        try {
            const response = await axios.post("/api/location-hot/create", {
                ...data,
            });

            console.log("response.data", response.data);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);
export const updateLocationHotAsync = createAsyncThunk(
    "locationHot/update",
    async (data: any) => {
        const response = await axios.post("/api/locationHot/update", data);


        return response.data;
    }
);

export const deleteLocationHotAsync = createAsyncThunk(
    'locationHot/delete',
    async (id: number) => {
        try {
            const response = await axios.delete('/api/location-hot/delete', {
                data: { id }
            });

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message;
            return errorMessage;
        }
    }
);
export const locationHotSlice = createSlice({
    name: "locationHot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocationHotAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getLocationHotAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.locationHotList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getLocationHotAsync.rejected, (state, action) => {
                state.status = "failed";
                state.locationHotList = null;
                state.originList = null;
            })
            .addCase(createLocationHotAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createLocationHotAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.locationHotList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createLocationHotAsync.rejected, (state, action) => {
                state.status = "failed";
                state.locationHotList = null;
                state.originList = null;
            })
            .addCase(deleteLocationHotAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteLocationHotAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.locationHotList = action.payload;
                state.originList = action.payload;
            })
            .addCase(deleteLocationHotAsync.rejected, (state, action) => {
                state.status = "failed";
                state.locationHotList = null;
                state.originList = null;
            });
    },
});

export const getLocationHotList = (state: RootState) => state.locationHotState.locationHotList;
export default locationHotSlice.reducer;