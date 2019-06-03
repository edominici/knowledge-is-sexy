import * as React from 'react';

interface SpeechBubbleProps {
  type: 'question' | 'answer'
}

import './speech-bubble.scss';

export const SpeechBubble: React.SFC<SpeechBubbleProps> = (props) => {
  let className = 'speech-bubble';
  if (props.type === 'question') {
    className += ' speech-bubble-question';
  } else if (props.type === 'answer') {
    className += ' speech-bubble-answer';
  }

  return (
    <div className={className}>
      {props.children}
    </div>
  )

}

