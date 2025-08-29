import { StateSchema } from 'app/providers/StoreProvider';

export const getPasswordSelector = (state: StateSchema) =>
    state?.loginForm?.password;
