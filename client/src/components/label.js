import React from 'react';
import PropTypes from 'prop-types'

export default class Label extends React.Component {
  render () {
    return (
      <div>
        <div>{this.props.label}</div>
      </div>
    );
  }
}

Label.propTypes = {
  label: PropTypes.string
};
