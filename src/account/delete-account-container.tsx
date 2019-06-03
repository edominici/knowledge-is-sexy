import { connect } from 'react-redux';
import { AppState } from '../shared/types';
import { deleteAccount, resetDeleteAccountStatus } from '../shared/redux/auth';

import { DeleteAccount, DeleteAccountProps} from './delete-account';

const mapStateToProps = (state: AppState): Pick<DeleteAccountProps, 'isSubmitting' | 'errMsg' | 'shouldRedirectToLanding'> => {
  return {
    isSubmitting: state.auth.deleteAccountStatus === 'requested',
    shouldRedirectToLanding: state.auth.deleteAccountStatus === 'success',
    errMsg: state.auth.deleteAccountErr,
  }
}

const mapDispatchToProps = (dispatch: any): Pick<DeleteAccountProps, 'onSubmit' | 'onExit'> => {
  return {
    onSubmit: (password) => dispatch(deleteAccount(password)),
    onExit: () => dispatch(resetDeleteAccountStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);