import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = { username: '', password: '' };

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginByUsername.pending, state => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(loginByUsername.fulfilled, state => {
            state.loading = false;
        });
        builder.addCase(
            loginByUsername.rejected,
            (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            },
        );
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
