import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import uniqueKey from '../../utilites/uniqueKey'
import { searchIdApi, fetchData } from '../../redux/thunk'
import {
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
} from '../../redux/actions'
import Ticket from '../Ticket/Ticket'

import styles from './Tickets.module.scss'

const Tickets = ({
  searchId,
  tickets,
  loading,
  searchIdApi,
  fetchData,
  filters,
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
}) => {
  const [displayedTicketsCount, setDisplayedTicketsCount] = useState(5)

  useEffect(() => {
    searchIdApi()
  }, [searchIdApi])

  useEffect(() => {
    if (searchId) {
      fetchData(searchId)
    }
  }, [searchId, fetchData])

  useEffect(
    () => {
      sortTicketsByPrice()
      sortTicketsBySpeed()
      sortTicketsByOptimality()
    },
    [sortTicketsByPrice],
    [sortTicketsBySpeed],
    [sortTicketsByOptimality],
  )

  if (loading) {
    return <div>Loading...</div>
  }

  const filteredTickets = tickets.filter((ticket) => {
    return ticket.segments.every((segment) => {
      const stopsCount = segment.stops.length
      return filters[`filter${stopsCount}`]
    })
  })

  const handleLoadMore = () => {
    setDisplayedTicketsCount((prevCount) => prevCount + 5)
  }

  return (
    <div className={styles.ticket_list}>
      {filteredTickets.slice(0, displayedTicketsCount).map((ticket) => (
        <Ticket key={uniqueKey()} {...ticket} />
      ))}
      {filteredTickets.length > displayedTicketsCount && (
        <button
          type="button"
          className={styles.button}
          onClick={handleLoadMore}
        >
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
      {filteredTickets.length === 0 && (
        <span className={styles.text}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </span>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchId: state.data.searchId,
  tickets: state.data.tickets,
  loading: state.data.loading,
  error: state.data.error,
  filters: state.filter,
})

const mapDispatchToProps = {
  searchIdApi,
  fetchData,
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
