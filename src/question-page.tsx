import * as React from 'react';

import { SpeechBubble, UserIcon } from './shared/components';

import './question-page.scss';
import { RouteComponentProps } from 'react-router';
import { Question } from './shared/types';
import { DataAccess } from './shared/data-access';
import { BackHeader } from './shared/components/back-header';

interface QuestionPageRouteParams {
  id: string
}
interface QuestionPageProps extends RouteComponentProps<QuestionPageRouteParams> {
}

interface QuestionPageState {
  question: Question | null
}

export class QuestionPage extends React.Component<QuestionPageProps, QuestionPageState> {

  constructor(props: QuestionPageProps) {
    super(props);
    this.state = {
      question: null
    }
  }

  componentWillMount() {
    const questionId = this.props.match.params.id;
    DataAccess.getQuestionById(questionId).then( question => {
      this.setState({question: question});
    });
  }

  public render() {
    return (
      <div className='page'>
        <BackHeader />
        <div className='question-container'>
          <div className='question'>
            <UserIcon  className='user-icon user-icon-asker' />
            <SpeechBubble type='question' >
              {this.state.question ? this.state.question.question : ''}
            </SpeechBubble>
          </div>
        </div>
        <div className='answer-list-container'>
          <div className='answer-list'>
            <div className='answer'>
              <UserIcon username='KIS Expert' verified={true} className='user-icon user-icon-answerer' />
              <SpeechBubble type='answer'>
                {this.state.question ? this.state.question.answer : ''}
              </SpeechBubble>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

