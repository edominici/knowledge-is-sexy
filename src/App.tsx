import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Landing } from './landing';
import { Question } from './question';
import { QuestionBrowse } from './question-browse';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={QuestionBrowse} />
        <Route path='/landing' component={Landing} />
        <Route path='/question' component={Question} />
        <Route path='/question-browse' component={QuestionBrowse} />
      </Switch>
    </BrowserRouter>
  );
};
