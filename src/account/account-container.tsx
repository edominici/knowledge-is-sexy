import { connect } from 'react-redux';

import { Account, AccountProps } from './account';
import { AppState } from '../shared/types';
import { sendVerificationEmail } from '../shared/redux/auth';

const mapStateToProps = (state: AppState): AccountProps => {
  return {
    email: state.auth.user!.email,
    emailVerified: state.auth.user!.emailVerified,
    gender: state.auth.user!.gender,
    orientation: state.auth.user!.orientation,
  } as AccountProps;
}

const mapDispatchToProps = (dispatch: any): AccountProps => {
  return {
    onSendVerificationEmailClick: (ev) => {
      dispatch(sendVerificationEmail())
    } 
  } as AccountProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);