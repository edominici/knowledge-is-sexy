import * as React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../shared/types';

import textOnlylogo from '../../shared/images/kis-logo-textonly.svg';

export interface NavbarProps {
  user: User | null
  onSignOutClick: React.MouseEventHandler<HTMLAnchorElement>
  isSigningIn: boolean;
  isSigningOut: boolean;
}

export interface NavbarState {
  dropdownActive: boolean;
}

export class Navbar extends React.PureComponent<NavbarProps, NavbarState> {

  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      dropdownActive: false
    }
  }

  public render() {
    let navEndMarkup;
    // user is currently being signed out or signed in
    if (this.props.isSigningIn || this.props.isSigningOut) {
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
    } else if (!this.props.user) {
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
        <div className='navbar-item has-dropdown is-hoverable'>

          <div className='navbar-link'>
              <span className='icon'><i className='fas fa-user-circle' /></span>
              <span style={{verticalAlign: 'text-bottom'}}>{this.props.user.displayName}</span>
          </div>

          <div className='navbar-dropdown'>
            <Link className='navbar-item' to='/account'>
              <span className='icon'><i className='fas fa-cog' /></span>
              <span style={{verticalAlign: 'text-bottom'}}>My account</span>
            </Link>
            <hr className='navbar-divider' />
            <a 
              className='navbar-item'
              onClick={this.props.onSignOutClick} 
            >
              <span className='icon'><i className='fas fa-sign-out-alt' /></span>
              <span style={{verticalAlign: 'text-bottom'}}>Sign Out</span>
            </a>
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
            onClick={this.handleBurgerClick}
            className={`navbar-burger burger ${this.state.dropdownActive ? 'is-active' : ''}`} 
            aria-label='menu' 
            aria-expanded='false' 
            data-target='navbarMenu'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>

        </div>

        <div 
          id='navbarMenu' 
          className={`navbar-menu ${this.state.dropdownActive ? 'is-active' : ''}`}
        >
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
  }

  private handleBurgerClick: React.MouseEventHandler<HTMLAnchorElement> = ev => {
    this.setState({
      dropdownActive: !this.state.dropdownActive
    });
  }

};