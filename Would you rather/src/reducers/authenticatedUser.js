import { SET_AUTHED_USER } from '../types';

const authenticatedUser = (state = null, { type, id }) => {
    return type === SET_AUTHED_USER ? id : state;
}

export default authenticatedUser;