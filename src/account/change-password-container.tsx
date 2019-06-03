import { connect } from 'react-redux';
import { AppState } from '../shared/types';
import { changePassword, resetChangePasswordStatus } from '../shared/redux/auth';

import { ChangePassword, ChangePasswordProps} from './change-password';

const mapStateToProps = (state: AppState): Pick<ChangePasswordProps, 'isSubmitting' | 'errMsg' | 'shouldRedirectToAccount'> => {
  return {
    isSubmitting: state.auth.changePasswordStatus === 'requested',
    shouldRedirectToAccount: state.auth.changePasswordStatus === 'success',
    errMsg: state.auth.changePasswordErr,
  }
}

const mapDispatchToProps = (dispatch: any): Pick<ChangePasswordProps, 'onSubmit' | 'onExit'> => {
  return {
    onSubmit: (oldPassword, newPassword, newPasswordConfirm) => {
      dispatch(changePassword(oldPassword, newPassword, newPasswordConfirm))
    },
    onExit: () => dispatch(resetChangePasswordStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);