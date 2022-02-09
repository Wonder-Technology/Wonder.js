let execFunc = (states: Type.states, api: Type.api): Type.states => {
  let {middlewareState} = states

  let {unsafeGetData, unsafeGetState, setState} = api.middlewareManager

  let {trigger}: EventManager.getData = unsafeGetData(middlewareState, "EventManager")->Obj.magic
  let eventManagerState: EventManager.state =
    unsafeGetState(middlewareState, "EventManager")->Obj.magic

  let {drawButton, useSelector}: UI.getData = unsafeGetData(middlewareState, "UI")->Obj.magic
  let uiState: UI.state = unsafeGetState(middlewareState, "UI")->Obj.magic

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(uiState.stateMap, "registerEventHandler"),
  )

  let states = {
    ...states,
    middlewareState: middlewareState,
  }

  let states = states->(drawButton->Obj.magic)(x, y, width, height, text, (states, e) => {
    (trigger->Obj.magic)(
      states,
      eventManagerState,
      DefaultEventName.getRegisterEventHandlerSubmitEventName(),
      (
        {
          eventName: "wd_event_handler_test1",
          handlerFunc: Utils.serialize(
            {
              j`
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("EventHandlerTest1",[],t):"object"==typeof exports?exports.EventHandlerTest1=t():e.EventHandlerTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function o(e,t,o){return console.log(o),e}return e.r(t),e.d(t,{handler:()=>o}),t})()}));
          `
            },
            "EventHandlerTest1",
            "handler",
          ),
        }: Type.triggerRegisterEventHandlerSubmitData
      ),
    )
  })

  {
    ...states,
    middlewareState: middlewareState,
  }
}
