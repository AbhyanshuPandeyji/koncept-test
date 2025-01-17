import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuth } from "../auth";
import { toast } from "react-toastify";
import { persistor } from "../../store";
import { setLoader } from "../loaders";
import { initialState as loaderIntialState } from "../loaders";
import { toastify } from "../../../components/toast";


const initialState = {
  user: null,
  userList: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const getUserListThunkMiddleware = () => {
  return async ( navigate , dispatch) => {
    try {
      const response = await axios.get("https://k.ocpl.tech/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("konceptLawToken")}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response?.status === 200) {
        const data = await response.data;
        dispatch(setUser({ userList: data }));
      }
    } catch (error) {
      if (error.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else if (error.response?.data) {
        toastify({ msg: error.response.data, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    }
  };
};

export const logoutThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      persistor.purge();
      localStorage.clear();
      dispatch(setUser({ user: null, userList: null }));
      dispatch(
        setAuth({
          token: null,
          isAuthenticated: false,
          role: null,
        })
      );
      dispatch(setLoader({ loaderIntialState }));
    } catch (error) {
      let message = "Log Out Error";
      if (error.hasOwnProperty("response")) {
        message = error.response.data.error;
      }
      toast.error(message);
    }
  };
};
