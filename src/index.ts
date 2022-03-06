import type { AxiosError } from "axios"

type CallbackBranch =
  | `${2 | 3 | 4 | 5}xx`
  | "200"
  | "201"
  | "401"
  | "422"
  | "503"
  | "default"
  | "noResponse"

type AxiosErrorHandler = (thrown: AxiosError) => any

export const createErrorHandler =
  (callbacks: {
    [key in CallbackBranch]?: AxiosErrorHandler
  }) =>
  (thrown: AxiosError) => {
    if (!thrown.response) {
      callbacks.noResponse?.(thrown)
    } else {
      if (thrown.response.status >= 500) {
        callbacks["5xx"]?.(thrown)
      } else if (thrown.response.status >= 400) {
        callbacks["4xx"]?.(thrown)
      } else if (thrown.response.status >= 300) {
      } else if (thrown.response.status >= 200) {
        callbacks["2xx"]?.(thrown)
      }

      const branch = thrown.response.status as unknown as CallbackBranch

      if (branch in callbacks) {
        callbacks[branch]?.(thrown)
      } else {
        callbacks.default?.(thrown)
      }
    }
  }
