// tourSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
    locationList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    locationList: null,
    originList: null,
    status: "idle",
};

export const getLocationAsync = createAsyncThunk(
    "location/get-location",
    async () => {
        try {
            const response = await axios.get("/api/location/get-location");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createLocationAsync = createAsyncThunk(
    "location/create",
    async ({ data }: { data: any }) => {
        try {
            const response = await axios.post("/api/location/create", {
                ...data,
            });


            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);
export const updateLocationAsync = createAsyncThunk(
    "location/update",
    async (data: any) => {
        const response = await axios.post("/api/location/update", data);


        return response.data;
    }
);

export const deleteLocationAsync = createAsyncThunk(
    'location/delete',
    async (id: number) => {
        try {
            const response = await axios.delete('/api/location/delete', {
                data: { id }
            });

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message;
            return errorMessage;
        }
    }
);
export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocationAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getLocationAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.locationList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getLocationAsync.rejected, (state, action) => {
                state.status = "failed";
                state.locationList = null;
                state.originList = null;
            })
            .addCase(createLocationAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createLocationAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.locationList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createLocationAsync.rejected, (state, action) => {
                state.status = "failed";
                state.locationList = null;
                state.originList = null;
            });
    },
});

export const getLocationList = (state: RootState) => state.locationState.locationList;
export default locationSlice.reducer;