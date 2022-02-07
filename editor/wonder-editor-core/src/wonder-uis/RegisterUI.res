//TODO should from webpack
let execFunc = (api: Type.api, states: UI.states) => {
  let {drawButton, useSelector} = api.ui
  let {trigger} = api.eventManager

  let {x, y, width, height, text}: Type.registerEventHandlerUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(states, "registerUI"),
  )

  (drawButton->Obj.magic)(x, y, width, height, text, e => {
    let lib = Utils.serializeLib(
      {
        j`
  !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("UITriggerTest1",[],t):"object"==typeof exports?exports.UITriggerTest1=t():e.UITriggerTest1=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function r(e,t,r){for(var n=new Array(r),u=0,o=t;u<r;)n[u]=e[o],u=u+1|0,o=o+1|0;return n}function n(e,t){for(;;){var u=t,o=e,a=o.length,c=0===a?1:a,i=c-u.length|0;if(0===i)return o.apply(null,u);if(i>=0)return function(e,t){return function(r){return n(e,t.concat([r]))}}(o,u);t=r(u,c,0|-i),e=o.apply(null,r(u,0,c))}}function u(e,t){var r=e.ui,u=e.eventManager.trigger,o=t.triggerTest1;return function(e,t,r,u,o,a,c){var i=e.length;if(6===i)return e(t,r,u,o,a,c);switch(i){case 1:return n(e(t),[r,u,o,a,c]);case 2:return n(e(t,r),[u,o,a,c]);case 3:return n(e(t,r,u),[o,a,c]);case 4:return n(e(t,r,u,o),[a,c]);case 5:return n(e(t,r,u,o,a),[c]);case 6:return e(t,r,u,o,a,c);case 7:return function(n){return e(t,r,u,o,a,c,n)};default:return n(e,[t,r,u,o,a,c])}}(r.drawButton,o.x,o.y,o.width,o.height,o.text,(function(e){return function(e,t,r){var u=e.length;if(2===u)return e(t,r);switch(u){case 1:return n(e(t),[r]);case 2:return e(t,r);case 3:return function(n){return e(t,r,n)};case 4:return function(n,u){return e(t,r,n,u)};case 5:return function(n,u,o){return e(t,r,n,u,o)};case 6:return function(n,u,o,a){return e(t,r,n,u,o,a)};case 7:return function(n,u,o,a,c){return e(t,r,n,u,o,a,c)};default:return n(e,[t,r])}}(u,"wd_event_handler_test1",{data1:"aaaabbbb"})}))}function o(e){return{x:300,y:240,width:20,height:10,text:"trigger_test1"}}return e.r(t),e.d(t,{execFunc:()=>u,getStateValue:()=>o}),t})()}));
  `
      },
      "UITriggerTest1",
    )

    (trigger->Obj.magic)(
      DefaultEventName.getAddMenuItemEventName(),
      (
        {
          id: "triggerTest1",
          func: Utils.getDataFromLib(lib, "execFunc")(Utils.buildAPI()),
          stateValue: Utils.getDataFromLib(lib, "getStateValue")(),
        }: Type.triggerAddMenuItemData<Type.registerEventHandlerUIState>
      ),
    )
  })
}
