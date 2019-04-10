import { User } from './user';

export interface AppState {
  auth: {
    user: User | null

    logInStatus: 'requested' | 'success' | 'failure' | null
    logInErr: string | null

    logOutStatus: 'requested' | 'success' | 'failure' | null
    logOutErr: string | null

    createAccountStatus: 'requested' | 'success' | 'failure' | null
    createAccountErr: string | null

    sendVerificationEmailStatus: 'requested' | 'success' | 'failure' | null
    sendVerificationEmailErr: string | null

    changeEmailStatus: 'requested' | 'success' | 'failure' | null
    changeEmailErr: string | null

    changePasswordStatus: 'requested' | 'success' | 'failure' | null
    changePasswordErr: string | null

    deleteAccountStatus: 'requested' | 'success' | 'failure' | null
    deleteAccountErr: string | null

  }
}