//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {useSelector} = api.ui

  let {eventHandlerArr}: Type.showAllEventHandlersUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "showAllRegisteredEventHandlers"),
  )

  Js.log(eventHandlerArr)
}
