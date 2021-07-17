export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

// Firebase
// Turn on email authentication setting
// https://console.firebase.google.com/project/react-native-c0dc8/authentication/providers
export const signup = (email, password) => {
  return async (dispatch) => {
    // Get API key from project settings
    // https://console.firebase.google.com/project/react-native-c0dc8/settings/general
    const apiKey = "AIzaSyAMIpJ084w7T3JK41lcxgRaFirmfI6Tn4E";
    // Get authentication URLs from docs
    // https://firebase.google.com/docs/reference/rest/auth
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email is already in use!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.warn(resData);
    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const apiKey = "AIzaSyAMIpJ084w7T3JK41lcxgRaFirmfI6Tn4E";
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "Invalid password!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.warn(resData);
    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};
