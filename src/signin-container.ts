import { connect } from 'react-redux';
import { DataAccess } from './shared/data-access';
const dao = DataAccess.getInstance();

import { SignIn, SignInProps } from './signin';
import { updateUser } from './shared/redux/auth';

const mapDispatchToProps = (dispatch: any): SignInProps => {
  return {
    onSignInSuccess: () => {
      dao.getUser().then( user => {
        dispatch(updateUser(user));
      });
    }
  }
}

export default connect(null, mapDispatchToProps)(SignIn);