import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_REGISTER_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "./types";

export const register = (
  first_name,
  last_name,
  username,
  password,
  re_password
) => async (dispatch) => {
  const body = JSON.stringify({
    first_name,
    last_name,
    username,
    password,
    re_password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    // send to django endpoint
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 201) {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_register_success = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGIN_FAILED,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAILED,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAILED,
    });
  }
};
