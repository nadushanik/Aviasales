import { combineReducers } from 'redux'

import {
  TOGGLE_ALL,
  TOGGLE_FILTER,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_SEARCH_ID,
  SORT_TICKETS_BY_PRICE,
  SORT_TICKETS_BY_SPEED,
  SORT_TICKETS_BY_OPTIMALITY,
} from './actions'

const initialState = {
  all: true,
  filter0: true,
  filter1: true,
  filter2: true,
  filter3: true,
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ALL: {
      const newAllState = !state.all
      return {
        ...state,
        all: newAllState,
        filter0: newAllState,
        filter1: newAllState,
        filter2: newAllState,
        filter3: newAllState,
      }
    }

    case TOGGLE_FILTER: {
      const filterName = action.payload
      const currentState = state[filterName]
      const newFilterState = { ...state, [filterName]: !currentState }
      const allSelected = Object.keys(newFilterState)
        .filter((key) => key !== 'all')
        .every((key) => newFilterState[key])
      return { ...newFilterState, all: allSelected }
    }

    default:
      return state
  }
}

const initialApiState = {
  loading: false,
  tickets: [],
  searchId: null,
  error: '',
}

const dataReducer = (state = initialApiState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: [...state.tickets, ...action.payload],
        error: '',
      }
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case FETCH_SEARCH_ID:
      return {
        ...state,
        searchId: action.payload,
      }
    case SORT_TICKETS_BY_PRICE:
      return {
        ...state,
        tickets: [...state.tickets].sort((a, b) => a.price - b.price),
      }
    case SORT_TICKETS_BY_SPEED:
      return {
        ...state,
        tickets: [...state.tickets].sort((a, b) => {
          const aDuration = a.segments.reduce(
            (sum, segment) => sum + segment.duration,
            0,
          )
          const bDuration = b.segments.reduce(
            (sum, segment) => sum + segment.duration,
            0,
          )
          return aDuration - bDuration
        }),
      }
    case SORT_TICKETS_BY_OPTIMALITY:
      return {
        ...state,
        tickets: [...state.tickets].sort((a, b) => {
          const aDuration = a.segments.reduce(
            (sum, segment) => sum + segment.duration,
            0,
          )
          const bDuration = b.segments.reduce(
            (sum, segment) => sum + segment.duration,
            0,
          )
          const aOptimality = a.price / aDuration
          const bOptimality = b.price / bDuration
          return aOptimality - bOptimality
        }),
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  filter: filterReducer,
  data: dataReducer,
})

export default rootReducer
