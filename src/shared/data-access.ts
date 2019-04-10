import { auth, initializeApp } from 'firebase';
const config = {
  // NOTE this is public and safe to share with client / store in version control
  apiKey: "AIzaSyDVnTgM2MgLEs0Z1GgNlaYxxI_vhRngsoA",
  authDomain: "knowledge-is-sexy-8b277.firebaseapp.com",
  databaseURL: "https://knowledge-is-sexy-8b277.firebaseio.com",
  projectId: "knowledge-is-sexy-8b277",
  storageBucket: "knowledge-is-sexy-8b277.appspot.com",
  messagingSenderId: "736324680308"
};
initializeApp(config);

type FirebaseAuthAccessor = () => auth.Auth;
type FirebaseCredentialFn = (email: string, password: string) => auth.AuthCredential;


import algoliasearch from 'algoliasearch';
// this is a public key that enables searching the app's algolia index. It's safe to share with the client.
const ALGOLIA_SEARCH_API_KEY = '7a9d5fa02059e413c7bafc46c435fa05';
const APP_ID = '1SO498QEWN';
const INDEX_NAME = 'dev_Questions';
const client = algoliasearch(APP_ID, ALGOLIA_SEARCH_API_KEY);
const algoliaIndex = client.initIndex(INDEX_NAME);
import { parse } from 'papaparse';


import { Question, User } from '../shared/types';
import { QuestionCategory, Gender, Orientation } from '../shared/enums'

/**
 * DataAccess is a singleton class that contains methods for accessing 
 * the app's question data.
 * 
 * TODO implementation of loading questions is convoluted and throws network
 * errors to user.
 */
export class DataAccess {

  public static readonly userNotLoggedInErr = 'User not logged in';
  public static readonly invalidEmailErr = 'auth/invalid-email';
  public static readonly weakPasswordErr = 'auth/weak-password';
  public static readonly wrongPasswordErr = 'auth/wrong-password';
  public static readonly userDisabledErr = 'auth/user-disabled';
  public static readonly userNotFoundErr = 'auth/user-not-found';
  public static readonly emailAlreadyInUseErr = 'auth/email-already-in-use';
  public static readonly requiresRecentLoginErr = 'auth/requires-recent-login';
  public static readonly operationNotAllowedErr = 'auth/operation-not-allowed';
  public static readonly tooManyRequestsErr = 'auth/too-many-requests';

  public static getInstance = (): DataAccess => {
    if (DataAccess.instance) {
      return DataAccess.instance;
    } else {
      return new DataAccess(auth, auth.EmailAuthProvider.credential)
    }
  }

  private static instance: DataAccess | null = null;
  private auth: FirebaseAuthAccessor;
  private getCredential: FirebaseCredentialFn;

  private constructor(auth: FirebaseAuthAccessor, getCredential: FirebaseCredentialFn) {
    this.auth = auth;
    this.getCredential = getCredential;
  }

  /**
   * USER AUTHENTICATION AND ACCOUNTS
   */

  // getUser gets the currently logged-in user, or null if no user is logged in.
  public getUser = (): Promise<User | null> => {
    return new Promise( (resolve, reject) => {
      this.auth().onAuthStateChanged( user => {
        if (!user) {
          resolve(null);
        } else {
          resolve({
            email: user.email as string, // FIXME(mpingram) can this really be null?
            emailVerified: user.emailVerified,
            displayName: user.displayName ? user.displayName : undefined,
            photoURL: user.photoURL ? user.photoURL : undefined,
            uid: user.uid,
            // FIXME(mpingram) placeholders
            gender: Gender.PreferNoAnswer,
            orientation: Orientation.PreferNoAnswer,
          });
        }
      });
    });
  }
  
  // createAccount attempts to create an account with the user's email and password. 
  // If account creation is successful, user is signed in automatically.
  public createAccount = (email: string, password: string): Promise<void> => {
    return new Promise( (resolve, reject) => {
      this.auth().createUserWithEmailAndPassword(email, password).then( () => {
        resolve();
      }).catch( (err) => {
        switch(err.code) {
          case 'auth/invalid-email':
            reject(DataAccess.invalidEmailErr);
            break;
          case 'auth/email-already-in-use':
            reject(DataAccess.emailAlreadyInUseErr);
            break;
          case 'auth/weak-password':
            reject(DataAccess.weakPasswordErr);
            break;
          case 'auth/operationNotAllowed':
            reject(DataAccess.operationNotAllowedErr);
            break;
          case 'auth/too-many-requests':
            reject(DataAccess.tooManyRequestsErr);
          default:
            reject(`Unhandled error:\n${JSON.stringify(err)}`);
            break;
        }
      });
    });
  }

  // sendVerificationEmail sends a verification email to the currently logged in user.
  // It fails with userNotLoggedInErr if there is no user logged in.
  public sendVerificationEmail = (): Promise<void> => {
    return new Promise( (resolve, reject) => {
      this.auth().onAuthStateChanged( user => {
        if (!user) {
          reject(DataAccess.userNotLoggedInErr);
        } else {
          user.sendEmailVerification().then( () => {
            resolve();
          }).catch( err => {
            switch(err.code){
              case 'auth/too-many-requests':
                reject(DataAccess.tooManyRequestsErr);
                break;
              default:
                reject(`Unhandled err:\n${JSON.stringify(err)}`);
            }
          });
        }
      });
    });
  }

  public deleteAccount = (password: string): Promise<void> => {
    return new Promise( (resolve, reject) => {
      const user = this.auth().currentUser;
      if (!user) {
        // user is not logged in
        reject(DataAccess.userNotLoggedInErr);
      } else {
        // user is logged in
        if (!user.email) {
          console.error(`Unhandled error:\nUser email not found`);
          reject(DataAccess.invalidEmailErr);
        }
        const cred = this.getCredential(user.email as string, password);
        user.reauthenticateAndRetrieveDataWithCredential(cred).then( () => {
          return user.delete()
        }).catch( err => {
          switch(err.code) {
            case 'auth/wrong-password':
              reject(DataAccess.wrongPasswordErr);
              break;
            case 'auth/too-many-requests':
              reject(DataAccess.tooManyRequestsErr);
              break;
            default:
              reject(`Unhandled error:\n${JSON.stringify(err)}`)
              break;
          }
        }).then( () => {
          resolve();
        });
      }
    });
  }

  public changePassword = (oldPassword: string, newPassword: string): Promise<void> => {
    return new Promise( (resolve, reject) => {
      this.auth().onAuthStateChanged( user => {
        if (!user) {
          // user is not logged in
          reject(DataAccess.userNotLoggedInErr);
        } else {
          // user is logged in
          if (!user.email) {
            // user's email is somehow missing
            console.error(`Unhandled error:\nUser email not found`);
            reject(DataAccess.invalidEmailErr);
          }
          const cred = this.getCredential(user.email as string, oldPassword);
          user.reauthenticateAndRetrieveDataWithCredential(cred).then( () => {
            return user.updatePassword(newPassword);
          }).catch( err => {
            switch(err.code) {
              case 'auth/wrong-password':
                reject(DataAccess.wrongPasswordErr);
                break;
              // operation failed - password is too weak
              case 'auth/weak-password':
                reject(DataAccess.weakPasswordErr);
                break;
              // operation failed - user needs to reauthenticate
              case 'auth/requires-recent-login':
                reject(DataAccess.requiresRecentLoginErr);
                break;
              case 'auth/too-many-requests':
                reject(DataAccess.tooManyRequestsErr);
                break;
              // operation failed - unhandled reason
              // (This should never happen)
              default:
                console.error(`Unhandled error:\n${JSON.stringify(err)}`);
                reject(err);
                break;
            }
          }).then( () => {
            resolve();
          });
        }
      });
    });
  }

  public changeEmail = (password: string, newEmail: string): Promise<void> => {
    return new Promise( (resolve, reject) => {
      this.auth().onAuthStateChanged( user => {
        if (!user) {
          // failed - user is not signed in
          reject(DataAccess.userNotLoggedInErr);
        } else {
          // user is signed in
          if (!user.email) {
            // user's email is somehow missing
            console.error(`Unhandled error:\nUser email not found`);
            reject(DataAccess.invalidEmailErr);
          }
          const cred = this.getCredential(user.email as string, password);
          user.reauthenticateAndRetrieveDataWithCredential(cred).then( () => {
            return user.updateEmail(newEmail);
          }).catch( err => {
            switch(err.code) {
              // failed - bad password
              case 'auth/wrong-password':
                reject(DataAccess.wrongPasswordErr);
                break;
              // failed - email is invalid
              case 'auth/invalid-email':
                reject(DataAccess.invalidEmailErr);
                break;
              // failed - email already in use
              case 'auth/email-already-in-use':
                reject(DataAccess.emailAlreadyInUseErr);
                break;
              // failed - user needs to reauthenticate
              case 'auth/requires-recent-login':
                reject(DataAccess.requiresRecentLoginErr);
                break;
              case 'auth/too-many-requests':
                reject(DataAccess.tooManyRequestsErr);
                break;
              // failed - unhandled reason
              // (This should never happen)
              default:
                console.error(`Unhandled error:\n${JSON.stringify(err)}`);
                reject(err);
                break;
            }
          }).then( () => {
            resolve();
          });
        }
      });
    })
  }

  public logIn = (email: string, password: string): Promise<void> => {
    return new Promise( (resolve, reject) => {
      this.auth().signInWithEmailAndPassword(email, password).then( () => {
          // success -- user signed in
          resolve();
        }).catch( err => {
          switch(err.code) {
            case 'auth/wrong-password':
              reject(DataAccess.wrongPasswordErr);
              break;
            case 'auth/invalid-email':
              reject(DataAccess.invalidEmailErr);
              break;
            case 'auth/user-disabled':
              reject(DataAccess.userDisabledErr);
              break;
            case 'auth/user-not-found':
              reject(DataAccess.userNotFoundErr);
              break;
            case 'auth/too-many-requests':
              reject(DataAccess.tooManyRequestsErr);
              break;
            default:
              console.error(`Unhandled error:\n${JSON.stringify(err)}`);
              reject(err);
          }
        })
    });
  }

  public logOut = (): Promise<void> => {
    return new Promise( (resolve, reject) => {
      this.auth().signOut().then( () => {
        resolve()
      }).catch( err => {
        reject(err);
      })
    });
  }

  /**
   * SITE API
   */
  public getPopularQuestions = (count: number): Promise<Question[]> => {
    // FIXME this is a mock implementation that returns a random set of questions
    return new Promise( (resolve, reject) => {
      this.awaitQuestionsLoaded().then( questions => {
        resolve(questions.slice(0, count));
      })
    });
  }

  public getQuestionsInCategory = (category: QuestionCategory): Promise<Question[]> => {
    const isInCategory = (q: Question) => q.categories.indexOf(category) !== -1;
    return new Promise( (resolve, reject) => {
      this.awaitQuestionsLoaded().then( questions => {
        const questionsInCategory = questions.filter(isInCategory);
        resolve(questionsInCategory);
      });
    });
  }

  public getQuestionsBySearchString = (searchString: string): Promise<Question[]> => {

    interface AlgoliaResult {
      id: number,
      objectID: string,
      question: string,
      answer: string,
      tags: string,
      topic: string
    }
    const toQuestion = (q: AlgoliaResult): Question => {
      let tags: string[];
      if (q.tags) {
        tags = q.tags.split(',').map( tag => tag.trim() );
      } else {
        tags = [];
      }

      let categories: string[];
      if (q.tags) {
        categories = q.topic.split(',').map( topic => topic.trim() );
      } else {
        categories = [];
      }

      return {
        id: q.id.toString(),
        question: q.question,
        answer: q.answer,
        tags: tags,
        categories: categories,
        numUpvotes: 0
      }
    }

    return new Promise( (resolve, reject) => {
      algoliaIndex.search({query: searchString}, (err: any, content: any): any => {
        if (err) {
          reject(err);
        } else {
          resolve(content.hits.map(toQuestion));
        }
      });
    });
  }

  public getQuestionById = (id: string): Promise<Question | null> => {
    return new Promise( (resolve, reject) => {
      this.awaitQuestionsLoaded().then( questions => {
        const matchingQuestion = questions.find( q => q.id === id);
        if (matchingQuestion === undefined) {
          resolve(null);
        } else {
          resolve(matchingQuestion);
        }
      });
    });
  }

  private static allQuestions: Question[];
  private static questionsRequestInFlight: boolean;
  private static questionsRequest: Promise<Question[]>;

  /**
   * loadAllQuestions makes a network request for all questions from the backend.
   */
  private loadAllQuestions = (): Promise<Question[]> => {
    const GOOGLE_SHEETS_QUESTIONS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ3Ag8K_d4V3rzBf9pXQ5J9GInmj9VCeNknjuV_S9sO-yqZOzCg1gbQt3UHdthqXOL24v0Fw4fPrFy/pub?output=csv';
    interface RawGoogleSheetsQuestion {
      id: string
      topic: string
      question: string
      tags: string
      answer: string
    }
    const toQuestion = (q: RawGoogleSheetsQuestion): Question => {
      let tags: string[];
      if (q.tags) {
        tags = q.tags.split(',').map( tag => tag.trim() );
      } else {
        tags = [];
      }

      let categories: string[];
      if (q.tags) {
        categories = q.topic.split(',').map( topic => topic.trim() );
      } else {
        categories = [];
      }

      return {
        id: q.id,
        question: q.question,
        answer: q.answer,
        tags: tags,
        categories: categories,
        numUpvotes: 0
      }
    }
    // parse (from papaparse) loads and parses a csv stream directly from a url.
    return new Promise( (resolve, reject) => {
      parse(GOOGLE_SHEETS_QUESTIONS_URL, {
        download: true,
        header: true,
        error: (err: any) => {
          reject(err);
        },
        complete: (res: any) => {
          const rawQuestions: RawGoogleSheetsQuestion[] = res.data;
          const questions: Question[] = rawQuestions.map( toQuestion );
          resolve(questions)
        }
      });
    });
  }

  private awaitQuestionsLoaded = (): Promise<Question[]> => {
    // if we already loaded the questions, return those
    if (DataAccess.allQuestions !== undefined) {
      return Promise.resolve(DataAccess.allQuestions);
    // if a different network request is already in flight, return the in-flight request
    // instead of starting a new one.
    } else if (DataAccess.questionsRequestInFlight === true) {
      return DataAccess.questionsRequest;
    // otherwise, initiate a network request for the questions.
    } else {
      DataAccess.questionsRequestInFlight = true;
      DataAccess.questionsRequest = this.loadAllQuestions().then( allQuestions => {
        DataAccess.questionsRequestInFlight = false;
        DataAccess.allQuestions = allQuestions;
        return DataAccess.allQuestions;
      });
      return DataAccess.questionsRequest;
    }
  }
}