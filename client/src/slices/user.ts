import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';

interface UserData {
    id: number;
    email: string;
}

interface UserState {
    value: {
        id: number;
        name: string;
        email: string;
        password: string;
        confirmedPassword: string;
    }
    users: UserData[];
    status: string;
    error: string;
}

const initialState: UserState = {
    users: [],
    value: {id: 0, name: "", email: "", password: "", confirmedPassword: ""},
    status: 'idle',
    error: 'No error',
}

interface CreateUserFormData {
    name: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

interface LoginUserFormData {
    email: string;
    password: string;
}

export const createUser = createAsyncThunk('user/createUser', async (formData:CreateUserFormData) => {
    const response = await api.signUp(formData);
    const data = response.data;
    // console.log((data));
    localStorage.setItem("profile", JSON.stringify(data));
    return data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (formData:LoginUserFormData) => {
    const response = await api.signIn(formData);
    const data = response.data;
    localStorage.setItem("profile", JSON.stringify(data));
    return data;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.status = "fulfilled";
            state.users.push({id: payload.id, email:payload.email});
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message!
        })
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.status = "fulfilled";
            state.users.push({id: payload.id, email:payload.email});
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message!;
        })
    }
});

//set action types and export them ready for use
// export const {signOut} = userSlice.actions;

//export all reducers as default to be able to be used in store reducer
export default userSlice.reducer;