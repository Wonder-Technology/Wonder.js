let create = (state: StateType.state): (StateType.state, StateType.gameObject) => {
  let uid = state.maxUID

  state.maxUID = uid->succ

  (state, uid)
}
