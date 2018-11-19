import * as React from 'react';

import './search-bar.scss';

interface SearchBarProps {
  value: string
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  onSearchButtonClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}
export  const SearchBar: React.SFC<SearchBarProps> = props => {
  return (<div className='search-bar-container'>
    <input value={props.value} onChange={props.onChange} type='search' className='search-bar' placeholder='#AskQuestions'/>
    <button className='search-bar-submit-button' onClick={props.onSearchButtonClick}>Ask</button>
  </div>);
};