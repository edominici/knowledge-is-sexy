import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Question } from './shared/types';
import { DataAccess } from './shared/data-access';

import './question-search.scss';

interface QuestionSearchProps {
  // FIXME(mpingram) hacky workarounds for the React router typings
  location?: any
  history?: any
  dao: DataAccess
}

interface QuestionSearchState {
  questions: Question[]
  searchString: string
  navigateToAskExpertPage: boolean
  queryPrefix: string
}

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
      questions: [],
      navigateToAskExpertPage: false,
    }
  }

  componentWillMount() {
    this.props.dao.getQuestionsBySearchString(this.state.searchString).then( questions => {
      this.setState({questions: questions});
    });
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
      <div> 
        {/* Search bar */}
        <div style={{marginBottom: '1rem'}} className='hero is-primary is-small'>
          <div className='hero-body'>

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
        </div>

        {/* List of questions */}
        <div >
          <div className='container'>
            {this.state.questions.map( q => {
              return (
                <article 
                  className='media'
                  key={`question-${q.id}`} 
                >
                  <div className='media-left'>

                    <div>
                      {/* Number of upvotes*/}
                      <span className='icon has-text-grey-light has-text-right'>
                        {q.numUpvotes}
                      </span>
                      <span className='icon has-text-grey-light has-text-centered'>
                        <i className='fas fa-caret-up' />
                      </span>
                    </div>

                    <div>
                      {/* Number of answers */}
                      <span className='icon has-text-primary has-text-right'>
                        1
                      </span>
                      <span className='icon has-text-primary has-text-centered'>
                        <i className='fas fa-comments' />
                      </span>
                    </div>
                    
                  </div>
                  <div className='content'>
                    {/* Question title */}
                    <a href={`/question/${q.id}`} >
                      {q.question}
                    </a>
                    { /* Tags */}
                    <div className='tags'>
                      {q.tags.map( tag => {
                        return <a key={tag} href={`/browse?tag=${tag}`} className='tag'>{tag}</a>
                      })}
                    </div>
                  </div>
                </article>
              );
            })
            }
          </div>
        </div>


        {/* Footer */}
        <footer className='footer is-small has-background-light'>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>

            <div style={{marginBottom: '0.5rem'}} className='has-text-centered'>
              <span className='icon has-text-primary'>
                <i className='fas fa-3x fa-info-circle' />
              </span>
            </div>

            <div style={{marginBottom: '1rem'}} className='has-text-centered'>
              <h4 className='title is-4 has-text-primary has-text-centered'>
                Doesn't answer your question?
              </h4>
            </div>

            <div className='has-text-centered'>
              <button className='button is-large is-info is-medium' onClick={this.handleAskExpertClick}>
                Ask an expert
              </button>
            </div>

          </div>
        </footer>

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

  private handleAskExpertClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    this.setState({
      navigateToAskExpertPage: true
    })

  }

}
