export const TOGGLE_ALL = 'TOGGLE_ALL'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const FETCH_SEARCH_ID = 'FETCH_SEARCH_ID'
export const SORT_TICKETS_BY_PRICE = 'SORT_TICKETS_BY_PRICE'
export const SORT_TICKETS_BY_SPEED = 'SORT_TICKETS_BY_SPEED'
export const SORT_TICKETS_BY_OPTIMALITY = 'SORT_TICKETS_BY_OPTIMALITY'

export const toggleAll = () => ({
  type: TOGGLE_ALL,
})

export const toggleFilter = (filter) => ({
  type: TOGGLE_FILTER,
  payload: filter,
})

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
})

export const fetchDataSuccess = (tickets) => ({
  type: FETCH_DATA_SUCCESS,
  payload: tickets,
})

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
})

export const fetchSearchId = (searchId) => ({
  type: FETCH_SEARCH_ID,
  payload: searchId,
})

export const sortTicketsByPrice = () => ({
  type: SORT_TICKETS_BY_PRICE,
})

export const sortTicketsBySpeed = () => ({
  type: SORT_TICKETS_BY_SPEED,
})
export const sortTicketsByOptimality = () => ({
  type: SORT_TICKETS_BY_OPTIMALITY,
})
