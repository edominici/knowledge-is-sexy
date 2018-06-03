import * as React from 'react';

import './question.css';

interface UserIconProps {
  verified?: boolean
  className: string
  username?: string
}

const UserIcon: React.SFC<UserIconProps> = (props) => {
  return (
    <div style={{position: 'relative', width: '60px'}} className={props.className}>
      <svg style={{fill: 'inherit'}} width='40px' height='40px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/>
      </svg>
      { 
        props.verified && 
        <svg style={{position: 'absolute', top: '-8px', right: '-1px'}} width='22px' height='22px' fill='#92d36e' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'/>
        </svg>
      }
      {
        props.username &&
        <div style={{width: '100%', position: 'absolute', bottom: '-10px', fontSize: '70%'}}>
          {props.username}
        </div>

      }
    </div>
  );
};

export class Question extends React.Component {
  public render() {
    return (
      <div className='page'>

        <div className='question-container'>

          <div className='question'>
            <UserIcon  className='user-icon user-icon-asker' />
            <div className='speech-bubble speech-bubble-question'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a facilisis nulla. 
            </div>
          </div>

        </div>

        <div className='answer-list-container'>
          <div className='answer-list'>

            <div className='answer'>
              <UserIcon username='KIS Expert' verified={true} className='user-icon user-icon-answerer' />
              <div className='speech-bubble speech-bubble-answer'>
                Donec vel viverra neque. Nullam malesuada est id justo interdum, a finibus orci pulvinar. Suspendisse rutrum neque bibendum, dignissim justo et, dignissim enim. Phasellus in tellus consectetur, egestas sem eget, dignissim justo. Nam imperdiet vitae nibh nec varius. Vestibulum mollis bibendum ex, vel dictum leo consectetur nec. Nullam in odio ultrices, mattis nunc at, efficitur ligula. Morbi ipsum mauris, pulvinar in lorem vel, porttitor dapibus felis.
              </div>
            </div>

            <div className='answer'>
              <UserIcon username='Michael I' className='user-icon user-icon-answerer' />
              <div className='speech-bubble speech-bubble-answer'>
                Donec vel viverra neque. Nullam malesuada est id justo interdum, a finibus orci pulvinar. Suspendisse rutrum neque bibendum, dignissim justo et, dignissim enim. Phasellus in tellus consectetur, egestas sem eget, dignissim justo. Nam imperdiet vitae nibh nec varius. Vestibulum mollis bibendum ex, vel dictum leo consectetur nec. Nullam in odio ultrices, mattis nunc at, efficitur ligula. Morbi ipsum mauris, pulvinar in lorem vel, porttitor dapibus felis.
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

