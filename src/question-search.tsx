import * as React from 'react';

import { SearchBar } from './shared/components'
import { Question } from './shared/types';
import { QuestionListElement } from './question-list-element'

import './question-search.scss';


interface QuestionSearchProps {
  defaultSearchText?: string
}

interface QuestionSearchState {
  questions: Question[]
  searchText: string
}


function BackHeader(){
  return(
    <div className='question-back-bar-container'>
      <button className='question-back-button'>
        Back
      </button>
    </div>
  )
}

export class QuestionSearch extends React.Component<QuestionSearchProps, QuestionSearchState> {

  
  private handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    console.log(ev.currentTarget.value);
  };

  render(){
    return (
      <div className='page'>
        <BackHeader/>
        <div className='question-search-header'>
          <div className='header-search-bar-container'>
            <SearchBar onSubmit={this.handleSearchClick} />
          </div>
        </div>
        <div className='question-list-scroll-container'>
          <div className='question-list'>
          {this.state.questions.map((question: Question) => <QuestionListElement
                                              headerText={question.question}
                                              bodyText={question.answer}/>)}
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='I have a really really really long, super big and hard question. How can I make it fit?' 
              bodyText={'First off, I\'ve seen bigger. Second off, it doesn\'t matter how big the question is, it matters how good of a dick joke it was.'}  
            />
            <QuestionListElement 
              headerText='How do you come up with questions about sex on the fly?' 
              bodyText='I should have downloaded all of the questions before losing my wifi.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <QuestionListElement 
              headerText='How do you heal dick burns?' 
              bodyText='The best way to heal dick burns is to not get them in the first place, Staniel.' 
            />
            <div className='question-list-tail'>
              <button className='more-questions-button'>
                See more questions
              </button>
            </div>
            { /* question list footer */ }
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
}
