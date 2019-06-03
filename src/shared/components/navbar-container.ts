import { connect } from 'react-redux';

import { AppState } from '../../shared/types';

import { Navbar, NavbarProps } from './navbar';

import { logOut } from '../../shared/redux/auth';

const mapStateToProps = (state: AppState): NavbarProps => {
  return {
    isSigningIn: state.auth.logInStatus === 'requested',
    isSigningOut: state.auth.logOutStatus === 'requested',
    user: state.auth.user
  } as NavbarProps;
}

const mapDispatchToProps = (dispatch: any): NavbarProps => {
  return {
    onSignOutClick: (ev) => {
      dispatch(logOut())
    } 
  } as NavbarProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);