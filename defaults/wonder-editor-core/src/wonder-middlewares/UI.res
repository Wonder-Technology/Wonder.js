type id = string

type execFunc

type uiState

type registerData = {
  id: id,
  func: execFunc,
  stateValue: uiState,
}

type stateMap = WonderCommonlib.MutableHashMap.t<id, uiState>

type state = {
  execFuncMap: WonderCommonlib.MutableHashMap.t<id, execFunc>,
  stateMap: stateMap,
  isRenderMap: WonderCommonlib.MutableHashMap.t<id, bool>,
}

type init = unit => state
type addExecFunc
type removeExecFunc
type setState
type markRender
type dispatch
type useSelector
type render
type drawButton
// type buildAPI
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
  drawButton: drawButton,
  // buildAPI: buildAPI,
  register: register,
}

let markNotRender = (state, id: id): unit => {
  state.isRenderMap->WonderCommonlib.MutableHashMap.set(id, false)->ignore
}

let markRender = (state, id: id): unit => {
  state.isRenderMap->WonderCommonlib.MutableHashMap.set(id, true)->ignore
}

let init = () => {
  {
    execFuncMap: WonderCommonlib.MutableHashMap.createEmpty(),
    stateMap: WonderCommonlib.MutableHashMap.createEmpty(),
    isRenderMap: WonderCommonlib.MutableHashMap.createEmpty(),
  }
}

let _markAllNotRender = state => {
  let {isRenderMap} = state

  // TODO add entries to MutableHashMap, ImmutableHashMap ?
  isRenderMap
  ->WonderCommonlib.HashMap.entries
  ->WonderCommonlib.ArraySt.forEach(((id, isRender)) => {
    isRender
      ? {
          markNotRender(state, id)
        }
      : ()
  })

  state
}

let render = (states: Type.states) => {
  let {middlewareState} = states

  let state: state = MiddlewareManager.unsafeGetState(middlewareState, "UI")->Obj.magic

  let {isRenderMap, execFuncMap, stateMap} = state

  let states =
    // TODO add entries to MutableHashMap, ImmutableHashMap ?
    isRenderMap
    ->WonderCommonlib.HashMap.entries
    ->WonderCommonlib.ArraySt.reduceOneParam((. states, (id, isRender)) => {
      isRender
        ? {
            let execFunc = execFuncMap->WonderCommonlib.MutableHashMap.unsafeGet(id)

            states->(execFunc->Obj.magic)(Utils.buildAPI())
          }
        : states
    }, states)

  let state = state->_markAllNotRender

  let middlewareState = middlewareState->MiddlewareManager.setState("UI", state-> Obj.magic)

  {
    ...states,
    middlewareState: middlewareState,
  }
}

let addExecFunc = (state, id: id, func: execFunc) => {
  {
    ...state,
    execFuncMap: state.execFuncMap->WonderCommonlib.MutableHashMap.set(id, func),
  }
}

// TODO remove?
let removeExecFunc = (state, id: id) => {
  {
    ...state,
    execFuncMap: state.execFuncMap->WonderCommonlib.MutableHashMap.deleteVal(id),
  }
}

// TODO rename
let setState = (state, id: id, uiState: uiState) => {
  {
    ...state,
    stateMap: state.stateMap->WonderCommonlib.MutableHashMap.set(id, uiState),
  }
}

let drawButton = %raw(`
// function(states, state, x,y,width,height,text,onClickFunc) {
function(states, x,y,width,height,text,onClickFunc) {
  /////*! only read state, not write it */
  /*! get state from states */

  let id = "_" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }


let button = document.createElement("button")

button.style.position = "absolute"
button.style.left = x + "px"
button.style.top = y + "px"
button.style.width = width + "px"
button.style.height = height + "px"
button.innerHTML =text

// TODO fix onclick, should return states
button.onclick = (e) => onClickFunc(states, e)
button.id = id

  document.body.appendChild(
    button
  )

  return states
}
`)

let dispatch = (
  state,
  (actionType: string, eventName: EventManager.eventName, eventHandler: Type.handlerFunc),
) => {
  switch actionType {
  | "submit" =>
    // TODO should compare whether state is change or not

    let id = "showAllRegisteredEventHandlers"

    let uiState: Type.showAllEventHandlersUIState =
      state.stateMap->Obj.magic->WonderCommonlib.MutableHashMap.unsafeGet(id)

    // setState({
    //   ...state,
    //   stateMap: state.stateMap
    //   ->Obj.magic
    //   ->WonderCommonlib.MutableHashMap.set(
    //     "showAllRegisteredEventHandlers",
    //     {
    //       ...state,
    //       eventHandlerArr: state.eventHandlerArr->WonderCommonlib.ArraySt.push({
    //         eventName: eventName,
    //         handlerFunc: eventHandler,
    //       }),
    //     },
    //   ),
    // })

    uiState.eventHandlerArr
    ->WonderCommonlib.ArraySt.push({
      eventName: eventName,
      handlerFunc: eventHandler,
    })
    ->ignore

    state.isRenderMap->WonderCommonlib.MutableHashMap.set(id, true)->ignore
  }

  state
}

let useSelector = (uiState: uiState) => {
  // TODO finish
  uiState
}

let register = (state, {id, func, stateValue}: registerData) => {
  state->removeExecFunc(id)->addExecFunc(id, func)->setState(id, stateValue)->markRender(id)
}

// let buildAPI = (): Type.uiAPI => {
//   // addExecFunc: addExecFunc->Obj.magic,
//   // removeExecFunc: removeExecFunc->Obj.magic,
//   // setState: setState->Obj.magic,
//   register: register->Obj.magic,
//   drawButton: drawButton->Obj.magic,
//   dispatch: dispatch->Obj.magic,
//   useSelector: useSelector->Obj.magic,
//   // markRender: markRender->Obj.magic,
// }

let getData = (): getData => {
  {
    init: init->Obj.magic,
    addExecFunc: addExecFunc->Obj.magic,
    removeExecFunc: removeExecFunc->Obj.magic,
    setState: setState->Obj.magic,
    markRender: markRender->Obj.magic,
    dispatch: dispatch->Obj.magic,
    useSelector: useSelector->Obj.magic,
    render: render->Obj.magic,
    drawButton: drawButton->Obj.magic,
    // buildAPI: buildAPI->Obj.magic,
    register: register->Obj.magic,
  }
}
