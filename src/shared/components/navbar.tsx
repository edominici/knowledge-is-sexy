import * as React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../shared/types';

import defaultUserlogo from '../../shared/images/baseline-account_circle-24px.svg';
import textOnlylogo from '../../shared/images/kis-logo-textonly.svg';

export interface NavbarProps {
  user: User | null
  onSignOutClick: React.MouseEventHandler<HTMLAnchorElement>
  isSigningIn: boolean;
  isSigningOut: boolean;
}
export const Navbar: React.SFC<NavbarProps> = props => {
  
  let navEndMarkup;
  // user is currently being signed out or signed in
  if (props.isSigningIn || props.isSigningOut) {
    navEndMarkup = (
      <div className='navbar-item'>
        <div className='buttons'>
          <Link to='/signin' className='button is-loading is-primary'>
            <strong>Sign up</strong>
          </Link>
          <Link to='/signin' className='button is-loading is-light'>
            Log in
          </Link>
        </div>
      </div>
    );
  // user is not signed in
  } else if (!props.user) {
    navEndMarkup = (
      <div className='navbar-item'>
        <div className='buttons'>
          <Link to='/signin' className='button is-primary'>
            <strong>Sign up</strong>
          </Link>
          <Link to='/signin' className='button is-light'>
            Log in
          </Link>
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
            <Link className='navbar-item' to='/account'>
              My account
            </Link>
            <hr className='navbar-divider' />
            <a 
              className='navbar-item'
              onClick={props.onSignOutClick} 
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