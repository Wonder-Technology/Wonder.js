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
}

type execFunc

type uiState

type states = WonderCommonlib.MutableHashMap.t<id, uiState>

type state = {
  execFuncMap: WonderCommonlib.MutableHashMap.t<id, execFunc>,
  stateMap: states,
  isRenderMap: WonderCommonlib.MutableHashMap.t<id, bool>,
}
type stateContainer = {mutable state: option<state>}

let _createStateContainer = (): stateContainer => {state: None}

let stateContainer = _createStateContainer()

let setState = (state: state) => {
  stateContainer.state = state->Some

  ()
}

let unsafeGetState = () => {
  stateContainer.state->Belt.Option.getUnsafe
}

let markNotRender = (id: id): unit => {
  unsafeGetState().isRenderMap->WonderCommonlib.MutableHashMap.set(id, false)->ignore
}

let markRender = (id: id): unit => {
  unsafeGetState().isRenderMap->WonderCommonlib.MutableHashMap.set(id, true)->ignore
}

let init = (): unit => {
  /* ! only one canvas for whole screen */
  // let canvas = _createCanvas()
  // _setMenuUI(canvas, _getRenderEngineForUI())
  // _setControllerUI(canvas, _getRenderEngineForUI())

  setState({
    execFuncMap: WonderCommonlib.MutableHashMap.createEmpty(),
    stateMap: WonderCommonlib.MutableHashMap.createEmpty(),
    isRenderMap: WonderCommonlib.MutableHashMap.createEmpty(),
  })
}

let _markAllNotRender = (): unit => {
  let {isRenderMap} = unsafeGetState()

  // TODO add entries to MutableHashMap, ImmutableHashMap ?
  isRenderMap
  ->WonderCommonlib.HashMap.entries
  ->WonderCommonlib.ArraySt.forEach(((id, isRender)) => {
    isRender
      ? {
          markNotRender(id)
        }
      : ()
  })
}

let render = (): unit => {
  let {isRenderMap, execFuncMap, stateMap} = unsafeGetState()

  // TODO add entries to MutableHashMap, ImmutableHashMap ?
  isRenderMap
  ->WonderCommonlib.HashMap.entries
  ->WonderCommonlib.ArraySt.forEach(((id, isRender)) => {
    isRender
      ? {
          let execFunc = execFuncMap->WonderCommonlib.MutableHashMap.unsafeGet(id)

          (execFunc->Obj.magic)(stateMap)
        }
      : ()
  })

  _markAllNotRender()
}

let addExecFunc = (id: id, func: execFunc) => {
  setState({
    ...unsafeGetState(),
    execFuncMap: unsafeGetState().execFuncMap->WonderCommonlib.MutableHashMap.set(id, func),
  })
}

// TODO remove?
let removeExecFunc = (id: id) => {
  setState({
    ...unsafeGetState(),
    execFuncMap: unsafeGetState().execFuncMap->WonderCommonlib.MutableHashMap.deleteVal(id),
  })
}

let setState = (id: id, uiState: uiState) => {
  setState({
    ...unsafeGetState(),
    stateMap: unsafeGetState().stateMap->WonderCommonlib.MutableHashMap.set(id, uiState),
  })
}

// let drawButton = (x:int, y:int, width:int, height:int, onClickFunc) => {

// }

let drawButton = %raw(`
function(x,y,width,height,text,onClickFunc) {
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

button.onclick = onClickFunc
button.id = id

  document.body.appendChild(
    button
  )
}
`)

let dispatch = ((
  actionType: string,
  eventName: EventManager.eventName,
  eventHandler: Type.handlerFunc,
)) => {
  switch actionType {
  | "submit" =>
    // TODO should compare whether state is change or not

    let id = "showAllRegisteredEventHandlers"

    let state: Type.showAllEventHandlersUIState =
      unsafeGetState().stateMap->Obj.magic->WonderCommonlib.MutableHashMap.unsafeGet(id)

    // setState({
    //   ...unsafeGetState(),
    //   stateMap: unsafeGetState().stateMap
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

    state.eventHandlerArr
    ->WonderCommonlib.ArraySt.push({
      eventName: eventName,
      handlerFunc: eventHandler,
    })
    ->ignore

    unsafeGetState().isRenderMap->WonderCommonlib.MutableHashMap.set(id, true)
  }
}

let useSelector = (uiState: uiState) => {
  // TODO finish
  uiState
}

let buildAPI = (): Type.uiAPI => {
  addExecFunc: addExecFunc->Obj.magic,
  removeExecFunc: removeExecFunc->Obj.magic,
  setState: setState->Obj.magic,
  drawButton: drawButton->Obj.magic,
  dispatch: dispatch->Obj.magic,
  useSelector: useSelector->Obj.magic,
  markRender: markRender->Obj.magic,
}

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
    buildAPI: buildAPI->Obj.magic,
  }
}
