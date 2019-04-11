import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const dao = DataAccess.getInstance();


import { User } from './shared/types'; 

import { Navbar } from './shared/components/navbar';
import { Landing } from './landing';
import { AccountContainer } from './account/account-container';
import { QuestionPage } from './question-page';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';
import { CategoryBrowse } from './category-browse';
import { AskExpert } from './ask-expert';
import { SignIn } from './signin';
import { ChangeEmailContainer } from './account/change-email-container';
import { ChangePasswordContainer } from './account/change-password-container';
import { DeleteAccountContainer } from './account/delete-account-container';
import { DataAccess } from './shared/data-access';

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
            <Route path='/' exact component={Landing} /> } />
            <Route path='/signin' render={ () => <SignIn next='/' />} />

            <Route path='/account' exact render={ () => <AccountContainer dao={dao} />} />
            <Route path='/account/change-email' render={ () => <ChangeEmailContainer dao={dao} />} />
            <Route path='/account/change-password' render={ () => <ChangePasswordContainer dao={dao} />} />
            <Route path='/account/delete-account' render={ () => <DeleteAccountContainer dao={dao} />} />

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
