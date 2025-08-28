import { StateSchema } from 'app/providers/StoreProvider';

export const getUsernameSelector = (state: StateSchema) => state.login.username;
