//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
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

  (drawButton->Obj.magic)(x, y, width, height, text, e => {
    (trigger->Obj.magic)(
      DefaultEventName.getRegisterEventHandlerSubmitEventName(),
      (
        {
          eventName: "wd_event_handler_test1",
          handlerFunc: Utils.serialize(
            {
              j`
          !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("EventHandlerTest1",[],t):"object"==typeof exports?exports.EventHandlerTest1=t():e.EventHandlerTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function o(e,t){console.log(t)}return e.r(t),e.d(t,{handler:()=>o}),t})()}));
          `
            },
            "EventHandlerTest1",
            "handler",
          )(Utils.buildAPI()),
        }: Type.triggerRegisterEventHandlerSubmitData
      ),
    )
  })

  // groupEnd()
}
