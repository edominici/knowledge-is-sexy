import * as React from 'react';

import { DataAccess } from '../shared/data-access';

import { ChangePassword } from './change-password';
import { Redirect } from 'react-router';

interface ChangePasswordContainerProps {
  dao: DataAccess
}

interface ChangePasswordContainerState {
  oldPassword: string
  newPassword: string
  newPasswordConfirm: string
  oldPasswordErrMsg: string | null
  newPasswordErrMsg: string | null
  isSubmitting: boolean

  shouldRedirectToAccount: boolean
}

export class ChangePasswordContainer extends React.PureComponent<ChangePasswordContainerProps, ChangePasswordContainerState> {

  constructor(props: ChangePasswordContainerProps) {
    super(props);
    this.state = {
      newPassword: '',
      oldPassword: '',
      newPasswordConfirm: '',
      shouldRedirectToAccount: false,
      oldPasswordErrMsg: null,
      newPasswordErrMsg: null,
      isSubmitting: false
    }
  }

  render() {
    if (this.state.shouldRedirectToAccount) {
      return <Redirect push to='/account/' />
    }

    return <ChangePassword
      oldPasswordValue={this.state.oldPassword}
      newPasswordValue={this.state.newPassword}
      newPasswordConfirmValue={this.state.newPasswordConfirm}
      onOldPasswordChange={this.handleOldPasswordChange}
      onNewPasswordChange={this.handleNewPasswordChange}
      onNewPasswordConfirmChange={this.handleNewPasswordConfirmChange}

      oldPasswordErrMsg={this.state.oldPasswordErrMsg}
      newPasswordErrMsg={this.state.newPasswordErrMsg}

      isSubmitting={this.state.isSubmitting}
      onSubmitClick={this.handleSubmitClick}
      onCancelClick={this.handleCancelClick}
    />
  }

  private handleOldPasswordChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      oldPassword: ev.currentTarget.value
    });
  }

  private handleNewPasswordChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      newPassword: ev.currentTarget.value
    });
  }

  private handleNewPasswordConfirmChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      newPasswordConfirm: ev.currentTarget.value
    });
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

    if (this.state.newPassword !== this.state.newPasswordConfirm) {
      this.setState({
        isSubmitting: false,
        newPasswordErrMsg: 'New passwords do not match.'
      })
    }

    this.props.dao.changePassword(this.state.oldPassword, this.state.newPassword).then( () => {
      // success
      this.setState({
        isSubmitting: false,
        shouldRedirectToAccount: true
      });

    }).catch( err => {
      // error
      switch(err) {
        case DataAccess.weakPasswordErr:
          this.setState({
            isSubmitting: false,
            newPasswordErrMsg: 'This password is too weak. For your security, use a stronger password.'
          });
          break;
        case DataAccess.wrongPasswordErr:
          this.setState({
            isSubmitting: false,
            oldPasswordErrMsg: 'The password is incorrect.'
          })
          break;
        case DataAccess.tooManyRequestsErr:
          this.setState({
            isSubmitting: false,
            newPasswordErrMsg: 'Too many requests. Please wait before trying again.'
          })
          break;
        default:
          this.setState({
            isSubmitting: false,
            newPasswordErrMsg: err
          });
          break;
      }
    });

  }
  
}