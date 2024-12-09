import React, { useState } from 'react'
import { connect } from 'react-redux'

import Tickets from '../Tickets/Tickets'
import {
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
} from '../../redux/actions'

import styles from './Main.module.scss'

const Main = ({
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
}) => {
  const [selectedTab, setSelectedTab] = useState('cheapest')

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
    if (tab === 'cheapest') {
      sortTicketsByPrice()
    } else if (tab === 'fastest') {
      sortTicketsBySpeed()
    } else if (tab === 'optimal') {
      sortTicketsByOptimality()
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div
          role="presentation"
          className={`${styles.tab} ${selectedTab === 'cheapest' ? styles.select : ''}`}
          onClick={() => handleTabClick('cheapest')}
        >
          <span>САМЫЙ ДЕШЕВЫЙ</span>
        </div>
        <div
          role="presentation"
          className={`${styles.tab} ${selectedTab === 'fastest' ? styles.select : ''}`}
          onClick={() => handleTabClick('fastest')}
        >
          <span>САМЫЙ БЫСТРЫЙ</span>
        </div>
        <div
          role="presentation"
          className={`${styles.tab} ${selectedTab === 'optimal' ? styles.select : ''}`}
          onClick={() => handleTabClick('optimal')}
        >
          <span>ОПТИМАЛЬНЫЙ</span>
        </div>
      </div>
      <Tickets />
    </div>
  )
}

const mapDispatchToProps = {
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
}

export default connect(null, mapDispatchToProps)(Main)
