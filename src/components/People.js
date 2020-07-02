import React from 'react';
import { PeopleList } from './PeopleList';

export const People = (props) => {
  const { people, showOnlyWomen, showAll, sortBy, changeSortBy } = props;

  return (
    <div>
      <button
        type="button"
        onClick={showOnlyWomen}
      >
        Show only women
      </button>
    
      <button
        type="button"
        onClick={showAll}
      >
        Show all
      </button>

      <select
        name="sortBy"
        value={sortBy}
        onChange={event => changeSortBy(event.target.value)}
      >
        <option value="born">Born</option>
        <option value="name">Name</option>
      </select>

      <PeopleList
        people={people}
      />
    </div>
  );
}
