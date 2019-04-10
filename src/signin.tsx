import * as React from 'react';
import * as firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

interface SignInProps {
  next: string
}

// firebase ui config

export const SignIn: React.SFC<SignInProps> = (props) => {

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: props.next,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  }

  return <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig}/>
};