import { Reducer, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { DataAccess } from '../data-access';
import { AppStateAuth, User } from '../types';
const dao = DataAccess.getInstance();

// errors
// =============
enum AuthError {
  passwordsDoNotMatch = 'Passwords do not match',
}

// action types
// ===============
enum ActionType {
  INITIALIZE = 'INITIALIZE',

  UPDATE_USER = 'UPDATE_USER',

  LOG_IN_REQUEST = 'LOG_IN_REQUEST',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',
  LOG_IN_RESET = 'LOG_IN_RESET',

  LOG_OUT_REQUEST = 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILURE = 'LOG_OUT_FAILURE',
  LOG_OUT_RESET = 'LOG_OUT_RESET',

  CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST',
  CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
  CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE',
  CREATE_ACCOUNT_RESET = 'CREATE_ACCOUNT_RESET',

  SEND_VERIFICATION_EMAIL_REQUEST = 'SEND_VERIFICATION_EMAIL_REQUEST',
  SEND_VERIFICATION_EMAIL_SUCCESS = 'SEND_VERIFICATION_EMAIL_SUCCESS',
  SEND_VERIFICATION_EMAIL_FAILURE = 'SEND_VERIFICATION_EMAIL_FAILURE',
  SEND_VERIFICATION_EMAIL_RESET = 'SEND_VERIFICATION_EMAIL_RESET',

  DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST',
  DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE',
  DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS',
  DELETE_ACCOUNT_RESET = 'DELETE_ACCOUNT_RESET',

  CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_RESET = 'CHANGE_PASSWORD_RESET',

  CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST',
  CHANGE_EMAIL_FAILURE = 'CHANGE_EMAIL_FAILURE',
  CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS',
  CHANGE_EMAIL_RESET = 'CHANGE_EMAIL_RESET',
}

// action creators
// ================
export const initialize = (): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    const user = await dao.getUser();
    dispatch(updateUser(user));
  }
}

export const updateUser = (user: User | null) => ({type: ActionType.UPDATE_USER, payload: user});

export const resetLogInStatus = () => ({type: ActionType.LOG_IN_RESET});
export const logIn = (email: string, password: string): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    dispatch({type: ActionType.LOG_IN_RESET});
    dispatch({type: ActionType.LOG_IN_REQUEST});
    try {
      await dao.logIn(email, password);
      dispatch({type: ActionType.LOG_IN_SUCCESS});
      const newUser = await dao.getUser();
      dispatch(updateUser(newUser));
    } catch(err) {
      dispatch({type: ActionType.LOG_IN_FAILURE, payload: err})
    }
  }
}

export const resetLogOutStatus = () => ({type: ActionType.LOG_OUT_RESET});
export const logOut = (): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    dispatch({type: ActionType.LOG_OUT_RESET});
    dispatch({type: ActionType.LOG_OUT_REQUEST});
    try {
      await dao.logOut();
      dispatch({type: ActionType.LOG_OUT_SUCCESS});
      dispatch(updateUser(null));
    } catch(err) {
      dispatch({type: ActionType.LOG_OUT_FAILURE, payload: err});
    }
  }
}

export const resetCreateAccountStatus = () => ({type: ActionType.CREATE_ACCOUNT_RESET});
export const createAccount = (email: string, password: string): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    dispatch({type: ActionType.CREATE_ACCOUNT_RESET});
    dispatch({type: ActionType.CREATE_ACCOUNT_REQUEST});
    try {
      await dao.createAccount(email, password);
      dispatch({type: ActionType.CREATE_ACCOUNT_SUCCESS});
      const newUser = await dao.getUser();
      dispatch(updateUser(newUser));
    } catch(err) {
      dispatch({type: ActionType.CREATE_ACCOUNT_FAILURE, payload: err});
    }
  }
}

export const resetSendVerificationEmailStatus = () => ({type: ActionType.SEND_VERIFICATION_EMAIL_RESET});
export const sendVerificationEmail = (): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    dispatch({type: ActionType.SEND_VERIFICATION_EMAIL_RESET});
    dispatch({type: ActionType.SEND_VERIFICATION_EMAIL_REQUEST});
    try {
      await dao.sendVerificationEmail();
      dispatch(({type: ActionType.SEND_VERIFICATION_EMAIL_SUCCESS}));
    } catch(err) {
      dispatch({type: ActionType.SEND_VERIFICATION_EMAIL_FAILURE, payload: err});
    }
  }
}

export const resetDeleteAccountStatus = () => ({type: ActionType.DELETE_ACCOUNT_RESET});
export const deleteAccount = (password: string): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    dispatch({type: ActionType.DELETE_ACCOUNT_RESET});
    dispatch({type: ActionType.DELETE_ACCOUNT_REQUEST});
    try {
      await dao.deleteAccount(password);
      dispatch({type: ActionType.DELETE_ACCOUNT_SUCCESS});
      const newUser = await dao.getUser()
      dispatch(updateUser(newUser));
    } catch(err) {
      dispatch({type: ActionType.DELETE_ACCOUNT_FAILURE, payload: err});
    }
  };
}

export const resetChangePasswordStatus = () => ({type: ActionType.CHANGE_PASSWORD_RESET});
export const changePassword = (oldPassword: string, newPassword: string, newPasswordConfirm: string): ThunkAction<void, void, void, any> => {
  return async dispatch => {

    dispatch({type: ActionType.CHANGE_PASSWORD_RESET});
    dispatch({type: ActionType.CHANGE_PASSWORD_REQUEST});
    
    if (newPassword !== newPasswordConfirm) {
      const err = AuthError.passwordsDoNotMatch;
      dispatch({type: ActionType.CHANGE_PASSWORD_FAILURE, payload: err})
    } else {
      try {
        await dao.changePassword(oldPassword, newPassword);
        dispatch({type: ActionType.CHANGE_PASSWORD_SUCCESS});
        const newUser = await dao.getUser()
        dispatch(updateUser(newUser));
      } catch(err) {
        dispatch({type: ActionType.CHANGE_PASSWORD_FAILURE, payload: err});
      }
    }

  }
}

export const resetChangeEmailStatus = () => ({type: ActionType.CHANGE_EMAIL_RESET});
export const changeEmail = (password: string, newEmail: string): ThunkAction<void, void, void, any> => {
  return async dispatch => {
    dispatch({type: ActionType.CHANGE_EMAIL_RESET});
    dispatch({type: ActionType.CHANGE_EMAIL_REQUEST});
    try {
      await dao.changeEmail(password, newEmail);
      dispatch({type: ActionType.CHANGE_EMAIL_SUCCESS});
      const newUser = await dao.getUser()
      dispatch(updateUser(newUser));
    } catch(err) {
      dispatch({type: ActionType.CHANGE_EMAIL_FAILURE, payload: err});
    }
  }
}
// reducers
// =============
const initialState = {
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
const reducer: Reducer<AppStateAuth, AnyAction> = (state = initialState, action) => {
  switch(action.type) {
    case (ActionType.UPDATE_USER):
      return Object.assign({}, state, {user: action.payload});

    case (ActionType.LOG_IN_RESET):
      return Object.assign({}, state, {logInStatus: null, logInErr: null});
    case(ActionType.LOG_IN_REQUEST):
      return Object.assign({}, state, {logInStatus: 'requested'});
    case(ActionType.LOG_IN_SUCCESS):
      return Object.assign({}, state, {logInStatus: 'success'});
    case(ActionType.LOG_IN_FAILURE):
      return Object.assign({}, state, {logInStatus: 'failure', logInErr: action.payload});

    case (ActionType.LOG_OUT_RESET):
      return Object.assign({}, state, {logOutStatus: null, logOutErr: null});
    case(ActionType.LOG_OUT_REQUEST):
      return Object.assign({}, state, {logOutStatus: 'requested'});
    case(ActionType.LOG_OUT_SUCCESS):
      return Object.assign({}, state, {logOutStatus: 'success'});
    case(ActionType.LOG_OUT_FAILURE):
      return Object.assign({}, state, {logOutStatus: 'failure', logOutErr: action.payload});

    case (ActionType.CREATE_ACCOUNT_RESET):
      return Object.assign({}, state, {createAccountStatus: null, createAccountErr: null});
    case(ActionType.CREATE_ACCOUNT_REQUEST):
      return Object.assign({}, state, {createAccountStatus: 'requested'});
    case(ActionType.CREATE_ACCOUNT_SUCCESS):
      return Object.assign({}, state, {createAccountStatus: 'success'});
    case(ActionType.CREATE_ACCOUNT_FAILURE):
      return Object.assign({}, state, {createAccountStatus: 'failure', createAccountErr: action.payload});

    case (ActionType.SEND_VERIFICATION_EMAIL_RESET):
      return Object.assign({}, state, {sendVerificationEmailStatus: null, sendVerificationEmailErr: null});
    case(ActionType.SEND_VERIFICATION_EMAIL_REQUEST):
      return Object.assign({}, state, {sendVerificationEmailStatus: 'requested'});
    case(ActionType.SEND_VERIFICATION_EMAIL_SUCCESS):
      return Object.assign({}, state, {sendVerificationEmailStatus: 'success'});
    case(ActionType.SEND_VERIFICATION_EMAIL_FAILURE):
      return Object.assign({}, state, {sendVerificationEmailStatus: 'failure', sendVerificationEmailErr: action.payload});

    case (ActionType.CHANGE_EMAIL_RESET):
      return Object.assign({}, state, {changeEmailStatus: null, changeEmailErr: null});
    case(ActionType.CHANGE_EMAIL_REQUEST):
      return Object.assign({}, state, {changeEmailStatus: 'requested'});
    case(ActionType.CHANGE_EMAIL_SUCCESS):
      return Object.assign({}, state, {changeEmailStatus: 'success'});
    case(ActionType.CHANGE_EMAIL_FAILURE):
      return Object.assign({}, state, {changeEmailStatus: 'failure', changeEmailErr: action.payload});

    case (ActionType.CHANGE_PASSWORD_RESET):
      return Object.assign({}, state, {changePasswordStatus: null, changePasswordErr: null});
    case(ActionType.CHANGE_PASSWORD_REQUEST):
      return Object.assign({}, state, {changePasswordStatus: 'requested'});
    case(ActionType.CHANGE_PASSWORD_SUCCESS):
      return Object.assign({}, state, {changePasswordStatus: 'success'});
    case(ActionType.CHANGE_PASSWORD_FAILURE):
      return Object.assign({}, state, {changePasswordStatus: 'failure', changePasswordErr: action.payload});

    case (ActionType.DELETE_ACCOUNT_RESET):
      return Object.assign({}, state, {deleteAccountStatus: null, deleteAccountErr: null});
    case(ActionType.DELETE_ACCOUNT_REQUEST):
      return Object.assign({}, state, {deleteAccountStatus: 'requested'});
    case(ActionType.DELETE_ACCOUNT_SUCCESS):
      return Object.assign({}, state, {deleteAccountStatus: 'success'});
    case(ActionType.DELETE_ACCOUNT_FAILURE):
      return Object.assign({}, state, {deleteAccountStatus: 'failure', deleteAccountErr: action.payload});

    default:
      return state;
  }
}
export default reducer;