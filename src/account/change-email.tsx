import * as React from 'react';

interface ChangeEmailProps {
  emailValue: string
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>
  passwordValue: string
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>
  emailErrMsg: string | null
  passwordErrMsg: string | null
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>
  isSubmitting: boolean
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ChangeEmail: React.SFC<ChangeEmailProps> = props => {
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
              value={props.emailValue}
              onChange={props.onEmailChange}
            />
          </div>
          { props.emailErrMsg && (
            <p className='help is-danger'>{props.emailErrMsg}</p>
          )}
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
              value={props.passwordValue}
              onChange={props.onPasswordChange}
            />
          </div>
          { props.passwordErrMsg && (
            <p className='help is-danger'>{props.passwordErrMsg}</p>
          )}
        </div>
      </form>

      <div className='level is-mobile'>
        <div className='level-left'>
          <div className='field'>
            <div className='control'>
              <button onClick={props.onCancelClick} className='button is-medium is-info is-outlined'>
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className='level-left'>
          <div className='field'>
            <div className='control'>
              <button 
                onClick={props.onSubmitClick} 
                className={`button is-medium is-info ${props.isSubmitting ? 'is-loading' : ''}`}
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