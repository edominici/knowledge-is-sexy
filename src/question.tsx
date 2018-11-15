import * as React from 'react';

import { SpeechBubble, UserIcon } from './shared/components';

import './question.scss';


export class Question extends React.Component {
  public render() {
    return (
      <div className='page'>

        <div className='question-container'>

          <div className='question'>
            <UserIcon  className='user-icon user-icon-asker' />
            <SpeechBubble 
              type='question' 
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a facilisis nulla.' 
            />
          </div>

        </div>

        <div className='answer-list-container'>
          <div className='answer-list'>

            <div className='answer'>
              <UserIcon username='KIS Expert' verified={true} className='user-icon user-icon-answerer' />
              <SpeechBubble 
                type='answer'
                text='Donec vel viverra neque. Nullam malesuada est id justo interdum, a finibus orci pulvinar. Suspendisse rutrum neque bibendum, dignissim justo et, dignissim enim. Phasellus in tellus consectetur, egestas sem eget, dignissim justo. Nam imperdiet vitae nibh nec varius. Vestibulum mollis bibendum ex, vel dictum leo consectetur nec. Nullam in odio ultrices, mattis nunc at, efficitur ligula. Morbi ipsum mauris, pulvinar in lorem vel, porttitor dapibus felis.'
              />
            </div>

            <div className='answer'>
              <UserIcon username='Michael I' className='user-icon user-icon-answerer' />
              <SpeechBubble 
                type='answer'
                text='Donec vel viverra neque. Nullam malesuada est id justo interdum, a finibus orci pulvinar. Suspendisse rutrum neque bibendum, dignissim justo et, dignissim enim. Phasellus in tellus consectetur, egestas sem eget, dignissim justo. Nam imperdiet vitae nibh nec varius. Vestibulum mollis bibendum ex, vel dictum leo consectetur nec. Nullam in odio ultrices, mattis nunc at, efficitur ligula. Morbi ipsum mauris, pulvinar in lorem vel, porttitor dapibus felis.'
              />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

