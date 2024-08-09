const BaseURL = process.env.REACT_APP_BASE_URL

const fecthData = (endpoint, data = { message: "" }) => {
  try {
    const url = `${BaseURL}/${endpoint}`
    return fetch(url)
  } catch (error) {
    throw new Error(error)
  }
}

export default fecthData
