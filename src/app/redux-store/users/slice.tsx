// tourSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { setCookie } from "cookies-next";
interface AuthenticationState {
    userList: any;
    originList: any;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
    userList: null,
    originList: null,
    status: "idle",

};

export const getUserAsync = createAsyncThunk(
    "user/get-user",
    async () => {
        try {
            const response = await axios.get("/api/users/get");

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const createUserAsync = createAsyncThunk(
    "user/create",
    async ({ data }: { data: any }) => {
        try {
            const response = await axios.post("/api/users/create", {
                ...data,
            });

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const lockUserAsync = createAsyncThunk(
    "user/lock",
    async (data: any) => {
        const response = await axios.post("/api/users/lock", data);
        if (response.data.token) {
            setCookie("token", response.data.token);
        }
        console.log("response.data", response.data.token);
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    "user/update",
    async (data: any) => {
        const response = await axios.post("/api/users/update", data);
        return response.data;
    }
);

export const changePasswordAsync = createAsyncThunk(
    "user/change",
    async (data: any) => {
        const response = await axios.post("/api/users/change-password", data);
        console.log("response.data", response.data);
        return response.data;
    }
);

export const deleteUserAsync = createAsyncThunk(
    'user/delete',
    async (data: any) => {
        try {
            const response = await axios.delete('/api/users/delete', data);

            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message;
            return errorMessage;
        }
    }
);
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload;
                state.originList = action.payload;
            })
            .addCase(getUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.userList = null;
                state.originList = null;
            })
            .addCase(createUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload;
                state.originList = action.payload;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.userList = null;
                state.originList = null;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload;
                state.originList = action.payload;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.userList = null;
                state.originList = null;
            })
            .addCase(deleteUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload;
                state.originList = action.payload;
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.userList = null;
                state.originList = null;
            })
            .addCase(lockUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(lockUserAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload;
                state.originList = action.payload;
            })
            .addCase(lockUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.userList = null;
                state.originList = null;
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changePasswordAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload;
                state.originList = action.payload;
            })
            .addCase(changePasswordAsync.rejected, (state, action) => {
                state.status = "failed";
                state.userList = null;
                state.originList = null;
            });
    },
});

export const getUserList = (state: RootState) => state.userState.userList;
export default userSlice.reducer;