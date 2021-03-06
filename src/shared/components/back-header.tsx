import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './back-header.scss';

interface BackHeaderProps extends RouteComponentProps<void> {
  routeTo?: string
}

const BackHeaderWithoutRouter = (props: BackHeaderProps) => {
  if (props.routeTo === undefined) {
    return <div className='back-bar-container'>
        <button onClick={ ev => props.history.goBack() } className='back-button'>
            &lt; Back
        </button>
      </div>

  } else {
    return <div className='back-bar-container'>
        <button onClick={ ev => props.history.push(props.routeTo as string) } className='back-button'>
          &lt; Back
        </button>
      </div>
  }
}

export const BackHeader = withRouter(BackHeaderWithoutRouter)