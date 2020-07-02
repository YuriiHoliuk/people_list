import React from 'react';
import PropTypes from 'prop-types';
import { Person, personType } from './Person';

export class PeopleList extends React.Component {
  state = {
    selectedPersonName: null,
  };

  selectPerson = (name) => {
    this.setState({ selectedPersonName: name });
  }

  render() {
    const { selectedPersonName } = this.state;
    const { people } = this.props;

    return (
      <ol>
        {people.map((person) => (
          <Person
            key={person.name}
            name={person.name}
            born={person.born}
            isSelected={selectedPersonName === person.name}
            onSelect={() => this.selectPerson(person.name)}
          />
        ))}
      </ol>
    );
  }
};

/**
 * 1 - робочий
 * 2 - гарний
 * 3 - продуктивний
 */

PeopleList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape(personType),
  ).isRequired,
}
