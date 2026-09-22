import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../App"

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.restoreAllMocks()
})

test("renders the chatbot input", () => {
  render(<App />)

  expect(screen.getByRole("heading", { name: "Chatbot" })).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: "Message" })).toBeInTheDocument()
})

test("sends a message and renders the response", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ data: "Hey!" }),
  })

  render(<App />)
  const input = screen.getByRole("textbox", { name: "Message" })

  fireEvent.change(input, { target: { value: "hello" } })
  fireEvent.submit(screen.getByRole("button", { name: "Send" }))

  expect(screen.getByText("hello")).toBeInTheDocument()
  await waitFor(() => expect(screen.getByText("Hey!")).toBeInTheDocument())
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:5000/chatbot?message=hello",
    {},
  )
})

test("does not send an empty message", () => {
  render(<App />)

  fireEvent.submit(screen.getByRole("button", { name: "Send" }))

  expect(global.fetch).not.toHaveBeenCalled()
})

test("shows an API error", async () => {
  global.fetch.mockResolvedValue({
    ok: false,
    json: async () => ({ error: "The message is required" }),
  })

  render(<App />)
  const input = screen.getByRole("textbox", { name: "Message" })

  fireEvent.change(input, { target: { value: "hello" } })
  fireEvent.submit(screen.getByRole("button", { name: "Send" }))

  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The message is required",
    ),
  )
})
