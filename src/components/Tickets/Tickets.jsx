import React, { useEffect, useState, useRef, useMemo } from 'react'
import { connect } from 'react-redux'

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
  searchIdApi,
  fetchData,
  loading,
  filters,
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
}) => {
  const [displayedTicketsCount, setDisplayedTicketsCount] = useState(5)
  const hasFetchedSearchId = useRef(false)

  useEffect(() => {
    if (!searchId && !hasFetchedSearchId.current) {
      hasFetchedSearchId.current = true
      searchIdApi()
    }
  }, [searchId, searchIdApi])

  useEffect(() => {
    if (searchId) {
      fetchData(searchId)
    }
  }, [searchId, fetchData])

  useEffect(() => {
    sortTicketsByPrice()
    sortTicketsBySpeed()
    sortTicketsByOptimality()
  }, [sortTicketsByPrice, sortTicketsBySpeed, sortTicketsByOptimality])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      return ticket.segments.every((segment) => {
        const stopsCount = segment.stops.length
        return filters[`filter${stopsCount}`]
      })
    })
  }, [tickets, filters])

  const handleLoadMore = () => {
    setDisplayedTicketsCount((prevCount) => prevCount + 5)
  }
  if (tickets.length === 0) {
    return <div className={styles.loader}>Loading...</div>
  }
  return (
    <div className={styles.ticket_list}>
      {loading && <div className={styles.loader}>Loading...</div>}
      {filteredTickets.length === 0 ? (
        <div className={styles.no_tickets_message}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      ) : (
        <>
          {filteredTickets
            .slice(0, displayedTicketsCount)
            .map((ticket, index) => (
              <Ticket key={index} {...ticket} />
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
        </>
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
  stop: state.data.stop,
})

const mapDispatchToProps = {
  searchIdApi,
  fetchData,
  sortTicketsByPrice,
  sortTicketsBySpeed,
  sortTicketsByOptimality,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
