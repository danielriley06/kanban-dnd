import React, { PureComponent } from 'react';
import mosaicLogo from '../assets/mosaic-logo.svg';

export default class GlobalHeader extends PureComponent {
  render() {
    return (
      <div>
        <img src={mosaicLogo} alt="wynd-logo" width="44px" />
      </div>
    );
  }
}
