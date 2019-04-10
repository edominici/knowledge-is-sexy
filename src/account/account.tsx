import * as React from 'react';

import { Gender, Orientation } from '../shared/enums';

interface AccountProps {
  email: string
  emailVerified: boolean
  verificationEmailStatus?: 'sending' | 'sent' | 'error'

  gender: Gender
  orientation: Orientation
  onGenderChange: React.EventHandler<any>
  onOrientationChange: React.EventHandler<any>

  onSendVerificationEmailClick: React.EventHandler<any>

  onChangeEmailClick: React.MouseEventHandler<any>
  onChangePasswordClick: React.MouseEventHandler<any>
  onDeleteAccountClick: React.MouseEventHandler<any>

}

const MOCK_PASSWORD = 'this-is-not-your-password';

const AccountBox: React.SFC<{title?: string}> = props => {
  return <div className='box'>
    {props.title &&
      <React.Fragment>
        <h4 className='subtitle is-5'>{props.title}</h4>
        <hr />
      </React.Fragment>
    }
    {props.children}
  </div>
}

export const Account: React.SFC<AccountProps> = props => {
  return (<React.Fragment>

    {/* Page header */}
    <section className='hero is-primary is-bold'>
      <div className='hero-body'>
        <div className='container'>
          <h2 className='title is-3 has-text-light has-text'>
            My Account
          </h2>
        </div>
      </div>
    </section>

    {/* Page content */}
    <section className='section'>
      <AccountBox title='Account Info'>

        {/* User email field */}
        <div className='field'>
          <label className='label'>
            <span style={{marginRight: '0.5rem'}}>Email</span>
            {/* Email not verified warning */}
            { !props.emailVerified && (
              <React.Fragment>
                <span className='tag is-warning'>
                  <span className='icon is-small'>
                    <i className='fas fa-exclamation-triangle' />
                  </span>
                  <span>
                    Not verified
                  </span>
                </span>
                <button 
                  className={`button is-text is-small is-inverted ${props.verificationEmailStatus === 'sending' && 'is-loading'} ${props.verificationEmailStatus === 'sent' && 'is-disabled'}`}
                  onClick={props.onSendVerificationEmailClick}
                >
                  <span>{props.verificationEmailStatus === 'sent' ? 'Email sent.' : 'Resend Verification Email'}</span>
                </button>
              </React.Fragment>
            )}
          </label>

          <div className='field has-addons'>
            <div className='control'>
              <input 
                readOnly
                value={props.email} 
                className='input is-static'
                type='text' 
              />
            </div>
            <div className='control'>
                <button 
                  className='button is-text'
                  onClick={props.onChangeEmailClick}
                >
                  <i className='fas fa-edit' />
                </button>
            </div>
          </div>
        </div>

        {/* User password field */}
        <div className='field'>
          <label className='label'>
            <span>Password</span>
          </label>

          <div className='field has-addons'>
            <div className='control'>
              <input 
                style={{filter: 'blur(4px)'}}
                readOnly
                value={MOCK_PASSWORD}
                className='input is-static'
                type='text' 
              />
            </div>
            <div className='control'>
                <button 
                  className='button is-text'
                  onClick={props.onChangePasswordClick}
                >
                  <i className='fas fa-edit' />
                </button>
            </div>
          </div>
        </div>

      </AccountBox>

      <AccountBox title='My Questions' >
        <div className='container'>
          <p>
            You haven't asked any questions yet!
          </p>
        </div>
      </AccountBox>
      
      <AccountBox title='My Answers' >
        <div className='container'>
          <p>
            You haven't answered any questions yet!
          </p>
        </div>
      </AccountBox>

      <div className='level'>
        <div className='level-item field'>
          <div className='control'>
            <button 
              onClick={props.onDeleteAccountClick} 
              className='button is-text has-text-info'
            >
              <span>Delete my account</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  </React.Fragment>)
}
