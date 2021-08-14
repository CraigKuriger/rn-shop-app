import { AUTHENTICATE, LOGIN, SIGNUP, LOGOUT } from "../actions/auth";

export interface AuthShape {
  token: string | null;
  userId: string | null;
}

interface AuthAction {
  type: string;
  token: string;
  userId: string;
}

const initialState = {
  token: null,
  userId: null,
};

export default (state: AuthShape = initialState, action: AuthAction) => {
  switch (action.type) {
    // case AUTHENTICATE:
    // case LOGIN:
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
