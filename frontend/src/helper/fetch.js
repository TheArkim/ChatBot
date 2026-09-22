const fetchData = async (endpoint, { query, ...options } = {}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL

  if (!baseUrl) {
    throw new Error("REACT_APP_BASE_URL is not configured")
  }

  const url = new URL(endpoint, `${baseUrl.replace(/\/+$/, "")}/`)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const response = await fetch(url.toString(), options)
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error || "Unable to contact the chatbot")
  }

  return payload
}

export default fetchData
