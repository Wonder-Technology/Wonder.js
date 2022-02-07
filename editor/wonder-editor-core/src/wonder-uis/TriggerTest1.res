//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {drawButton} = api.ui
  let {trigger} = api.eventManager

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = JsObjTool.getObjValue(
    states,
    "triggerTest1",
  )

  (drawButton->Obj.magic)(x, y, width, height, text, e => {
    (trigger->Obj.magic)(
      "wd_event_handler_test1",
      (
        {
          data1: "aaaabbbb",
        }: Type.triggerTest1Data
      ),
    )
  })
}
