import * as React from 'react';
import * as firebase from 'firebase';
import { auth } from 'firebaseui';
import { StyledFirebaseAuth  } from 'react-firebaseui';
import { Redirect } from 'react-router';

export interface SignInProps {
  onSignInSuccess: () => any
}

interface SignInState {
  shouldRedirectToHome?: boolean
}

// firebase ui config
export class SignIn extends React.PureComponent<SignInProps, SignInState> {

  constructor(props: SignInProps) {
    super(props);
    this.state = {
      shouldRedirectToHome: false
    }
  }

  render() { 

    if (this.state.shouldRedirectToHome) {
      return <Redirect push to='/' />
    }

    const uiConfig: auth.Config = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authRes: any) => {
          this.props.onSignInSuccess();
          this.setState({
            shouldRedirectToHome: true
          });
          return false;
        }
      }
    }
    return <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig}/>
  }
}