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
initializeApp(config);

import { DataAccess } from './shared/data-access';
const dao = DataAccess.initialize(auth, auth.EmailAuthProvider.credential);
// -------------------------

import './App.scss'

import { User } from './shared/types'; 

import { Navbar } from './shared/components/navbar';
import { Landing } from './landing';
import { QuestionPage } from './question-page';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';
import { CategoryBrowse } from './category-browse';
import { AskExpert } from './ask-expert';
import { SignIn } from './signin';

interface AppProps {

}
interface AppState {
  user?: User | null,
  userSignInTransition: boolean
}
export class App extends React.Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      userSignInTransition: true
    }
  }

  componentDidMount() {
    dao.getUser().then( (user) => {
      this.setState({
        user: user,
        userSignInTransition: false,
      });
    });
  }

  render(){
    return (
      <React.Fragment>
        <Navbar 
          user={this.state.user ? this.state.user : undefined}  
          signInTransition={this.state.userSignInTransition} 
          handleSignOutClick={this.handleSignOutClick} 
        />
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={true} component={Landing} /> } />
            <Route path='/signin' render={ () => <SignIn successURL='/' />} />
            <Route path='/search' render={ props => <QuestionSearch dao={dao} {...props} /> }/>
            <Route path='/browse' component={QuestionBrowse} />
            <Route path='/question/:id' component={QuestionPage} />
            <Route path='/ask-expert' component={AskExpert} />
            <Route path='/question-submitted' component={Landing} />
            <Route path='/category' component={CategoryBrowse}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }

  private handleSignOutClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    this.setState({userSignInTransition: true})
    dao.logOut().then( () => {
      this.setState({
        user: null,
        userSignInTransition: false
      })
    });
  }

};
