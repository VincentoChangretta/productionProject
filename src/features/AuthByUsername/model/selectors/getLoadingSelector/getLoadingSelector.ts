import { StateSchema } from 'app/providers/StoreProvider';

export const getLoadingSelector = (state: StateSchema): boolean =>
    state.login.loading;
