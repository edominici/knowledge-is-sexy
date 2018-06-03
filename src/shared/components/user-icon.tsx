import * as React from 'react';

interface UserIconProps {
  verified?: boolean
  className: string
  username?: string
}

export const UserIcon: React.SFC<UserIconProps> = (props) => {
  return (
    <div style={{position: 'relative', width: '60px'}} className={props.className}>
      <svg style={{fill: 'inherit'}} width='40px' height='40px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/>
      </svg>
      { 
        props.verified && 
        <svg style={{position: 'absolute', top: '-8px', right: '-1px'}} width='22px' height='22px' fill='#92d36e' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'/>
        </svg>
      }
      {
        props.username &&
        <div style={{width: '100%', position: 'absolute', bottom: '-10px', fontSize: '70%'}}>
          {props.username}
        </div>

      }
    </div>
  );
};
