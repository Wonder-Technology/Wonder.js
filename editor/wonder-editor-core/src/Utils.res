let buildAPI = (): Type.api => {
  {
    ui: UI.buildAPI(),
    eventManager: EventManager.buildAPI(),
  }
}
