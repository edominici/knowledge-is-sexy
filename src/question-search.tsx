import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { SearchBar } from './shared/components'
import { Question } from './shared/types';
import { QuestionListElement } from './question-list-element'
import { DataAccess } from './shared/data-access';
import { BackHeader } from './shared/components';
import { QuestionCategory } from './shared/enums/question-category';

import './question-search.scss';

export interface QuestionSearchParams {
}
interface QuestionSearchProps extends RouteComponentProps<QuestionSearchParams> {
}

interface QuestionSearchState {
  questions: Question[]
  numQuestionsToDisplay: number
  searchString: string
  navigateToAskExpertPage: boolean
  queryPrefix: string
}

const QUESTION_CHUNK_SIZE = 10;

export class QuestionSearch extends React.Component<QuestionSearchProps, QuestionSearchState> {

  constructor(props: QuestionSearchProps) {
    super(props);
    // remove '?q=' at start of string
    const QUERY_PREFIX_LENGTH = 3;
    const queryPrefix = props.location.search.slice(0,QUERY_PREFIX_LENGTH);
    const encodedSearchString = props.location.search.slice(QUERY_PREFIX_LENGTH);
    const searchString = decodeURIComponent(encodedSearchString);
    this.state = {
      searchString,
      queryPrefix,
      numQuestionsToDisplay: QUESTION_CHUNK_SIZE, // display one chunk of questions by default
      questions: [],
      navigateToAskExpertPage: false,
    }
  }

  componentWillMount() {
    if(this.state.queryPrefix === '?c='){
      DataAccess.getQuestionsInCategory(QuestionCategory[this.state.searchString]).then( questions => {
        this.setState({questions: questions});
      });
    }
    if(this.state.queryPrefix === '?q='){
      DataAccess.getQuestionsBySearchString(this.state.searchString).then( questions => {
        this.setState({questions: questions});
      });
    }
  }

  render(){
    if (this.state.navigateToAskExpertPage) {
      return <Redirect push to={{
        pathname: '/ask-expert',
        state: {
          questionTemplate: this.state.searchString
        }
      }} />
    }
    return (
      <div className='page'>
        <BackHeader routeTo='/' />
        <div className='question-search-header'>
          <div className='header-search-bar-container'>
            <SearchBar 
              value={this.state.searchString}
              onChange={this.handleSearchStringChange}
              onSearchButtonClick={this.handleSearchSubmit} 
            />
          </div>
        </div>
        <div className='question-list-scroll-container'>
          <div className='question-list'>
            {
            this.state.questions.slice(0, this.state.numQuestionsToDisplay).map( q => {
              return (
                <div onClick={() => this.props.history.push(`/question/${q.id}`)} key={`question-${q.id}`} >
                  <QuestionListElement headerText={q.question} bodyText={q.answer} />
                </div>
              );
            })
            }
            { this.state.numQuestionsToDisplay <= this.state.questions.length &&
            <div className='question-list-tail'>
              <button onClick={this.handleMoreQuestionsClick} className='more-questions-button'>
                See more questions
              </button>
            </div>
            }
            <div className='question-list-footer'>
                <div className='info-icon'>
                  ?
                </div>
                <div className='header-text'>
                  Doesn't answer your question?
                </div>
                <button className='ask-expert-button' onClick={this.handleAskExpertClick}>
                  Ask an expert
                </button>
                </div>
            </div>
          </div>
      </div>
    );
  }

  private handleSearchStringChange  = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: ev.currentTarget.value
    });
  }

  private handleSearchSubmit = (ev: any) => {
    DataAccess.getQuestionsBySearchString(this.state.searchString).then( questions => {
      const searchStringUrl = encodeURIComponent(this.state.searchString);
      this.props.history.push(`/search?q=${searchStringUrl}`);
      this.setState({questions: questions});
    });
  }

  private handleMoreQuestionsClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    this.setState({
      numQuestionsToDisplay: this.state.numQuestionsToDisplay + QUESTION_CHUNK_SIZE
    })
  }

  private handleAskExpertClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    this.setState({
      navigateToAskExpertPage: true
    })

  }

}
