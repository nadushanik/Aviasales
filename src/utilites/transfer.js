const transfer = (num) => {
  switch (num) {
    case 1:
      return 'ПЕРСАДКА'
    case 2:
    case 3:
    case 4:
      return 'ПЕРЕСАДКИ'
    default:
      return 'ПРЕСАДОК'
  }
}

export default transfer
