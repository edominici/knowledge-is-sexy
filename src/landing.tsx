import * as React from 'react';
import Carousel from 'nuka-carousel';

import { SpeechBubble } from './shared/components/speech-bubble';
import { SearchBar } from './shared/components'
import logo from './shared/images/kis-logo.svg';
import './landing.scss';

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

        <div className='landing-content'>

          <div className='content-text'>
            <span className='content-text-accent'>Ask questions</span> about sex.
            <br />
            Get answers from <span className='content-text-accent'> the experts</span>
          </div>

          <div className='landing-search-bar-container'>
            <SearchBar onSubmit={this.handleSearchSubmit} />
          </div>

          <div className='divider'>
            <div className='divider-line'/>
            <div className='divider-text'>
              or
            </div>
          </div>
          <div className='content-text'>
            See what other people are asking.
          </div>
          <div className='landing-carousel-container'>
            <Carousel
              slideWidth={1.0}
              initialSlideHeight={200}
              wrapAround={true}
              renderCenterLeftControls={({ previousSlide }: any) => {
                return <button onClick={previousSlide} className='landing-carousel-control'>&lt;</button>
              }}
              renderCenterRightControls={({ nextSlide }: any) => {
                return <button onClick={nextSlide} className='landing-carousel-control'>&gt;</button>
              }}
            >
              <div className="speech-bubble-container">
                <SpeechBubble
                  type={'question'}
                  text={'test text'}
                />
              </div>
              <div className="speech-bubble-container">
                <SpeechBubble
                  type={'question'}
                  text={'test text'}
                />
              </div>
              <div className="speech-bubble-container">
                <SpeechBubble
                  type={'question'}
                  text={'test text'}
                />
              </div>
              <div className="speech-bubble-container">
                <SpeechBubble
                  type={'question'}
                  text={'test text'}
                />
              </div>
              <div className="speech-bubble-container">
                <SpeechBubble
                  type={'question'}
                  text={'test text'}
                />
              </div>
            </Carousel>
          </div>
          <button className='browse-questions-button'>
            Browse questions
          </button>
        </div>
      </div>
    );
  }

  private handleSearchSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // implement
  }
}
