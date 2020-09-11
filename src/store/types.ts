
// this is the interface for representing errors from the backend (firebase)
export interface BackendError {
    code?: number
    error: string
}