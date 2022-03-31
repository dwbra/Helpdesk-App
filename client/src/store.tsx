import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/user';
import ticketSlice from './slices/tickets';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer: {
        user: userSlice,
        tickets: ticketSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//While it's possible to import the RootState and AppDispatch types into each component, 
//it's better to create pre-typed versions of the useDispatch and useSelector hooks for usage in your application. 
//This is important for a couple reasons:
//For useSelector, it saves you the need to type (state: RootState) every time
//For useDispatch, the default Dispatch type does not know about thunks or other middleware. 
//In order to correctly dispatch thunks, you need to use the specific customized AppDispatch type from the store that includes the thunk middleware types, 
//and use that with useDispatch. Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;