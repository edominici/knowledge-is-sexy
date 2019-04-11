import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Navbar from './shared/components/navbar-container';
import SignIn from './signin-container';
import Account from './account/account-container';
import ChangeEmail from './account/change-email-container';
import ChangePassword from './account/change-password-container';
import DeleteAccount from './account/delete-account-container';

import { Landing } from './landing';
import { QuestionPage } from './question-page';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';
import { CategoryBrowse } from './category-browse';
import { AskExpert } from './ask-expert';

import { AppState } from './shared/types';
import { DataAccess } from './shared/data-access';
const dao = DataAccess.getInstance();

interface AppProps {
  isAuthenticated: boolean
}
const App: React.SFC<AppProps> = (props) => {
  return (
    <BrowserRouter>
      <React.Fragment>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Landing} /> 
        <Route path='/signin' render={() => <SignIn />}  />

        <Route path='/account' exact render={ () => props.isAuthenticated ? <Account /> : <Redirect to='/signin' /> } />
        <Route path='/account/change-email' render={ () => props.isAuthenticated ? <ChangeEmail /> : <Redirect to='/signin' /> }/>
        <Route path='/account/change-password' render={ () => props.isAuthenticated ? <ChangePassword /> : <Redirect to='/signin' /> } />
        <Route path='/account/delete-account' render={ () => props.isAuthenticated ? <DeleteAccount /> : <Redirect to='/signin' />} />

        <Route path='/search' render={ props => <QuestionSearch dao={dao} {...props} /> }/>
        <Route path='/browse' component={QuestionBrowse} />
        <Route path='/question/:id' component={QuestionPage} />
        <Route path='/ask-expert' component={AskExpert} />
        <Route path='/question-submitted' component={Landing} />
        <Route path='/category' component={CategoryBrowse}/>
      </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppState): AppProps => {
  return {
    isAuthenticated: state.auth.user !== null
  }
}
export default connect(mapStateToProps, null)(App);
