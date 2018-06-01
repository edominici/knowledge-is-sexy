import * as React from 'react';

import './question.css';

export class Question extends React.Component {
  public render() {
    return (
      <div className='question-page'>

        <div className='question-container'>
          <div className='speech-bubble question'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a facilisis nulla. 
          </div>
        </div>

        <div className='answers-container'>
          <div className='speech-bubble answer'>
            Donec vel viverra neque. Nullam malesuada est id justo interdum, a finibus orci pulvinar. Suspendisse rutrum neque bibendum, dignissim justo et, dignissim enim. Phasellus in tellus consectetur, egestas sem eget, dignissim justo. Nam imperdiet vitae nibh nec varius. Vestibulum mollis bibendum ex, vel dictum leo consectetur nec. Nullam in odio ultrices, mattis nunc at, efficitur ligula. Morbi ipsum mauris, pulvinar in lorem vel, porttitor dapibus felis.
          </div>
        </div>

      </div>
    );
  }
}

