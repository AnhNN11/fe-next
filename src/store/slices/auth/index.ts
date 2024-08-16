import { log } from "console";
import { ClubDataType } from "@/components/modules/Clubs/HomepageClubsListComponent";
import { constants } from "@/settings";
import { authAPI } from "@/store/queries/auth";
import webStorageClient from "@/utils/webStorageClient";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const userInfoFromStorage: object = webStorageClient.get(constants.USER_INFO);
const currentClubFromStorage: ClubDataType = webStorageClient.get(
  constants.CURRENT_CLUB
);
const accessTokenFromStorage = webStorageClient.getToken();

interface AuthSlickInterface {
  userInfo: any;
  access_token: any;
  currentClub: ClubDataType;
}

const initialState: AuthSlickInterface = {
  userInfo: userInfoFromStorage || null,
  access_token: accessTokenFromStorage || null,
  currentClub: currentClubFromStorage || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionSocialLogin: (state, action) => {
      state.userInfo = action.payload.user;
      webStorageClient.setToken(action?.payload?.token);
      webStorageClient.set(constants.USER_INFO, action?.payload?.user);
      console.log(action.payload.user);
      console.log(action.payload.token);
      state.access_token = action?.payload?.token;
    },
    actionLogin: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        isRemember: boolean;
      }>
    ) => {},
    actionAccessClub: (state, action) => {
      webStorageClient.set(constants.CURRENT_CLUB, action.payload?._id);
      state.currentClub = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.signIn.matchFulfilled,
      (state, action) => {
        webStorageClient.setToken(action?.payload?.token);
        webStorageClient.set(constants.USER_INFO, action?.payload?.user);
        state.userInfo = action?.payload?.user;
        state.access_token = action?.payload?.token;
      }
    );
  },
});

export const { actionLogin, actionAccessClub, actionSocialLogin } =
  authSlice.actions;

export default authSlice.reducer;
