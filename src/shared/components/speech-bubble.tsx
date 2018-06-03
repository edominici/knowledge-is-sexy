import * as React from 'react';

interface SpeechBubbleProps {
  type: 'question' | 'answer'
  text: string
}

import './speech-bubble.css';

export const SpeechBubble: React.SFC<SpeechBubbleProps> = (props) => {
  let className = 'speech-bubble';
  if (props.type === 'question') {
    className += ' speech-bubble-question';
  } else if (props.type === 'answer') {
    className += ' speech-bubble-answer';
  }

  return (
    <div className={className}>
      {props.text}
    </div>
  )

}

