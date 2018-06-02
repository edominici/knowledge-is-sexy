import * as React from 'react';

import './question.css';

interface UserIconProps {
  className: string
}
const UserIcon: React.SFC<UserIconProps> = (props) => {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  );
};

export class Question extends React.Component {
  public render() {
    return (
      <div className='question-page'>

        <div className='question-container'>

          <div className='question'>
            <UserIcon className='user-icon asker' />
            <div className='speech-bubble question'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a facilisis nulla. 
            </div>
          </div>

        </div>

        <div className='answers-container'>

          <div className='answer'>
            <UserIcon className='user-icon answerer' />
            <div className='speech-bubble answer'>
              Donec vel viverra neque. Nullam malesuada est id justo interdum, a finibus orci pulvinar. Suspendisse rutrum neque bibendum, dignissim justo et, dignissim enim. Phasellus in tellus consectetur, egestas sem eget, dignissim justo. Nam imperdiet vitae nibh nec varius. Vestibulum mollis bibendum ex, vel dictum leo consectetur nec. Nullam in odio ultrices, mattis nunc at, efficitur ligula. Morbi ipsum mauris, pulvinar in lorem vel, porttitor dapibus felis.
            </div>
          </div>

        </div>

      </div>
    );
  }
}

