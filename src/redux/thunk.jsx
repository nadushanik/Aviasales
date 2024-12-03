import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  fetchSearchId,
} from './actions'

export const searchIdApi = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest())
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        dispatch(fetchSearchId(data.searchId))
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message))
      })
  }
}

export const fetchData = (searchId) => {
  return (dispatch) => {
    dispatch(fetchDataRequest())
    fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        dispatch(fetchDataSuccess(data.tickets))
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message))
      })
  }
}
