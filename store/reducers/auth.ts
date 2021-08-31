import {
  AUTHENTICATE,
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_DID_TRY_AUTO_LOGIN,
} from "../actions/auth";

export interface AuthShape {
  token: string | null;
  userId: string | null;
  didTryAutoLogin: boolean;
}

interface AuthAction {
  type: string;
  token: string;
  userId: string;
}

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state: AuthShape = initialState, action: AuthAction) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return { ...initialState, didTryAutoLogin: true };
    default:
      return state;
  }
};
