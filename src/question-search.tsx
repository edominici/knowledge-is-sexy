import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { SearchBar } from './shared/components'
import { Question } from './shared/types';
import { QuestionListElement } from './question-list-element'
import { DataAccess } from './shared/data-access';

import './question-search.scss';

interface BackHeaderProps {
  routeTo: string
}
const BackHeader: React.SFC<BackHeaderProps> = (props) => {
  return (
    <div className='question-back-bar-container'>
      <button className='question-back-button'>
        <Link to={props.routeTo}> 
          Back
        </Link>
      </button>
    </div>
  )
}

export interface QuestionSearchParams {
}
interface QuestionSearchProps extends RouteComponentProps<QuestionSearchParams> {
}

interface QuestionSearchState {
  questions: Question[]
  searchString: string
}

export class QuestionSearch extends React.Component<QuestionSearchProps, QuestionSearchState> {

  constructor(props: QuestionSearchProps) {
    super(props);
    // remove '?q=' at start of string
    const QUERY_PREFIX_LENGTH = 3;
    const encodedSearchString = props.location.search.slice(QUERY_PREFIX_LENGTH);
    const searchString = decodeURIComponent(encodedSearchString);
    this.state = {
      searchString,
      questions: []
    }
  }

  componentWillMount() {
    DataAccess.getQuestionsBySearchString(this.state.searchString).then( questions => {
      console.log(questions);
      this.setState({questions: questions});
    });
  }

  render(){
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
            this.state.questions.map( q => {
              return (
                <Link to={`/question?${q.id}`} key={`question-${q.id}`} >
                  <QuestionListElement headerText={q.question} bodyText={q.answer} />
                </Link>
              );
            })
            }
            <div className='question-list-tail'>
              <button className='more-questions-button'>
                See more questions
              </button>
            </div>
            <div className='question-list-footer'>
                <div className='info-icon'>
                  ?
                </div>
                <div className='header-text'>
                  Doesn't answer your question?
                </div>
                <div className='ask-expert-button'>
                  Ask an expert
                </div>
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
      this.setState({questions: questions});
    });
  }
}
