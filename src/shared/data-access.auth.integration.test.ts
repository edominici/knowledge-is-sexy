import { DataAccess } from './data-access';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

// This is an integration test between the app's data access object and a real development
// firebase database.
const serviceAccount = require('../../knowledge-is-sexy-dev-firebase-adminsdk-co3bq-fabb351a11.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://knowledge-is-sexy-dev.firebaseio.com"
});

const devConfig = {
  apiKey: "AIzaSyBznW6rIzvlkvKbXZwhsvou73o9wTVBcBE",
  authDomain: "knowledge-is-sexy-dev.firebaseapp.com",
  databaseURL: "https://knowledge-is-sexy-dev.firebaseio.com",
  projectId: "knowledge-is-sexy-dev",
  storageBucket: "knowledge-is-sexy-dev.appspot.com",
  messagingSenderId: "414717777906"
};
firebase.initializeApp(devConfig);

const TEST_UID_A = '0';
const TEST_EMAIL_A = 'yavuvik@freehotmail.net';
const TEST_PASSWORD_A = 'asdlkfjasldkfjas';

const TEST_UID_B = '1';
const TEST_EMAIL_B = 'voloyeve@freehotmail.net';
const TEST_PASSWORD_B = 'asdlkfjasldkfjas';

const MOCK_USER_A = {
  uid: TEST_UID_A,
  email: TEST_EMAIL_A,
  password: TEST_PASSWORD_A,
  emailVerified: true
};

const MOCK_USER_B = {
  uid: TEST_UID_B,
  email: TEST_EMAIL_B,
  password: TEST_PASSWORD_B,
  emailVerified: true
}

const createMockUsers = (...users: any[]): Promise<any> => {
  return Promise.all( 
    users.map( user => admin.auth().createUser(user) )
  );
};

const cleanupMockUsers = (...users: any[]): Promise<any> => {
  return Promise.all( 
    users.map( user => admin.auth().deleteUser(user.uid) )
  );
};

jest.setTimeout(10000); // 10 seconds

describe('auth methods', () => {

  const dao = DataAccess.initialize(firebase.auth, firebase.auth.EmailAuthProvider.credential);

  describe('logIn', () => {

    beforeAll( done => {
      createMockUsers(MOCK_USER_A, MOCK_USER_B).then( () => {
        done();
      });
    });

    afterAll( done => {
      cleanupMockUsers(MOCK_USER_A, MOCK_USER_B).then( () => {
        done();
      });
    });

    it('should succeed if user email and password are correct', async () => {
      expect.assertions(2);
      // should resolve a Promise<void>
      const nothing = await dao.logIn(TEST_EMAIL_A, TEST_PASSWORD_A);
      expect(nothing).toBeUndefined();

      // expect User A to be signed in once promise completes
      expect(firebase.auth().currentUser).toHaveProperty('uid', MOCK_USER_A.uid);
    });

    it('should log out the previous user if a user was already signed in', async () => {
      expect.assertions(2);
      // SETUP
      // log someone in
      await dao.logIn(TEST_EMAIL_A, TEST_PASSWORD_A);

      // TEST
      // log someone new in
      const result = await dao.logIn(TEST_EMAIL_B, TEST_PASSWORD_B);
      expect(result).toBeUndefined();

      // expect user B to be signed in, not user A
      expect(firebase.auth().currentUser).toHaveProperty('uid', MOCK_USER_B.uid);
    });

    it('should fail with invalidEmailErr if email is invalid', () => {
      const badEmail = 'notemail';
      return expect(dao.logIn(badEmail, TEST_PASSWORD_A)).rejects.toBe(DataAccess.invalidEmailErr);
    });

    it('should fail with userNotFoundErr if email does not match a user account', () => {
      const wrongEmail = 'jsmith@example.com';
      return expect(dao.logIn(wrongEmail, TEST_PASSWORD_A)).rejects.toBe(DataAccess.userNotFoundErr);
    });

    it('should fail with wrongPasswordErr if password is incorrect', () => {
      const wrongPassword = 'hunter2';
      return expect(dao.logIn(TEST_EMAIL_A, wrongPassword)).rejects.toBe(DataAccess.wrongPasswordErr);
    });

    it('should fail with userDisabledErr if user account has been disabled', async () => {
      expect.assertions(1);
      await admin.auth().updateUser(TEST_UID_A, {disabled: true});
      try {
        await dao.logIn(TEST_EMAIL_A, TEST_PASSWORD_A);
      } catch(e) {
        expect(e).toEqual(DataAccess.userDisabledErr);
      }
      await admin.auth().updateUser(TEST_UID_A, {disabled: false});
    });
  });

  describe('logOut', () => {

    beforeAll( done => {
      createMockUsers(MOCK_USER_A).then( () => {
        done();
      });
    });

    afterAll( done => {
      cleanupMockUsers(MOCK_USER_A).then( () => {
        done();
      });
    });

    it('should succeed if user is logged in', async () => {
      expect.assertions(2);
      // SETUP: try to sign in User A
      try {
        await dao.logIn(MOCK_USER_A.email, MOCK_USER_A.password);
      } catch(err) {
        fail(err);
      }
      // END SETUP

      // try to sign out User A
      const nothing = await dao.logOut();
      expect(nothing).toBeUndefined();

      // expect current user to be null
      expect(firebase.auth().currentUser).toBeNull();
    });

    it('should do nothing if user is not logged in', async () => {
      expect.assertions(1);

      // SETUP: make sure no one is logged in
      const currentUser = firebase.auth().currentUser;
      if (currentUser !== null) {
        fail(`SETUP FAILURE: user is signed in:\n${JSON.stringify(currentUser)}`);
      }
      // END SETUP
      
      const result = await dao.logOut();
      expect(result).toBeUndefined();
    });
  });

  describe('createAccount', () => {

    it('should succeed if email is not taken and password is strong', async () => {
      expect.assertions(2);

      try {
        // expect operation to resolve
        const result = await dao.createAccount(TEST_EMAIL_A, TEST_PASSWORD_A);
        expect(result).toBe(undefined);

        // expect to find a user with this email in our db
        const user = await admin.auth().getUserByEmail(TEST_EMAIL_A);
        expect(user).not.toBeNull();
      } catch(err) {
        fail(err);
      } finally {

        // TEARDOWN
        // delete the account we just made
        const user = await admin.auth().getUserByEmail(TEST_EMAIL_A);
        await admin.auth().deleteUser(user.uid);
      }
    });

    it('should automatically sign in a user if account creation is successful', async () => {
      expect.assertions(1);
      
      // TEST
      try {
        await dao.createAccount(TEST_EMAIL_A, TEST_PASSWORD_A);
        // expect current signed-in user to be this user
        expect(firebase.auth().currentUser).toHaveProperty('email', TEST_EMAIL_A);
      } catch(err) {
        fail(err);
      } finally {

        // TEARDOWN
        // delete the account we just made
        const user = await admin.auth().getUserByEmail(TEST_EMAIL_A);
        await admin.auth().deleteUser(user.uid);
      }
    });

    it('should fail with emailAlreadyInUseErr if email is already in use', async () => {
      expect.assertions(1);

      // SETUP
      // create an account with this email
      await admin.auth().createUser(MOCK_USER_A);

      // TEST
      try {
        await dao.createAccount(TEST_EMAIL_A, TEST_PASSWORD_B);
      } catch(err) {
        expect(err).toBe(DataAccess.emailAlreadyInUseErr);
      } finally {

        // TEARDOWN
        // delete the account we just made
        await admin.auth().deleteUser(MOCK_USER_A.uid);
      }
    });

    it('should fail with invalidEmailErr if email is invalid', async () => {
      expect.assertions(1);

      try {
        await dao.createAccount('wumbo', TEST_PASSWORD_B);
      } catch(err) {
        expect(err).toBe(DataAccess.invalidEmailErr);
      }
    });

    it('should fail with weakPasswordError if password is weak', async () => {
      expect.assertions(1);
      try {
        await dao.createAccount(TEST_EMAIL_A, 'a');
        // if the account was created, delete it
        const user = await admin.auth().getUserByEmail(TEST_EMAIL_A);
        if (user) {
          admin.auth().deleteUser(user.uid);
        }
      } catch(err) {
        expect(err).toBe(DataAccess.weakPasswordErr);
      } 
    });
  });

  describe('deleteAccount', () => {

    it('should delete account and sign out if password matches currently logged on user account', async () => {
      expect.assertions(4);

      // SETUP
      // add account to firebase
      await admin.auth().createUser(MOCK_USER_A);
      // sign in as user A
      await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      // expect user A to be in db
      const user = await admin.auth().getUser(MOCK_USER_A.uid);
      expect(user).toHaveProperty('uid', MOCK_USER_A.uid);
      
      // TEST
      // expect call to return without errors
      const result = await dao.deleteAccount(TEST_PASSWORD_A);
      expect(result).toBeUndefined();
      // expect user A to be deleted from firebase db
      try {
        await admin.auth().getUser(MOCK_USER_A.uid);
      } catch(err) {
        expect(err.code).toBe('auth/user-not-found');
      }
      // expect user A to be signed out
      expect(firebase.auth().currentUser).toBeNull();

      // TEARDOWN
      // if user A wasn't deleted, delete user A
      try {
        await admin.auth().deleteUser(MOCK_USER_A.uid);
      } catch(err) {
        if (err.code !== 'auth/user-not-found') {
          throw(err);
        }
      }
    });

    it('should fail with userNotLoggedInErr if user is not logged in', async () => {
      expect.assertions(2);

      // expect that no user is logged in
      const user = firebase.auth().currentUser;
      expect(user).toBeNull();

      // expect deleteAccount to fail
      try {
        await dao.deleteAccount(TEST_PASSWORD_A);
        fail('deleteAccount did not throw');
      } catch(err) {
        expect(err).toBe(DataAccess.userNotLoggedInErr);
      }
    });

    it('should fail with wrongPasswordErr if password is incorrect', async () => {
      expect.assertions(4);

      // SETUP
      // add account to firebase
      await admin.auth().createUser(MOCK_USER_A);
      // sign in as user A
      await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      // expect user A to be current user
      expect(firebase.auth().currentUser).toHaveProperty('uid', MOCK_USER_A.uid);
      
      // TEST
      // expect deleteAccount to fail
      try {
        await dao.deleteAccount('wrong password');
        fail('deleteAccount did not fail');
      } catch(err) {
        expect(err).toBe(DataAccess.wrongPasswordErr);
      }

      // expect user A to still be in db
      const user = await admin.auth().getUser(MOCK_USER_A.uid);
      expect(user).toHaveProperty('uid', MOCK_USER_A.uid);

      // expect user A to still be signed in 
      expect(firebase.auth().currentUser).toHaveProperty('uid', MOCK_USER_A.uid);

      // TEARDOWN
      // delete user A
      await admin.auth().deleteUser(MOCK_USER_A.uid);
    });
  });

  describe('changePassword', () => {

    it('should succeed if password matches current logged-in user\'s password', async () => {
      expect.assertions(3);
      try {
        // SETUP
        // add an account to firebase db
        await admin.auth().createUser(MOCK_USER_A);
        // log in as that account
        await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      } catch(err) {
        fail(err);
      }

      // TEST
      // expect operation to go through
      const newPassword = '0re90q9we8r0qwe9r8qw09';
      try {
        const result = await dao.changePassword(TEST_PASSWORD_A, newPassword);
        expect(result).toBeUndefined();
      } catch(err) {
        fail(err);
      }

      await firebase.auth().signOut();
      // expect old password to fail
      try {
        await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      } catch(err) {
        expect(err.code).toBe('auth/wrong-password');
      }
      // expect new password to work
      const userCred = await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, newPassword);
      expect(userCred.user).toHaveProperty('uid', MOCK_USER_A.uid);

      // TEARDOWN
      // sign out
      await firebase.auth().signOut();
      // delete the account we added
      await admin.auth().deleteUser(MOCK_USER_A.uid);
    });

    it('should fail with userNotLoggedInErr if user is not logged in', async () => {
      expect.assertions(2);

      // SETUP
      // expect no one to be logged in
      expect(firebase.auth().currentUser).toBeNull();

      // TEST
      // call method without signing in
      try {
        await dao.changePassword(TEST_EMAIL_A, TEST_PASSWORD_A);
        fail('changePassword should not have worked');
      } catch(err) {
        console.warn(err);
        expect(err).toEqual(DataAccess.userNotLoggedInErr);
      }
    });
  });

  describe('changeEmail', () => {

    it('should succeed if password matches current logged-in user\'s password', async () => {
      expect.assertions(2);
      try {
        // SETUP
        // add an account to firebase db
        await admin.auth().createUser(MOCK_USER_A);
        // log in as that account
        await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      } catch(err) {
        fail(err);
      }

      // TEST
      // expect operation to go through
      const newEmail = MOCK_USER_B.email;
      try {
        const result = await dao.changeEmail(TEST_PASSWORD_A, newEmail);
        expect(result).toBeUndefined();
      } catch(err) {
        fail(err);
      }

      // expect email to have changed
      try {
        const user = await admin.auth().getUser(MOCK_USER_A.uid);
        expect(user.email).toBe(newEmail);
      } catch(err) {
        fail(err);
      }

      // TEARDOWN
      // sign out
      await firebase.auth().signOut();
      // delete the account we added
      await admin.auth().deleteUser(MOCK_USER_A.uid);
    });

    it('should fail with userNotLoggedInErr if user is not logged in', async () => {
      expect.assertions(2);
      // SETUP
      // expect no one to be logged in
      expect(firebase.auth().currentUser).toBeNull();

      // TEST
      // expect call to changeEmail to fail
      try {
        await dao.changeEmail(TEST_PASSWORD_A, TEST_EMAIL_B);
        fail('changeEmail should have thrown');
      } catch(err) {
        expect(err).toBe(DataAccess.userNotLoggedInErr);
      }
    });

    it('should fail with emailAlreadyInUseErr if email is already in use', async () => {
      expect.assertions(1);
      try {
        // SETUP
        // create two accounts
        await admin.auth().createUser(MOCK_USER_A);
        await admin.auth().createUser(MOCK_USER_B);
        // sign in as user A
        await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      } catch(err) {
        fail(err);
      }

      // TEST
      // try to change email to email of another account
      try {
        await dao.changeEmail(TEST_PASSWORD_A, TEST_EMAIL_B);
      } catch(err) {
        expect(err).toBe(DataAccess.emailAlreadyInUseErr);
      }

      // TEARDOWN
      // sign out
      firebase.auth().signOut();
      // delete the accounts we made
      admin.auth().deleteUser(MOCK_USER_A.uid);
      admin.auth().deleteUser(MOCK_USER_B.uid);
    });

    it('should fail with invalidEmailErr if new email is not a valid email', async () => {
      expect.assertions(1);
      try {
        // SETUP
        // add an account to firebase db
        await admin.auth().createUser(MOCK_USER_A);
        // log in as that account
        await firebase.auth().signInWithEmailAndPassword(TEST_EMAIL_A, TEST_PASSWORD_A);
      } catch(err) {
        fail(err);
      }

      // TEST
      // expect operation to go through
      const newEmail = 'wumbo';
      try {
        await dao.changeEmail(TEST_PASSWORD_A, newEmail);
        fail('createEmail should have thrown');
      } catch(err) {
        expect(err).toBe(DataAccess.invalidEmailErr);
      }

      // TEARDOWN
      // sign out
      await firebase.auth().signOut();
      // delete the account we added
      await admin.auth().deleteUser(MOCK_USER_A.uid);
    });
  });
});