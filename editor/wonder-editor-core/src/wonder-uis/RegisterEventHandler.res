//TODO should from webpack
let execFunc = (api: Type.api, states: Type.states) => {
  // let { useSelector, groupStart, groupEnd, drawInput, drawTextarea, drawButton } = api.ui
  let {drawButton, useSelector} = api.ui
  let {trigger} = api.eventManager

  // let { input, textarea, button } = useSelector(state.registerEventHandler)
  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "registerEventHandler"),
  )

  // groupStart({
  //     x:0,
  //     y:0,
  //     width:40,
  //     height:150
  // })

  (drawButton->Obj.magic)(x, y, width, height, e => {
    (trigger->Obj.magic)(
      DefaultEventType.RegisterEventHandler_Submit,
      (
        {
          eventName: "wd_event_handler_test1",
          handlerFunc: Test1.handler->Obj.magic,
        }: Type.triggerRegisterEventHandlerSubmitData
      ),
    )
  })

  // groupEnd()
}
