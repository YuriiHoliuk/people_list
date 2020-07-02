import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Person.css';

export const Person = memo(({ name, born, isSelected, onSelect }) => (
  <li
    className={isSelected ? 'selected' : ''}
  >
    <button
      type="button"
      onClick={onSelect}
    >
      {`${name} - ${born}`}
    </button>
  </li>
));

export const personType = {
  name: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
};

Person.defaultProps = {
  isSelected: false,
};

Person.propTypes = personType;
