import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Landing } from './landing';
import { QuestionPage } from './question-page';
import { QuestionSearch } from './question-search';
//import { QuestionBrowse } from './question-browse';
import { CategoryBrowse } from './category-browse';
import { AskExpert } from './ask-expert';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/search' component={QuestionSearch} />
        <Route path='/question/:id' component={QuestionPage} />
        <Route path='/ask-expert' component={AskExpert} />
        <Route path='/question-submitted' component={Landing} />
        <Route path='/' exact={true} component={Landing} />
        <Route path='/category/' component={CategoryBrowse}/>
      </Switch>
    </BrowserRouter>
  );
};
