import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';

interface TicketState {
    status: string;
    error: string;
}

const initialState: TicketState = {
    status: 'Awaiting response',
    error: 'No error',
}

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

export const createTicket = createAsyncThunk('ticket/createTicket', async (ticketData:CreateTicket) => {
    const response = await api.createTicket(ticketData);
    const data = response.data;
    return data;
});

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
            state.status = '200';
        })
        builder.addCase(createTicket.rejected, (state, action) => {
            state.status = '500';
            state.error = action.error.message!;
        })
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