declare global {
  interface Window {
    monaco?: {
      KeyMod: {
        CtrlCmd: number
      }
      KeyCode: {
        Enter: number
      }
    }
  }
}
