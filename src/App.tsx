import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Landing } from './landing';
import { Question } from './question';
import { QuestionSearch } from './question-search';
import { QuestionBrowse } from './question-browse';
import { CategoryBrowse } from './category-browse';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/search' component={QuestionSearch} />
        <Route path='/browse/' component={QuestionBrowse} />
        <Route path='/question/:id' component={Question} />
        <Route path='/' exact={true} component={Landing} />
        <Route path='/category/' component={CategoryBrowse}/>
      </Switch>
    </BrowserRouter>
  );
};
