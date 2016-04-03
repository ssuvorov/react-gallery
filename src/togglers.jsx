import React from 'react';

const { PropTypes } = React;

const Togglers = ({modifier, onPrevClick, onNextClick }) => {
  return (
    <div className={`${modifier}__togglers`}>
      <a className={`${modifier}__image-toggler ${modifier}__image-toggler--prev`}
        href="#"
        onClick={onPrevClick}
      >
        <span className={`${modifier}__toggler-icon icon-thin-arrow-prev`}></span>
      </a>
      <a className={`${modifier}__image-toggler ${modifier}__image-toggler--next`}
        href="#"
        onClick={onNextClick}
      >
        <span className={`${modifier}__toggler-icon icon-thin-arrow-next`}></span>
      </a>
    </div>
  )
};

Togglers.propTypes = {
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  modifier: PropTypes.string.isRequired
};

export default Togglers;
