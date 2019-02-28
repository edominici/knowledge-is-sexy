import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { Question } from './shared/types';
import { DataAccess } from './shared/data-access';
import { Navbar } from './shared/components/navbar';

import './landing.scss';

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

        <Navbar />

        <section className='hero is-fullheight-with-navbar is-primary is-bold kis-hero'>

          <div className='hero-body'>
            <div className='container'>

              {/*KIS title*/}
              {/*FIXME(mpingram) correct desktop-is-x / mobile-is-x once you get internet*/}
              <h1 className='title desktop-is-2 mobile-is-3 has-text-light landing-title'>
                Knowledge Is&nbsp;<span className='landing-title-accent'>Sexy.</span>
              </h1>
              <h3 className='subtitle desktop-is-3 mobile-is-4'>
                <strong>Ask questions</strong> about sex.
                <br />
                Get answers from <strong>the experts.</strong>
              </h3>

              {/*Search bar*/}
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

          <div className='container'>
          </div>

        </section>

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

  /*
  private handleBrowseQuestionsClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    this.setState({
      shouldNavigateToBrowsePage: true
    });
  }
  */
}
