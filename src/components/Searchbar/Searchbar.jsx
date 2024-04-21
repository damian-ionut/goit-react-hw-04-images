import { Component } from 'react';
import PropTypes from "prop-types";
import { FiSearch } from 'react-icons/fi';

import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.props.onSubmit}>
          <button type="submit" className={styles.searchButton}>
            <FiSearch />
          </button>
          <input
            className={styles.searchInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
