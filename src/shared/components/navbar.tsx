import * as React from 'react';

import { User } from '../../shared/types';

import defaultUserlogo from '../../shared/images/baseline-account_circle-24px.svg';
import textOnlylogo from '../../shared/images/kis-logo-textonly.svg';

interface NavbarProps {
  user?: User
  handleSignOutClick?: React.MouseEventHandler<HTMLAnchorElement>
  signInTransition?: boolean;
  //handleSignInClick: React.MouseEventHandler<HTMLButtonElement>
  //handleCreateAccountClick: React.MouseEventHandler<HTMLButtonElement>
}
export const Navbar: React.SFC<NavbarProps> = props => {
  
  let navEndMarkup;
  // user is currently being signed out or signed in
  if (props.signInTransition) {
    navEndMarkup = (
      <div className='navbar-item'>
        <div className='buttons'>
          <a href='/signin' className='button is-loading is-primary'>
            <strong>Sign up</strong>
          </a>
          <a href='/signin' className='button is-loading is-light'>
            Log in
          </a>
        </div>
      </div>
    );
  // user is not signed in
  } else if (!props.user) {
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
  // user is signed in
  } else {
    navEndMarkup = (
      <div className='navbar-menu'>
        <div className='navbar-item has-dropdown is-hoverable'>

          <div className='navbar-link'>
            <figure style={{margin: '0 0.25em'}} className='image is-rounded' >
              <img 
                style={{width: '32px', height: '32px'}}
                src={props.user.photoURL || defaultUserlogo} 
                alt='User profile picture' 
              />
            </figure>

            {props.user.displayName}
          </div>

          <div className='navbar-dropdown'>
            <a className='navbar-item' href='/account'>
              My account
            </a>
            <hr className='navbar-divider' />
            <a 
              className='navbar-item'
              onClick={props.handleSignOutClick} 
            >
              Sign out
            </a>
          </div>

        </div>
      </div>
    );
  }

  return (
    <nav className='navbar is-fixed-top is-gray' role='navigation' aria-label='main navigation'>
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