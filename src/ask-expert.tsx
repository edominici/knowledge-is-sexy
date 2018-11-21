import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BackHeader, SpeechBubble } from './shared/components';

import './ask-expert.scss';

interface AskExpertRouteProps {
  questionTemplate: string
}
interface AskExpertProps extends RouteComponentProps<AskExpertRouteProps> {
}

interface AskExpertState {
  questionString: string
}

const FORMSPREE_EMAIL_ENDPOINT = 'https://formspree.io/knowledge.is.sexy.app@gmail.com';
const QUESTION_CHAR_MINIMUM = 10;
const QUESTION_CHAR_LIMIT = 140;

export class AskExpert extends React.PureComponent<AskExpertProps, AskExpertState> {

  constructor(props: AskExpertProps) {
    super(props);
    this.state = {
      questionString: props.location.state ? props.location.state.questionTemplate : ''
    }
  }

  render() {
    return (<div className='ask-expert-page'>
      <BackHeader routeTo={this.props.location.state ?
                                `/search?q=${this.props.location.state.questionTemplate}` : 
                                '/search'}
      />
      <div className='ask-expert-question-form-container'>
        <div className='ask-expert-header'>
          Ready to ask an expert?
        </div>
        <div className='ask-expert-subheader'>
          Your question will be <em>answered</em> by one of our experts and <em>added</em> to our database of questions.
        </div>
        <form id='ask-expert-form' action={FORMSPREE_EMAIL_ENDPOINT} method="POST">
          <input type="hidden" name="_next" value="question-submitted" />
          <SpeechBubble type='question'>
            <textarea 
              form='ask-expert-form' 
              autoFocus 
              className='speech-bubble-input' 
              name='question' 
              value={this.state.questionString} 
              onChange={this.handleQuestionStringChange} 
            />
          </SpeechBubble>
        </form>
        <div 
          style={{
            color: this.state.questionString.length < QUESTION_CHAR_MINIMUM || this.state.questionString.length > QUESTION_CHAR_LIMIT ? 'red' : undefined 
          }}
          className='ask-expert-character-count'
        >
          {`${this.state.questionString.length}/${QUESTION_CHAR_LIMIT}`}
        </div>
        <div className='ask-expert-buttons-container'>
          <button className='ask-expert-cancel-button' onClick={this.handleCancelClick}>
            Cancel
          </button>
          <input 
            className='ask-expert-submit-button'
            form='ask-expert-form' 
            disabled={this.state.questionString.length < QUESTION_CHAR_MINIMUM || this.state.questionString.length > QUESTION_CHAR_LIMIT} 
            value='Send it!' 
            type='submit' 
          />
        </div>
      </div>
    </div>);
  }

  private handleQuestionStringChange: React.ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
    this.setState({
      questionString: ev.currentTarget.value
    })
  }

  private handleCancelClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    this.props.history.push(this.props.location.state ?
                            `/search?q=${this.props.location.state.questionTemplate}` : 
                            '/search');
  }

}