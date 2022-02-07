//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {drawButton, useSelector} = api.ui
  let {trigger} = api.eventManager

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "registerMiddleware"),
  )

  (drawButton->Obj.magic)(x, y, width, height,text, e => {
    (trigger->Obj.magic)(
      DefaultEventName.getRegisterMiddlewareSubmitEventName(),
      (
        {
          middlewareName: "wd_middleware_test1",
          getData: MiddlewareTest1.getData->Obj.magic,
        }: Type.triggerRegisterMiddlewareSubmitData
      ),
    )
  })
}
