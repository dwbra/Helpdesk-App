import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

interface TicketState {
  status: string;
  error: string;
}

const initialState: TicketState = {
  status: "Awaiting response",
  error: "No error"
};

// export const fetchTicket = createAsyncThunk('user/createUser', async (formData:CreateUserFormData) => {
//     const response = await api.signUp(formData);
//     const data = response.data;
//     // console.log((data));
//     localStorage.setItem("profile", JSON.stringify(data));
//     return data;
// });

interface CreateTicket {
  title: string;
  discipline: string;
  message: string;
  website: string;
  ticketImages: {}[];
  userId: number;
}

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData: CreateTicket) => {
    const response = await api.createTicket(ticketData);
    const status = response.status;
    if (status === 200) {
      //we need to resolve the promise in the thunk so that the extraReducer knows to use the 'fulfilled' action type
      return Promise.resolve(response.data);
    } else {
      //we need to reject the promise in the thunk so that the extraReducer knows which action type to use
      return Promise.reject(response.data.message);
    }
  }
);

// export const deleteTicket = createAsyncThunk('user/loginUser', async (formData:LoginUserFormData) => {
//     const response = await api.signIn(formData);
//     const data = response.data;
//     localStorage.setItem("profile", JSON.stringify(data));
//     return data;
// });

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(fetchTicket.fulfilled, (state, {payload}) => {
    //     state.status = "fulfilled";
    //     state.users.push({id: payload.id, email:payload.email});
    // })
    // builder.addCase(fetchTicket.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message!
    // })
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.status = "failed";
      //can only access the action error in the reducer therefore need to set it as the payload
      state.error = action.error.message!;
      //set the payload as the rejected thunk error message
      action.payload = state.error;
    });
    // builder.addCase(deleteTicket.fulfilled, (state, {payload}) => {
    //     state.status = "fulfilled";
    //     state.users.push({id: payload.id, email:payload.email});
    // })
    // builder.addCase(deleteTicket.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message!;
    // })
  }
});

//set action types and export them ready for use
// export const {getTickets, updateTicket, deleteTicket} = ticketsSlice.actions;

//export all reducers as default to be able to be used in store reducer
export default ticketsSlice.reducer;
