import { AppState } from '../types';
import { combineReducers } from 'redux';

import authReducer from './auth';

export const initialState: AppState = {
  auth: {
    user: null,

    logInStatus: null,
    logInErr: null,

    logOutStatus: null,
    logOutErr: null,

    createAccountStatus: null,
    createAccountErr: null,

    sendVerificationEmailStatus: null,
    sendVerificationEmailErr: null,

    changeEmailStatus: null,
    changeEmailErr: null,

    changePasswordStatus: null,
    changePasswordErr: null,

    deleteAccountStatus: null,
    deleteAccountErr: null
  }
}

export const rootReducer = combineReducers({
  auth: authReducer
});