import * as React from 'react';

export interface QuestionListElementProps {
    headerText: string
    bodyText: string
  }
  
export const QuestionListElement: React.SFC<QuestionListElementProps> = (props) => {
    return ( <div className='question-list-element'>
      <div className='circular-icon' />
      <div className='text-container '>
        <div className='header-text'>
          {props.headerText}
        </div>
        <div className='body-text'>
          {props.bodyText}
        </div>
      </div>
    </div>);
  }
  