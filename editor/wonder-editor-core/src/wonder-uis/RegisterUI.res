//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {drawButton, useSelector} = api.ui
  let {trigger} = api.eventManager

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "registerUI"),
  )

  (drawButton->Obj.magic)(x, y, width, height, text, e => {
    (trigger->Obj.magic)(
      DefaultEventName.getAddMenuItemEventName(),
      (
        {
          id: "triggerTest1",
          func: TriggerTest1.execFunc(Utils.buildAPI())->Obj.magic,
          stateValue: {
            x: 300,
            y: 240,
            width: 20,
            height: 10,
            text: "trigger_test1",
          },
        }: Type.triggerAddMenuItemData<Type.registerEventHandlerUIState>
      ),
    )
  })
}
