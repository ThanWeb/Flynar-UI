const checkLoggedIn = (): boolean => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (accessToken !== null) {
    return true
  }
  return false
}

export default checkLoggedIn
