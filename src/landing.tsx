import * as React from 'react';
import './landing.scss';

import logo from './shared/images/kis-logo.svg';

export class Landing extends React.Component {
  public render() {
    return (
      <div className='landing-page'>
        <header className='landing-header'>
          <div className='landing-logo-container'>
            <div className='landing-title'>Knowledge Is&nbsp;<span className='landing-title-accent'>Sexy.</span></div>
            <img src={logo} className='landing-logo' alt='logo' />
          </div>
        </header>

        <div className='content'>

          <div className='content-text'>
            <span className='content-text-accent'>Ask questions</span> about sex.
            <br />
            Get answers from <span className='content-text-accent'> the experts</span>
          </div>
          <div className='search-bar-container'>
            <input type='search' className='search-bar' placeholder='#AskQuestions'/>
              <button className='search-bar-submit-button' onClick={this.handleSearchSubmit}>Ask</button>
          </div>
          <div className='divider'>
            <div className='divider-line'/>
            <div className='divider-text'>
              or
            </div>
          </div>
          <h2 className='content-text'><span className='content-text-accent'>Browse</span>&nbsp;the&nbsp;<span className='content-text-accent'>most popular</span>&nbsp;questions from other people.</h2>

        </div>
      </div>
    );
  }

  private handleSearchSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // implement
  }
}
