/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, Fragment } from 'react';
import StyleGuide from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';

export default class StyleGuideRenderer extends Component {
  render() {
    return (
      <Fragment>
        <StyleGuide {...this.props} />
      </Fragment>
    );
  }
}
