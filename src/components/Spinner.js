import React from 'react';
import { css } from '@emotion/react';
import ClockLoader from 'react-spinners/ClockLoader';

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
        <ClockLoader css={override} size={55} color={'#36D7B7'} loading={this.state.loading} speedMultiplier={1} />
        <p>Chargement en cours</p>
        <style jsx>{`
          p {
            color: #36d7b7;
            display: flex;
            justify-content: center;
            margin-top: 0.8rem;
          }
        `}</style>
      </div>
    );
  }
}
