import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

export interface ChangeEmailProps {
  errMsg: string | null
  shouldRedirectToAccount: boolean
  isSubmitting: boolean
  onExit: () => any
  onSubmit: (password: string, newEmail: string) => any
}

interface ChangeEmailState {
  emailValue: string
  passwordValue: string
}

export class ChangeEmail extends React.PureComponent<ChangeEmailProps, ChangeEmailState> {

  constructor(props: ChangeEmailProps) {
    super(props);
    this.state = {
      emailValue: '',
      passwordValue: ''
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
              Change Email
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
        <form className='field' autoComplete='off'>
          {/* New email field */}
          <div className='field'>
            <label className='label'>
              New Email
            </label>
            <div className='control'>
              <input
                className='input'
                type='email'
                autoComplete='off'
                value={this.state.emailValue}
                onChange={this.handleEmailChange}
              />
            </div>
          </div>

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
                value={this.state.passwordValue}
                onChange={this.handlePasswordChange}
              />
            </div>
          </div>
        </form>

        <div className='level is-mobile'>
          <div className='level-left'>
            <div className='field'>
              <div className='control'>
                <Link onClick={this.props.onExit} to='/account/' className='button is-medium is-info is-outlined'>
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

  private handleEmailChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      emailValue: ev.currentTarget.value
    });
  }

  private handlePasswordChange: React.ChangeEventHandler<any> = ev => {
    this.setState({
      passwordValue: ev.currentTarget.value
    });
  }

  private handleSubmitClick: React.MouseEventHandler<any> = ev => {
    this.props.onSubmit(this.state.passwordValue, this.state.emailValue);
  }
}