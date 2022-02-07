type id = string

type init = unit => unit
type addExecFunc
type removeExecFunc
type setState
type markRender
type dispatch
type useSelector
type render
type buildAPI
type register

type getData = {
  init: init,
  addExecFunc: addExecFunc,
  removeExecFunc: removeExecFunc,
  setState: setState,
  markRender: markRender,
  dispatch: dispatch,
  useSelector: useSelector,
  render: render,
  buildAPI: buildAPI,
  register: register,
}

type execFunc

type uiState

type registerData = {
  id: id,
  func: execFunc,
  stateValue: uiState,
}

type states = WonderCommonlib.MutableHashMap.t<id, uiState>

type state = {
  execFuncMap: WonderCommonlib.MutableHashMap.t<id, execFunc>,
  stateMap: states,
  isRenderMap: WonderCommonlib.MutableHashMap.t<id, bool>,
}
type stateContainer = {mutable state: option<state>}
