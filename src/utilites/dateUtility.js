const getTravelTime = (duration) => {
  const hours = Math.trunc(duration / 60)
  const min = duration % 60
  return `${hours}ч ${min}м`
}
export { getTravelTime }
const getDepartureTime = (date) => {
  const departureDate = new Date(date)
  const hours = departureDate.getHours().toString().padStart(2, '0')
  const minutes = departureDate.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
export { getDepartureTime }
const getArrivalTime = (date, duration) => {
  const departureDate = new Date(date)
  const arrivalDate = new Date(departureDate.getTime() + duration * 60000)
  const hours = arrivalDate.getHours().toString().padStart(2, '0')
  const minutes = arrivalDate.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
export { getArrivalTime }
