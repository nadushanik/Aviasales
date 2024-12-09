import React from 'react'

import logo from './Logo.png'
import styles from './Header.module.scss'

const Header = () => (
  <div className={styles.header}>
    <img className={styles.logo} alt="logo" src={logo} />
  </div>
)
export default Header
