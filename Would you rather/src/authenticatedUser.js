import { SET_AUTHED_USER } from './types';

export const setAuthenticatedUser = (id = null) => ({
  type: SET_AUTHED_USER,
  id,
});
