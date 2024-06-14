// tourSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
    bookingList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    bookingList: null,
    originList: null,
    status: "idle",
};

export const getBookingAsync = createAsyncThunk(
    "booking/get-booking",
    async () => {
        try {
            const response = await axios.get("/api/booking/get");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createBookingAsync = createAsyncThunk(
    "booking/create",
    async ({ data }: { data: any }) => {
        try {
            const response = await axios.post("/api/booking/create", {
                ...data,
            });

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const updateBookingAsync = createAsyncThunk(
    "booking/update",
    async (data: any) => {
        const response = await axios.post("/api/booking/update", data);

        console.log("response.data", response.data);
        return response.data;
    }
);

export const deleteBookingAsync = createAsyncThunk(
    'booking/delete',
    async (data: any) => {
        try {
            const response = await axios.delete('/api/booking/delete', data);

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message;
            return errorMessage;
        }
    }
);
export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookingAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBookingAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookingList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getBookingAsync.rejected, (state, action) => {
                state.status = "failed";
                state.bookingList = null;
                state.originList = null;
            })
            .addCase(createBookingAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createBookingAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookingList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createBookingAsync.rejected, (state, action) => {
                state.status = "failed";
                state.bookingList = null;
                state.originList = null;
            })
            .addCase(updateBookingAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateBookingAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookingList = action.payload;
                state.originList = action.payload;
            })
            .addCase(updateBookingAsync.rejected, (state, action) => {
                state.status = "failed";
                state.bookingList = null;
                state.originList = null;
            })
            .addCase(deleteBookingAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBookingAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookingList = action.payload;
                state.originList = action.payload;
            })
            .addCase(deleteBookingAsync.rejected, (state, action) => {
                state.status = "failed";
                state.bookingList = null;
                state.originList = null;
            });
    },
});

export const getBookingList = (state: RootState) => state.bookingState.bookingList;
export default bookingSlice.reducer;