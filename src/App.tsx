import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Landing } from "./landing";

export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Landing} />
    </BrowserRouter>
  );
};
