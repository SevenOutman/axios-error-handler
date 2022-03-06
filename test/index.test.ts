import { describe, test, expect, vi, afterEach } from "vitest"
import { createErrorHandler } from "../src"

afterEach(() => {
  vi.clearAllMocks()
})

describe("createErrorHandler", () => {
  test("run noResponse callback when respones is missing from the AxiosError", () => {
    const thrown = {}
    const callbacks = {
      noResponse: vi.fn(),
    }

    createErrorHandler(callbacks)(thrown as any)

    expect(callbacks.noResponse).toHaveBeenCalledWith(thrown)
  })

  test.each([200, 201, 204])("run 2xx callback when status is %i", (status) => {
    const thrown = { response: { status } }
    const callbacks = {
      "2xx": vi.fn(),
    }

    createErrorHandler(callbacks)(thrown as any)

    expect(callbacks["2xx"]).toHaveBeenCalledWith(thrown)
  })

  test.each([400, 401, 403, 404, 409, 422])(
    "run 4xx callback when status is %i",
    (status) => {
      const thrown = { response: { status } }
      const callbacks = {
        "4xx": vi.fn(),
      }

      createErrorHandler(callbacks)(thrown as any)

      expect(callbacks["4xx"]).toHaveBeenCalledWith(thrown)
    },
  )

  test.each([500, 502, 503, 504])(
    "run 5xx callback when status is %i",
    (status) => {
      const thrown = { response: { status } }
      const callbacks = {
        "5xx": vi.fn(),
      }

      createErrorHandler(callbacks)(thrown as any)

      expect(callbacks["5xx"]).toHaveBeenCalledWith(thrown)
    },
  )

  test("run default callback when no corresponding status callback is specified", () => {
    const thrown = { response: { status: 401 } }
    const callbacks = {
      default: vi.fn(),
    }

    createErrorHandler(callbacks)(thrown as any)

    expect(callbacks.default).toHaveBeenCalledWith(thrown)
  })

  test("don't run default callback when corresponding status callback is specified", () => {
    const thrown = { response: { status: 401 } }
    const callbacks = {
      401: vi.fn(),
      default: vi.fn(),
    }

    createErrorHandler(callbacks)(thrown as any)

    expect(callbacks.default).not.toHaveBeenCalledWith(thrown)
  })
})
