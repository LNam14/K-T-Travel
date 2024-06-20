// tourSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
interface AuthenticationState {
    tourList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    tourList: null,
    originList: null,
    status: "idle",
};

export const getTourAsync = createAsyncThunk(
    "tour/get",
    async () => {
        try {
            const response = await axios.get("/api/tour/get");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createTourAsync = createAsyncThunk(
    "tour/create",
    async ({ data }: { data: any }) => {
        try {
            const response = await axios.post("/api/tour/create", {
                ...data,
            });


            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const deleteTourAsync = createAsyncThunk(
    'tour/delete',
    async (id: number) => {
        try {
            const response = await axios.delete('/api/tour/delete', {
                data: { id }
            });

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message;
            return errorMessage;
        }
    }
);

export const deleteDTTourAsync = createAsyncThunk(
    'tour/deleteDT',
    async ({ id, table }: { id: number; table: string }) => {
        try {
            const response = await axios.delete('/api/tour/delete/delete-table', {
                data: { id, table }
            });

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message;
            return errorMessage;
        }
    }
);
export const createDTTourAsync = createAsyncThunk(
    "tour/create-table",
    async ({ dataUpdate }: { dataUpdate: any }) => {
        try {
            const response = await axios.post("/api/tour/create/create-table", {
                ...dataUpdate,
            });


            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const updateTourAsync = createAsyncThunk(
    "tour/update",
    async (data: any) => {
        const response = await axios.post("/api/tour/update", data);
        return response.data;
    }
);
export const updatePromotionAsync = createAsyncThunk(
    "tour/update-promotion",
    async ({ newPromotion, id }: { newPromotion: number; id: number }) => {
        const response = await axios.post("/api/tour/update/update-promotion", { newPromotion, id });

        return response.data;
    }
);
export const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.tourList = null;
                state.originList = null;
            })
            .addCase(getTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.tourList = null;
                state.originList = null;
            })
            .addCase(deleteTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(deleteTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.tourList = null;
                state.originList = null;
            })
            .addCase(deleteDTTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDTTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(deleteDTTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.tourList = null;
                state.originList = null;
            })
            .addCase(updateTourAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTourAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(updateTourAsync.rejected, (state, action) => {
                state.status = "failed";
                state.tourList = null;
                state.originList = null;
            })
            .addCase(updatePromotionAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePromotionAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tourList = action.payload;
                state.originList = action.payload;
            })
            .addCase(updatePromotionAsync.rejected, (state, action) => {
                state.status = "failed";
                state.tourList = null;
                state.originList = null;
            });
    },
});

export const getTourList = (state: RootState) => state.tourState.tourList;
export default tourSlice.reducer;