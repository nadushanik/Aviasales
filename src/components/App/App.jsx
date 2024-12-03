import React from 'react'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Main from '../Main/Main'

import styles from './App.module.scss'
const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
