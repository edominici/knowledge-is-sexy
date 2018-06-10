import * as React from 'react';

import { SpeechBubble } from 'src/shared/components';

export const QuestionBrowse: React.SFC<any> = (props) => {

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    console.log(ev.currentTarget.value);
  };

  return (
    <div className='page'>
      <div className='search-bar-header'>
          <div className='search-bar-container'>
            <input type='search' className='search-bar' placeholder='#AskQuestions'/>
            <button className='search-bar-submit-button' onClick={handleSearchClick}>Ask</button>
          </div>
      </div>
      <div className='question-list'>
        <button className='question-button'>
          <SpeechBubble
            type='question'
            text='Question text one'
          />
        </button>
        <button className='question-button'>
          <SpeechBubble
            type='question'
            text='Question text one'
          />
        </button>
        <button className='question-button'>
          <SpeechBubble
            type='question'
            text='Question text one'
          />
        </button>
        <button className='question-button'>
          <SpeechBubble
            type='question'
            text='Question text one'
          />
        </button>
        <button className='question-button'>
          <SpeechBubble
            type='question'
            text='Question text one'
          />
        </button>
      </div>
    </div>
  );
}
