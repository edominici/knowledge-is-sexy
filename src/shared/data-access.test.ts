import { DataAccess } from './data-access';

// This test battery is highly coupled to the firebase APIs.
describe('auth methods', () => {
  describe('logIn', () => {
    //it('should call the firebase log in with email api method', () => {});
    it('should succeed if user email and password are correct', () => {});
    it('should fail with invalidEmailErr if email is invalid', () => {})
    it('should fail with userDisabledErr if user account has been disabled', () => {})
    it('should fail with invalidEmailErr if email does not match a user account', () => {})
    it('should fail with wrongPasswordErr if password is incorrect', () => {})
    it('should fail with networkFailedErr if request fails due to network timeout', () => {});
  });
  describe('logOut', () => {
    //it('should call the firebase log out api method', () => {});
    it('should fail with userNotLoggedInErr if user is not logged in', () => {});
    it('should fail with networkFailedErr if request fails due to network timeout', () => {});
  });
  describe('createAccount', () => {
    //it('should call the firebase createUserWithEmailAndPassword api method', () => {});
    it('should succeed if email is not taken and password is strong', () => {});
    it('should fail with emailAlreadyInUseErr if email is already in use', () => {});
    it('should fail with invalidEmailErr if email is invalid', () => {});
    it('should fail with weakPasswordError if password is weak', () => {});
    it('should fail with networkFailedErr if request fails due to network timeout', () => {});
  });
  describe('deleteAccount', () => {
    // NOTE(mpingram) - possibility of race conditions, ie if logOut() is called while request is processing?
    //it('should call the firebase user.delete api method', () => {});
    it('should fail with userNotLoggedInErr if user is not logged in', () => {});
    it('should fail with wrongPasswordErr if password is incorrect', () => {});
    it('should fail with networkFailedErr if request fails due to network timeout', () => {});
  });
  describe('changePassword', () => {
    it('should succeed if password matches current logged-in user\'s password', () => { });
    it('should fail with userNotLoggedInErr if user is not logged in', () => { });
    it('should fail with weakPasswordErr if new password is weak', () => { });
    it('should fail with networkFailedErr if request fails due to network timeout', () => {});
  });
  describe('changeEmail', () => {
    it('should succeed if password matches current logged-in user\'s password', () => { });
    it('should fail with userNotLoggedInErr if user is not logged in', () => { });
    it('should fail with emailAlreadyInUseErr if email is already in use', () => { });
    it('should fail with invalidEmailErr if new email is not a valid email', () => { });
    it('should fail with networkFailedErr if request fails due to network timeout', () => {});
  });
});