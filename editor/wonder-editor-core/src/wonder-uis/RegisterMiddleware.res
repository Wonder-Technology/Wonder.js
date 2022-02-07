//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {drawButton, useSelector} = api.ui
  let {trigger} = api.eventManager

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "registerMiddleware"),
  )

  (drawButton->Obj.magic)(x, y, width, height, text, e => {
    (trigger->Obj.magic)(
      DefaultEventName.getRegisterMiddlewareSubmitEventName(),
      (
        {
          middlewareName: "wd_middleware_test1",
          getData: Utils.serialize(
            {
              j`
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("MiddlewareTest1",[],t):"object"==typeof exports?exports.MiddlewareTest1=t():e.MiddlewareTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function o(e){return{func1:function(e){console.log(e)}}}return e.r(t),e.d(t,{getData:()=>o}),t})()}));
`
            },
            "MiddlewareTest1",
            "getData",
          )->Obj.magic,
        }: Type.triggerRegisterMiddlewareSubmitData
      ),
    )
  })
}
