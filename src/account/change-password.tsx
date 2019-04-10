import * as React from 'react';

interface ChangePasswordProps {
  oldPasswordValue: string
  onOldPasswordChange: React.ChangeEventHandler<HTMLInputElement>
  newPasswordValue: string
  onNewPasswordChange: React.ChangeEventHandler<HTMLInputElement>
  newPasswordConfirmValue: string
  onNewPasswordConfirmChange: React.ChangeEventHandler<HTMLInputElement>

  oldPasswordErrMsg: string | null
  newPasswordErrMsg: string | null
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>
  isSubmitting: boolean
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ChangePassword: React.SFC<ChangePasswordProps> = props => {
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
              value={props.oldPasswordValue}
              onChange={props.onOldPasswordChange}
            />
          </div>
          { props.oldPasswordErrMsg && (
            <p className='help is-danger'>{props.oldPasswordErrMsg}</p>
          )}
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
              value={props.newPasswordValue}
              onChange={props.onNewPasswordChange}
            />
          </div>
          { props.newPasswordErrMsg && (
            <p className='help is-danger'>{props.newPasswordErrMsg}</p>
          )}
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
              value={props.newPasswordConfirmValue}
              onChange={props.onNewPasswordConfirmChange}
            />
          </div>
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