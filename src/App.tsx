import * as React from 'react';
import './App.css';

import logo from './shared/images/kis-logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className='App'>

        <header className='App-header'>
          <div className='App-logo-container'>
            <div className='App-title'>Knowledge Is&nbsp;<span className='App-title-accent'>Sexy.</span></div>
            <img src={logo} className='App-logo' alt='logo' />
          </div>
        </header>

        <div className='content'>

          <h2 className="content-text"><span className="content-text-accent">Ask</span>&nbsp;any sex or sexual health questions here.</h2>
          <div className='search-bar-container'>
            <input type='search' className='search-bar'/>
            <button className='search-bar-submit' onClick={this.handleSearchSubmit}>Ask</button>
          </div>
          <h3>or</h3>
          <h2 className="content-text"><span className="content-text-accent">Browse</span>&nbsp;questions that other people have asked.</h2>

        </div>
      </div>
    );
  }

  private handleSearchSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // implement
  }
}

export default App;
