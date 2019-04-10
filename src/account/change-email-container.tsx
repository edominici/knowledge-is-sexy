import * as React from 'react';

import { DataAccess } from '../shared/data-access';

import { ChangeEmail } from './change-email';
import { Redirect } from 'react-router';

interface ChangeEmailContainerProps {
  dao: DataAccess
}

interface ChangeEmailContainerState {
  newEmail: string
  password: string
  emailErrMsg: string | null
  passwordErrMsg: string | null
  isSubmitting: boolean

  shouldRedirectToAccount: boolean

}

export class ChangeEmailContainer extends React.PureComponent<ChangeEmailContainerProps, ChangeEmailContainerState> {

  constructor(props: ChangeEmailContainerProps) {
    super(props);
    this.state = {
      newEmail: '',
      password: '',
      shouldRedirectToAccount: false,
      emailErrMsg: null,
      passwordErrMsg: null,
      isSubmitting: false
    }
  }

  render() {
    if (this.state.shouldRedirectToAccount) {
      return <Redirect push to='/account/' />
    }

    return <ChangeEmail
      emailValue={this.state.newEmail}
      passwordValue={this.state.password}
      onEmailChange={this.handleEmailChange}
      onPasswordChange={this.handlePasswordChange}
      emailErrMsg={this.state.emailErrMsg}
      passwordErrMsg={this.state.passwordErrMsg}
      isSubmitting={this.state.isSubmitting}
      onSubmitClick={this.handleSubmitClick}
      onCancelClick={this.handleCancelClick}
    />
  }

  private handleEmailChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      newEmail: ev.currentTarget.value
    });
  }

  private handlePasswordChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      password: ev.currentTarget.value
    })
  }

  private handleCancelClick: React.MouseEventHandler<any> = ev => {
    this.setState({
      shouldRedirectToAccount: true
    })
  }

  private handleSubmitClick: React.MouseEventHandler<any> = ev => {

    this.setState({
      isSubmitting: true
    });

    this.props.dao.changeEmail(this.state.password, this.state.newEmail).then( () => {
      // success
      this.setState({
        isSubmitting: false,
        shouldRedirectToAccount: true
      });

    }).catch( err => {
      // error
      switch(err) {
        case DataAccess.emailAlreadyInUseErr:
          this.setState({
            isSubmitting: false,
            emailErrMsg: 'This email is already in use by a different account.'
          });
          break;
        case DataAccess.invalidEmailErr:
          this.setState({
            isSubmitting: false,
            emailErrMsg: 'The email is not valid.'
          });
          break;
        case DataAccess.wrongPasswordErr:
          this.setState({
            isSubmitting: false,
            passwordErrMsg: 'The password is incorrect.'
          })
          break;
        case DataAccess.tooManyRequestsErr:
          this.setState({
            isSubmitting: false,
            emailErrMsg: 'Too many requests. Please wait before trying again.'
          })
          break;
        default:
          this.setState({
            isSubmitting: false,
            emailErrMsg: err
          });
          break;
      }
    });

  }
  
}