import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Landing } from './landing';
import { QuestionPage } from './question-page';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/search' component={QuestionSearch} />
        <Route path='/browse' component={QuestionBrowse} />
        <Route path='/question/:id' component={QuestionPage} />
        <Route path='/' exact={true} component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};
