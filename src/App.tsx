import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// ------------------------ 
// Data Access object
// ------------------------
// Initialize Data Access object
import { auth, initializeApp } from 'firebase';
const config = {
  apiKey: "AIzaSyDVnTgM2MgLEs0Z1GgNlaYxxI_vhRngsoA",
  authDomain: "knowledge-is-sexy-8b277.firebaseapp.com",
  databaseURL: "https://knowledge-is-sexy-8b277.firebaseio.com",
  projectId: "knowledge-is-sexy-8b277",
  storageBucket: "knowledge-is-sexy-8b277.appspot.com",
  messagingSenderId: "736324680308"
};
const app = initializeApp(config);

import { DataAccess } from './shared/data-access';
DataAccess.initialize(app.auth, auth.EmailAuthProvider.credential);
// -------------------------

import './App.scss';

import { Landing } from './landing';
import { QuestionPage } from './question-page';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';
import { CategoryBrowse } from './category-browse';
import { AskExpert } from './ask-expert';
import { SignIn } from './signin';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={Landing} />
        <Route path='/signin' render={ () => <SignIn successURL='/' />} />
        <Route path='/search' component={QuestionSearch} />
        <Route path='/browse' component={QuestionBrowse} />
        <Route path='/question/:id' component={QuestionPage} />
        <Route path='/ask-expert' component={AskExpert} />
        <Route path='/question-submitted' component={Landing} />
        <Route path='/category' component={CategoryBrowse}/>
      </Switch>
    </BrowserRouter>
  );
};
