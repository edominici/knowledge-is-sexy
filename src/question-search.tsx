import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Question } from './shared/types';
import { DataAccess } from './shared/data-access';
import { QuestionCategory } from './shared/enums/question-category';

import './question-search.scss';

interface QuestionSearchProps {
  // FIXME(mpingram) hacky workarounds for the React router typings
  location?: any
  history?: any
  dao: DataAccess
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
    if(this.state.queryPrefix === "?c="){
      this.props.dao.getQuestionsInCategory(QuestionCategory[this.state.searchString]).then( questions => {
        this.setState({questions: questions});
      });
    }else{
      this.props.dao.getQuestionsBySearchString(this.state.searchString).then( questions => {
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
      <div className='kis-fullheight' > 

        {/* Search bar */}
        <div className='box is-marginless has-background-light' >
          <div className='field is-large has-addons'>
            <div className='control is-expanded'>
              <input 
                className='input' 
                type='search'
                value={this.state.searchString}
                onChange={this.handleSearchStringChange}
              />
            </div>
            <div className='control'>
              <button 
                className='button is-info'
                onClick={this.handleSearchSubmit}
              >
                Ask
              </button>
            </div>
          </div>
        </div>

        {/* List of questions */}
        <div style={{}} >
          <div className='container'>
            {
            this.state.questions.slice(0, this.state.numQuestionsToDisplay).map( q => {
              return (
                <a 
                  className='media' 
                  key={`question-${q.id}`} 
                  href={`/question/${q.id}`} 
                >
                  <div className='media-content'>
                    <div className='content'>
                      {q.question}
                    </div>
                  </div>
                </a>  
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
          </div>
        </div>


        {/* Footer */}
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
    );
  }

  private handleSearchStringChange  = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: ev.currentTarget.value
    });
  }

  private handleSearchSubmit = (ev: any) => {
    this.props.dao.getQuestionsBySearchString(this.state.searchString).then( questions => {
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
