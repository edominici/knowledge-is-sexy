import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/* DEVELOPMENT 
import { Landing } from "./landing";
*/

import { Question } from './question';

export const App = () => {
  return (
    <BrowserRouter>
      { /* DEVELOPMENT
      <Route path="/" component={Landing} />
       */ }
      <Route path="/" component={Question} />
    </BrowserRouter>
  );
};
