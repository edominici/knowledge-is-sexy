import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Landing } from './landing';
import { Question } from './question';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/search/:searchStr' component={QuestionSearch} />
        <Route path='/browse/' component={QuestionBrowse} />
        <Route path='/question/:id' component={Question} />
        <Route path='/' exact={true} component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};
