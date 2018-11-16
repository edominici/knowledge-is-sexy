import * as React from 'react';

import './search-bar.scss';

interface SearchBarProps {
  onSubmit: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}
export  const SearchBar: React.SFC<SearchBarProps> = props => {
  return (<div className='search-bar-container'>
    <input type='search' className='search-bar' placeholder='#AskQuestions'/>
    <button className='search-bar-submit-button' onClick={props.onSubmit}>Ask</button>
  </div>);
};