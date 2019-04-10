import * as React from 'react';
import { Redirect } from 'react-router';

import { DataAccess } from '../shared/data-access';

import { User } from '../shared/types';

import { Account } from './account';

interface AccountContainerProps {
  dao: DataAccess
}

interface AccountContainerState {
  isLoading: boolean
  user: User | null

  emailVerificationStatus?: 'sending' | 'success' | 'error'
  emailVerificationErrMsg?: string

  deleteAccountStatus?: 'sending' | 'success' | 'error'
  deleteAccountErrMsg?: string

  passwordChangeStatus?: 'sending' | 'success' | 'error'
  passwordChangeErrMsg?: string

  emailChangeStatus?: 'sending' | 'success' | 'error'
  emailChangeErrMsg?: string

  shouldRedirectToLanding?: boolean
  shouldRedirectToAccount?: boolean
  shouldRedirectToChangeEmail?: boolean
  shouldRedirectToChangePassword?: boolean
  shouldRedirectToDeleteAccount?: boolean
}

export class AccountContainer extends React.PureComponent<AccountContainerProps, AccountContainerState> {
  constructor(props: AccountContainerProps) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
    }
  }

  componentDidMount() {
    this.props.dao.getUser().then( user => {
      this.setState({
        user: user,
        isLoading: false,
      });
    });
  }

  render() {
    if (this.state.shouldRedirectToLanding) {
      return <Redirect push to='/' />
    } else if (this.state.shouldRedirectToChangeEmail) {
      return <Redirect push to='/account/change-email' />
    } else if (this.state.shouldRedirectToChangePassword) {
      return <Redirect push to='/account/change-password' />
    } else if (this.state.shouldRedirectToDeleteAccount) {
      return <Redirect push to='/account/delete-account' />

    } else if (this.state.isLoading) {
      return <div>FIXME: add a loading screen</div>
    } else if (this.state.user === null) {
      return <Redirect push to={{
          pathname: '/signin',
          state:  { next: '/account' }
        }}
      />
    } else {
      return (
        <Account
          email={this.state.user!.email}
          emailVerified={this.state.user!.emailVerified}

          gender={this.state.user!.gender}
          orientation={this.state.user!.orientation}
          onGenderChange={this.handleGenderChange}
          onOrientationChange={this.handleOrientationChange}

          onSendVerificationEmailClick={this.handleSendVerificationEmailClick}

          onChangeEmailClick={this.handleChangeEmailClick}
          onChangePasswordClick={this.handleChangePasswordClick}
          onDeleteAccountClick={this.handleDeleteAccountClick}
        />
      );
    }
  }

  private handleGenderChange = () => {
    console.warn('handleGenderChange not implemented');
  }

  private handleOrientationChange = () => {
    console.warn('handleOrientationChange not implemented');
  }

  private handleChangeEmailClick = () => {
    this.setState({
      shouldRedirectToChangeEmail: true
    })
  }

  private handleChangePasswordClick = () => {
    this.setState({
      shouldRedirectToChangePassword: true
    })
  }

  private handleDeleteAccountClick = () => {
    this.setState({
      shouldRedirectToDeleteAccount: true
    })
  }

  private handleSendVerificationEmailClick = () => {
    this.setState({
      emailVerificationStatus: 'sending'
    })
    this.props.dao.sendVerificationEmail().then( res => {
      this.setState({
        emailVerificationStatus: 'success'
      })
    }).catch( err => {
      this.setState({
        emailVerificationStatus: 'error',
        emailVerificationErrMsg: err
      })
    });
  }

}
