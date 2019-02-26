import * as React from 'react';
import Carousel from 'nuka-carousel';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { SpeechBubble } from './shared/components/speech-bubble';
import { SearchBar } from './shared/components'
import { Question } from './shared/types';
import logo from './shared/images/kis-logo.svg';
import './landing.scss';
import { DataAccess } from './shared/data-access';

interface LandingProps extends RouteComponentProps<void> {
}

interface LandingState {
  shouldNavigateToBrowsePage: boolean
  shouldNavigateToSearchPage: boolean
  searchString: string
  popularQuestions: Question[]
}

export class Landing extends React.PureComponent<LandingProps, LandingState> {

  private dao: DataAccess;

  constructor(props: LandingProps) {
    super(props);
    this.state = {
      popularQuestions: [],
      shouldNavigateToBrowsePage: false,
      shouldNavigateToSearchPage: false,
      searchString: ''
    }
    const dao = DataAccess.getInstance();
    if (!dao) {
      throw new Error('Data Access Object uninitialized!');
    }
    this.dao = dao;
  }

  componentWillMount() {
    // fetch popular questions
    this.dao.getPopularQuestions(5).then( questions => {
      this.setState({
        popularQuestions: questions
      })
    })
  }

  public render() {
    if (this.state.shouldNavigateToSearchPage) {
      const encodedSearchStr = encodeURIComponent(this.state.searchString);
      return <Redirect push to={{
        pathname: '/search',
        search: `?q=${encodedSearchStr}`
      }} />
    } 
    if (this.state.shouldNavigateToBrowsePage) {
      return <Redirect push to={{
        pathname: '/browse',
      }} />
    } 
    return (
      <div className='landing-page'>
        <header className='landing-header'>
          <div className='landing-logo-container'>
            <div className='landing-title'>Knowledge Is&nbsp;<span className='landing-title-accent'>Sexy.</span></div>
            <img src={logo} className='landing-logo' alt='logo' />
          </div>
        </header>

        <div className='landing-content'>

          <div className='content-text'>
            <span className='content-text-accent'>Ask questions</span> about sex.
            <br />
            Get answers from <span className='content-text-accent'> the experts.</span>
          </div>

          <div className='landing-search-bar-container'>
            <SearchBar 
              value={this.state.searchString} 
              onChange={this.handleSearchStringChange} 
              onSearchButtonClick={this.handleSearchSubmit} 
            />
          </div>

          <div className='divider'>
            <div className='divider-line'/>
            <div className='divider-text'>
              or
            </div>
          </div>
          <div className='content-text'>
            See what other people are asking.
          </div>
          <div className='landing-carousel-container'>
            <Carousel
              slideWidth={1.0}
              disableKeyboardControls={true}
              initialSlideHeight={200}
              wrapAround={true}
              renderCenterLeftControls={({ previousSlide }: any) => {
                return <button onClick={previousSlide} className='landing-carousel-control'>&lt;</button>
              }}
              renderCenterRightControls={({ nextSlide }: any) => {
                return <button onClick={nextSlide} className='landing-carousel-control'>&gt;</button>
              }}
            >
              { this.state.popularQuestions.map( q => {
                return (
                  <div 
                    key={`question-${q.id}`} 
                    className="speech-bubble-container" 
                    onClick={() => this.props.history.push(`/question/${q.id}`)}
                  >
                    <SpeechBubble type={'question'}>
                      {q.question}
                    </SpeechBubble>
                  </div>);
              })}
            </Carousel>
          </div>
          <button 
            onClick={this.handleBrowseQuestionsClick}
            className='browse-questions-button'
          >
            Browse more questions
          </button>
        </div>
      </div>
    );
  }

  private handleSearchStringChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: ev.currentTarget.value
    });
  }

  private handleSearchSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      shouldNavigateToSearchPage: true
    });
  }

  private handleBrowseQuestionsClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    this.setState({
      shouldNavigateToBrowsePage: true
    });
  }
}
