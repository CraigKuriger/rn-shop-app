import { LOGIN, SIGNUP } from "../actions/auth";

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
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
