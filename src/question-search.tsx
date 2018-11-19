import * as React from 'react';

import { SearchBar } from './shared/components'

import './question-search.scss';

interface QuestionListElementProps {
  headerText: string
  bodyText: string
}
const QuestionListElement: React.SFC<QuestionListElementProps> = (props) => {
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

export const QuestionSearch: React.SFC<any> = (props) => {

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    console.log(ev.currentTarget.value);
  };

  return (
    <div className='page'>
      <div className='question-search-header'>
        <div className='header-search-bar-container'>
          <SearchBar onSubmit={handleSearchClick} />
        </div>
      </div>
      <div className='question-list-scroll-container'>
        <div className='question-list'>
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
