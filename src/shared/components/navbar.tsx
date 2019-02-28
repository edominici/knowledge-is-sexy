import * as React from 'react';

import defaultUserlogo from '../../shared/images/baseline-account_circle-24px.svg';
import textOnlylogo from '../../shared/images/kis-logo-textonly.svg';

// FIXME(mpingram) this is a stub for something that should be in DataAccess
interface User {
  firstname: string,
  lastname: string,
  profileImageURL?: string
}

interface NavbarProps {
  user?: User
  handleSignOutClick?: React.MouseEventHandler<HTMLButtonElement>
  //handleSignInClick: React.MouseEventHandler<HTMLButtonElement>
  //handleCreateAccountClick: React.MouseEventHandler<HTMLButtonElement>
}
export const Navbar: React.SFC<NavbarProps> = props => {
  
  let navEndMarkup;
  if (!props.user) {
    navEndMarkup = (
      <div className='navbar-item'>
        <div className='buttons'>
          <a href='/signin' className='button is-primary'>
            <strong>Sign up</strong>
          </a>
          <a href='/signin' className='button is-light'>
            Log in
          </a>
        </div>
      </div>
    );
  } else {
    navEndMarkup = (
      <div className='navbar-menu'>
        <div className='navbar-item has-dropdown is-hoverable'>

          <div className='navbar-link'>
            <figure style={{margin: '0 0.25em'}} className='image is-rounded' >
              <img 
                style={{width: '32px', height: '32px'}}
                src={props.user.profileImageURL || defaultUserlogo} 
                alt='User profile picture' 
              />
            </figure>

            {props.user.firstname} {props.user.lastname}
          </div>

          <div className='navbar-dropdown'>
            <a className='navbar-item' href='/account'>
              My account
            </a>
            <hr className='navbar-divider' />
            <a className='navbar-item' >
              Sign out
            </a>
          </div>

        </div>
      </div>
    );
  }

  return (
    <nav className='navbar is-gray' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <img src={textOnlylogo} alt='Knowledge is Sexy logo'/>
        </a>

        <a 
          role='button' 
          className='navbar-burger burger' 
          aria-label='menu' 
          aria-expanded='false' 
          data-target='navbarMenu'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>

      </div>

      <div id='navbarMenu' className='navbar-menu'>
        <div className='navbar-start'>
          <a className='navbar-item' href='/'>
            Home
          </a>
          <a className='navbar-item' href='/about'>
            About
          </a>
        </div>

        <div className='navbar-end'>
          {navEndMarkup}
        </div>
      </div>
    </nav>
  )
};

Navbar.defaultProps = {
  user: {
    firstname: 'Greg',
    lastname: 'Jones',
  }
}