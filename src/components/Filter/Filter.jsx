import React from 'react'
import { connect } from 'react-redux'

import { toggleAll, toggleFilter } from '../../redux/actions'

import styles from './Filter.module.scss'

const Filter = ({ filters, toggleAll, toggleFilter }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <input
            type="checkbox"
            id="all"
            name="All"
            className={styles.checkbox}
            checked={filters.all}
            onChange={toggleAll}
          />
          <label htmlFor="all" className={styles.label}>
            Все
          </label>
        </li>
        {Object.keys(filters)
          .filter((key) => key !== 'all')
          .map((filter) => (
            <li className={styles.item} key={filter}>
              <input
                type="checkbox"
                id={`${filter}_transfer`}
                name={filter}
                className={styles.checkbox}
                checked={filters[filter]}
                onChange={() => toggleFilter(filter)}
              />
              <label htmlFor={`${filter}_transfer`} className={styles.label}>
                {filter === 'filter0'
                  ? 'Без пересадок'
                  : filter === 'filter1'
                    ? '1 пересадка'
                    : filter === 'filter2'
                      ? '2 пересадки'
                      : filter === 'filter3'
                        ? '3 пересадки'
                        : ''}
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  filters: state.filter,
})

const mapDispatchToProps = {
  toggleAll,
  toggleFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
