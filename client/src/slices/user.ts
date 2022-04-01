import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

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
  };
  users: UserData[];
  status: string;
  error: string;
}

const initialState: UserState = {
  users: [],
  value: { id: 0, name: "", email: "", password: "", confirmedPassword: "" },
  status: "idle",
  error: "No error"
};

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

export const createUser = createAsyncThunk(
  "user/createUser",
  async (formData: CreateUserFormData) => {
    const response = await api.signUp(formData);
    const status = response.data.status;
    if (status === 200) {
      //we need to resolve the promise in the thunk so that the extraReducer knows to use the 'fulfilled' action type
      return Promise.resolve(response.data);
    } else {
      //we need to reject the promise in the thunk so that the extraReducer knows which action type to use
      return Promise.reject(response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData: LoginUserFormData) => {
    const response = await api.signIn(formData);
    const status = response.data.status;
    if (status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.users.push({ id: payload.id, email: payload.email });
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message!;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.users.push({ id: action.payload.id, email: action.payload.email });
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      //can only access the action error in the reducer therefore need to set it as the payload
      state.error = action.error.message!;
      //set the payload as the rejected thunk error message
      action.payload = state.error;
    });
  }
});

//set action types and export them ready for use
// export const {signOut} = userSlice.actions;

//export all reducers as default to be able to be used in store reducer
export default userSlice.reducer;
