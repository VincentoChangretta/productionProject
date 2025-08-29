import { StateSchema } from 'app/providers/StoreProvider';

export const getErrorSelector = (state: StateSchema) => state?.loginForm?.error;
