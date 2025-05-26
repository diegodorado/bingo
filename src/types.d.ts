declare global {
  type State = {
    // a way to migrate old persisted states
    version: number
    name: string
  }
}
