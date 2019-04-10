import * as React from 'react';

interface DeleteAccountProps {
  passwordValue: string
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>
  passwordErrMsg: string | null
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>
  isSubmitting: boolean
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>
}

interface DeleteAccountState {
  confirmDeleteAccount: boolean
}

export class DeleteAccount extends React.PureComponent<DeleteAccountProps, DeleteAccountState> {

  constructor(props: DeleteAccountProps) {
    super(props);
    this.state = {
      confirmDeleteAccount: false
    }
  }

  render() {
    return (
      <React.Fragment>

      {/* Page header */}
      <section className='hero is-info is-bold'>
        <div className='hero-body'>
          <div className='container'>
            <h2 className='title is-3 has-text-light'>
              Delete Account
            </h2>
          </div>
        </div>
      </section>

      <section className='section'>

        <div className='message is-warning'>

          <div className='message-header'>
            <span>
              <i className='fas fa-exclamation-triangle' />
              <span style={{marginLeft: '0.5rem'}}>Are you sure?</span>
            </span>
          </div>

          <div className='message-body'>

            <div className='content'>
              <p>
                Are you sure you want to delete your account? All of your account data, such as your email and password, will be removed from our servers.
              </p>
              <p>
                <b>The questions you asked and answers you gave will still be visible on the website, but they will not be associated with your deleted account.</b>
              </p>
              <p>
                Deleting your account is not reversible.
              </p>
            </div>

            <div className='box has-background-dark has-text-light'>
              <input 
                checked={this.state.confirmDeleteAccount}
                onChange={this.handleConfirmChange}
                type='checkbox' 
              />
              <span onClick={this.handleConfirmTextClick} style={{marginLeft: '0.5rem'}}>Yes, I'm sure that I want to delete my account.</span>
            </div>
          </div>

        </div>

        <h5 className='title is-6'>Please enter your password to continue.</h5>
        <h5 className='subtitle is-6'>Your account will be deleted and you will be signed out.</h5>
        <form className='field' autoComplete='off'>
          {/* Password field */}
          <div className='field'>
            <label className='label'>
              Password
            </label>
            <div className='control'>
              <input
                className='input'
                type='password'
                autoComplete='current-password'
                value={this.props.passwordValue}
                onChange={this.props.onPasswordChange}
              />
            </div>
            { this.props.passwordErrMsg && (
              <p className='help is-danger'>{this.props.passwordErrMsg}</p>
            )}
          </div>
        </form>

        <div className='level is-mobile'>
          <div className='level-left'>
            <div className='field'>
              <div className='control'>
                <button onClick={this.props.onCancelClick} className='button is-medium is-info is-outlined'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className='level-left'>
            <div className='field'>
              <div className='control'>
                <button 
                  onClick={this.handleSubmitClick} 
                  className={`button is-medium is-info ${this.state.confirmDeleteAccount ? '' : 'is-static'} ${this.props.isSubmitting ? 'is-loading' : ''}`}
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

  private handleConfirmChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      confirmDeleteAccount: !this.state.confirmDeleteAccount
    });
  }

  private handleConfirmTextClick: React.MouseEventHandler<any> = ev => {
    this.setState({
      confirmDeleteAccount: !this.state.confirmDeleteAccount
    });
  }

  private handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = ev => {
    if (this.state.confirmDeleteAccount) {
      this.props.onSubmitClick(ev);
    }
  }
}