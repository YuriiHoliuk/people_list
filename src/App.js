import React from 'react';
import { People } from './components/People';
import { loadPeople } from './constants/people';

export class App extends React.Component {
  allPeople = null;

  state = {
    people: null,
    isReady: false,
    sortBy: 'name',
    filterBy: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.allPeople) {
      return;
    }

    const { sortBy, filterBy } = this.state;

    if (sortBy !== prevState.sortBy || filterBy !== prevState.filterBy) {
      const updatedPeople = this.filterAndSortPeople(this.allPeople, filterBy, sortBy);

      this.setState({
        people: updatedPeople,
      });
    }
  }

  start = () => {
    const { sortBy, filterBy } = this.state;
    const people = loadPeople();

    this.allPeople = people;

    this.setState({
      people: this.filterAndSortPeople(people, filterBy, sortBy),
      isReady: true,
    });
  }

  filterAndSortPeople(people, filterBy, sortBy) {
    const filteredPeople = this.filterPeople(people, filterBy);
    const filteredAndSortedPeople = this.sortPeople(filteredPeople, sortBy);

    return filteredAndSortedPeople;
  }

  filterPeople(people, filterBy) {
    if (!filterBy) {
      return people;
    }

    return people.filter(person => person[filterBy.key] === filterBy.value);
  }

  sortPeople(people, sortBy) {
    return [...people]
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'born':
            return a.born - b.born;
        }
      });
  }

  changeFilterBy = (filterBy) => {
    this.setState({
      filterBy,
    });
  };

  showOnlyWomen = () => {
    this.changeFilterBy({
      key: 'sex',
      value: 'f',
    });
  }

  showAll = () => {
    this.changeFilterBy(null);
  }

  changeSortBy = (sortBy) => {
    this.setState({
      sortBy,
    });
  };

  render() {
    const { people, isReady, sortBy } = this.state;

    return (
      <div className="App">
        <h1>People</h1>

        {
          isReady
            ? (
              <People
                people={people}
                showOnlyWomen={this.showOnlyWomen}
                showAll={this.showAll}
                sortBy={sortBy}
                changeSortBy={this.changeSortBy}
              />
            )
            : (
              <button
                type="button"
                onClick={this.start}
              >
                Start
              </button>
            )
        }
      </div>
    );
  }
}
