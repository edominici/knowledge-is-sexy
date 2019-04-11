import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';

export interface ChangePasswordProps {
  errMsg: string | null
  isSubmitting: boolean
  shouldRedirectToAccount: boolean
  onSubmit: (oldPassword: string, newPassword: string, newPasswordConfirm: string) => any,
  onExit: () => any
}

interface ChangePasswordState {
  oldPasswordValue: string
  newPasswordValue: string
  newPasswordConfirmValue: string
}

export class ChangePassword extends React.PureComponent<ChangePasswordProps, ChangePasswordState> {

  constructor(props: ChangePasswordProps) {
    super(props);
    this.state = {
      oldPasswordValue: '',
      newPasswordValue: '',
      newPasswordConfirmValue: '',
    }
  }

  render() {
    if (this.props.shouldRedirectToAccount) {
      this.props.onExit();
      return <Redirect push to='/account' />
    }

    return (
      <React.Fragment>

      {/* Page header */}
      <section className='hero is-primary is-bold'>
        <div className='hero-body'>
          <div className='container'>
            <h2 className='title is-3 has-text-light'>
              Change Password
            </h2>
          </div>
        </div>
      </section>

      { this.props.errMsg && (
        <div className='notification is-danger'>
          {this.props.errMsg}
        </div>
      )}

      <section className='section'>
        <form className='field' autoComplete='on'>
          {/* Old Password field */}
          <div className='field'>
            <label className='label'>
              Old Password
            </label>
            <div className='control'>
              <input
                className='input'
                type='password'
                autoComplete='current-password'
                value={this.state.oldPasswordValue}
                onChange={this.handleOldPasswordChange}
              />
            </div>
          </div>

          {/* New Password field */}
          <div className='field'>
            <label className='label'>
              New Password
            </label>
            <div className='control'>
              <input
                className='input'
                type='password'
                autoComplete='off'
                value={this.state.newPasswordValue}
                onChange={this.handleNewPasswordChange}
              />
            </div>
          </div>

          {/* Confirm New Password field */}
          <div className='field'>
            <label className='label'>
              Confirm New Password
            </label>
            <div className='control'>
              <input
                className='input'
                type='password'
                autoComplete='off'
                value={this.state.newPasswordConfirmValue}
                onChange={this.handleNewPasswordConfirmChange}
              />
            </div>
          </div>
        </form>

        <div className='level is-mobile'>
          <div className='level-left'>
            <div className='field'>
              <div className='control'>
                <Link to='/account' onClick={this.props.onExit} className='button is-medium is-info is-outlined'>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
          <div className='level-left'>
            <div className='field'>
              <div className='control'>
                <button 
                  onClick={this.handleSubmitClick} 
                  className={`button is-medium is-info ${this.props.isSubmitting ? 'is-loading' : ''}`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </React.Fragment>
    );
  }

  public handleOldPasswordChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      oldPasswordValue: ev.currentTarget.value
    });
  }

  public handleNewPasswordChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      newPasswordValue: ev.currentTarget.value
    });
  }

  public handleNewPasswordConfirmChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      newPasswordConfirmValue: ev.currentTarget.value
    });
  }

  public handleSubmitClick: React.MouseEventHandler<any> = ev => {
    this.props.onSubmit(
      this.state.oldPasswordValue, 
      this.state.newPasswordValue, 
      this.state.newPasswordConfirmValue
    );
  }
}