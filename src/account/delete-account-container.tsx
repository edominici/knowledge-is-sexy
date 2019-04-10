import * as React from 'react';

import { DataAccess } from '../shared/data-access';

import { DeleteAccount } from './delete-account';
import { Redirect } from 'react-router';

interface DeleteAccountContainerProps {
  dao: DataAccess
}

interface DeleteAccountContainerState {
  password: string
  passwordErrMsg: string | null
  isSubmitting: boolean

  shouldRedirectToAccount?: boolean
  shouldRedirectToLanding?: boolean
}

export class DeleteAccountContainer extends React.PureComponent<DeleteAccountContainerProps, DeleteAccountContainerState> {

  constructor(props: DeleteAccountContainerProps) {
    super(props);
    this.state = {
      password: '',
      passwordErrMsg: null,
      isSubmitting: false
    }
  }

  render() {

    if (this.state.shouldRedirectToAccount) {
      return <Redirect push to='/account/' />
    } else if (this.state.shouldRedirectToLanding) {
      return <Redirect push to='/' />
    }

    return <DeleteAccount
      passwordValue={this.state.password}
      onPasswordChange={this.handlePasswordChange}
      passwordErrMsg={this.state.passwordErrMsg}
      isSubmitting={this.state.isSubmitting}
      onSubmitClick={this.handleSubmitClick}
      onCancelClick={this.handleCancelClick}
    />
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

    this.props.dao.deleteAccount(this.state.password).then( () => {
      // success
      this.setState({
        isSubmitting: false,
        shouldRedirectToLanding: true
      });

    }).catch( err => {
      // error
      switch(err) {
        case DataAccess.wrongPasswordErr:
          this.setState({
            isSubmitting: false,
            passwordErrMsg: 'The password is incorrect.'
          })
          break;
        case DataAccess.tooManyRequestsErr:
          this.setState({
            isSubmitting: false,
            passwordErrMsg: 'Too many requests. Please wait before trying again.'
          })
          break;
        default:
          this.setState({
            isSubmitting: false,
            passwordErrMsg: err
          });
          break;
      }
    });

  }
  
}