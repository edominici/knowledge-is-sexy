import * as React from 'react';
import * as firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

interface SignInProps {
  successURL: string
}

// firebase ui config

export const SignIn: React.SFC<SignInProps> = (props) => {

  const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: props.successURL,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  }

  return <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig}/>
};