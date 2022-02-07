//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {drawButton, useSelector} = api.ui
  let {trigger} = api.eventManager

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "registerWorkPlugin"),
  )

  (drawButton->Obj.magic)(x, y, width, height, text, e => {
    (trigger->Obj.magic)(
      DefaultEventName.getRegisterWorkPluginSubmitEventName(),
      (
        {
          getData: Test1Main.getData->Obj.magic,
        }: Type.triggerRegisterWorkPluginSubmitData
      ),
    )
  })
}
