import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  fetchSearchId,
} from './actions'

export const searchIdApi = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest())
    try {
      const response = await fetch(
        'https://aviasales-test-api.kata.academy/search',
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.searchId) {
        dispatch(fetchSearchId(data.searchId))
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.message))
    }
  }
}
export const fetchData = (searchId) => {
  return async (dispatch) => {
    let stop = false
    let errorCount = 0
    const fetchTickets = async () => {
      while (!stop) {
        dispatch(fetchDataRequest())
        try {
          const response = await fetch(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          dispatch(fetchDataSuccess(data.tickets))
          if (data.stop) {
            stop = true
            console.log('Stop condition met')
          }
        } catch (error) {
          dispatch(fetchDataFailure(error.message))
          errorCount++
          if (errorCount >= 10) {
            stop = true
            console.log('Stopped due to 10 errors')
          }
        }
      }
    }
    fetchTickets()
  }
}
