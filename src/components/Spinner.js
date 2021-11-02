import React from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

export default class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className='sweet-loading'>
          <PacmanLoader css={override} size={35} color={'#36D7B7'} loading={this.state.loading} speedMultiplier={1} />
          <p>loading...</p>
        <style jsx>{`
          p {
            color: #36D7B7;
            display: flex;
            justify-content: center;
            margin-top: 3rem;
            padding-left: 3rem;
          }
        `}</style>
      </div>
    );
  }
}
