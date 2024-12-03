import React from 'react'

import Filter from '../Filter/Filter'

import styles from './Sidebar.module.scss'

const Sidebar = () => (
  <div className={styles.sidebar}>
    <Filter />
  </div>
)
export default Sidebar
