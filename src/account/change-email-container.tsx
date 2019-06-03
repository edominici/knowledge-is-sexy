import { connect } from 'react-redux';
import { AppState } from '../shared/types';
import { changeEmail, resetChangeEmailStatus } from '../shared/redux/auth';

import { ChangeEmail, ChangeEmailProps} from './change-email';

const mapStateToProps = (state: AppState): Pick<ChangeEmailProps, 'isSubmitting' | 'errMsg' | 'shouldRedirectToAccount'> => {
  return {
    isSubmitting: state.auth.changeEmailStatus === 'requested',
    shouldRedirectToAccount: state.auth.changeEmailStatus === 'success',
    errMsg: state.auth.changeEmailErr,
  }
}

const mapDispatchToProps = (dispatch: any): Pick<ChangeEmailProps, 'onSubmit' | 'onExit'> => {
  return {
    onSubmit: (password, newEmail) => dispatch(changeEmail(password, newEmail)),
    onExit: () => dispatch(resetChangeEmailStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);