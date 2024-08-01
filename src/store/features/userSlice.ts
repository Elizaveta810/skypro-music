import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getValueFromLocalStorage } from "@/lib/getValueFromLs";

type AuthStateType = {
  authState: boolean;
  userData: {
    email: string;
    username: string;
    refresh: string;
    access: string;
    id: number;
  };
};


function checkLSAuth(key: string) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "");
    return data || null;
  } catch (error) {
    return null;
  }
}


const initialState: AuthStateType = {
  authState: !!checkLSAuth("user"),
  userData: checkLSAuth("user"),
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setUserData: (
      state,
      action: PayloadAction<{
        email?: string;
        username?: string;
        refresh?: string;
        access?: string;
        id?: number;
      } | null>
    ) => {
      state.userData = {
        id: action.payload?.id || state.userData.id,
        email:
          action.payload?.email ||
          state.userData.email ||
          getValueFromLocalStorage("user"),
        username: action.payload?.username || state.userData.username,
        refresh: action.payload?.refresh || state.userData?.refresh || "",
        access:
          action.payload?.access ||
          state.userData?.access ||
          getValueFromLocalStorage("token"),
      };
    },
  },
});

export const { setAuthState, setUserData } = userSlice.actions;

export const authReducer = userSlice.reducer;
