

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as NameEventService$Wonderjs from "../../../record/main/event/NameEventService.js";
import * as ManageEventMainService$Wonderjs from "../event/ManageEventMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "./RecordIMGUIMainService.js";

function bindEvent(state) {
  var state$1 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDownEventName(/* () */0), (function ($$event, state) {
          var imguiRecord = state[/* imguiRecord */44];
          var newrecord = Caml_array.caml_array_dup(state);
          var init = imguiRecord[/* ioData */0];
          newrecord[/* imguiRecord */44] = /* record */[
            /* ioData : record */[
              /* pointUp */init[/* pointUp */0],
              /* pointDown */true,
              /* pointPosition */init[/* pointPosition */2],
              /* pointMovementDelta */init[/* pointMovementDelta */3]
            ],
            /* isSetExecFuncInRenderWorkerForWorker */imguiRecord[/* isSetExecFuncInRenderWorkerForWorker */1],
            /* extendData */imguiRecord[/* extendData */2],
            /* wonderImguiIMGUIRecord */imguiRecord[/* wonderImguiIMGUIRecord */3]
          ];
          return /* tuple */[
                  newrecord,
                  $$event
                ];
        }), state, undefined, /* () */0);
  var state$2 = ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointUpEventName(/* () */0), (function ($$event, state) {
          var imguiRecord = state[/* imguiRecord */44];
          var newrecord = Caml_array.caml_array_dup(state);
          var init = imguiRecord[/* ioData */0];
          newrecord[/* imguiRecord */44] = /* record */[
            /* ioData : record */[
              /* pointUp */true,
              /* pointDown */init[/* pointDown */1],
              /* pointPosition */init[/* pointPosition */2],
              /* pointMovementDelta */init[/* pointMovementDelta */3]
            ],
            /* isSetExecFuncInRenderWorkerForWorker */imguiRecord[/* isSetExecFuncInRenderWorkerForWorker */1],
            /* extendData */imguiRecord[/* extendData */2],
            /* wonderImguiIMGUIRecord */imguiRecord[/* wonderImguiIMGUIRecord */3]
          ];
          return /* tuple */[
                  newrecord,
                  $$event
                ];
        }), state$1, undefined, /* () */0);
  return ManageEventMainService$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointMoveEventName(/* () */0), (function ($$event, state) {
                var imguiRecord = state[/* imguiRecord */44];
                var pointEvent = OptionService$Wonderjs.unsafeGet($$event[/* userData */4]);
                var newrecord = Caml_array.caml_array_dup(state);
                var init = imguiRecord[/* ioData */0];
                newrecord[/* imguiRecord */44] = /* record */[
                  /* ioData : record */[
                    /* pointUp */init[/* pointUp */0],
                    /* pointDown */init[/* pointDown */1],
                    /* pointPosition */pointEvent[/* locationInView */2],
                    /* pointMovementDelta */pointEvent[/* movementDelta */5]
                  ],
                  /* isSetExecFuncInRenderWorkerForWorker */imguiRecord[/* isSetExecFuncInRenderWorkerForWorker */1],
                  /* extendData */imguiRecord[/* extendData */2],
                  /* wonderImguiIMGUIRecord */imguiRecord[/* wonderImguiIMGUIRecord */3]
                ];
                return /* tuple */[
                        newrecord,
                        $$event
                      ];
              }), state$2, undefined, /* () */0);
}

function resetPointEventStateWhenPointUp(state) {
  var imguiRecord = state[/* imguiRecord */44];
  var match = RecordIMGUIMainService$Wonderjs.getIOData(state);
  if (match[/* pointUp */0]) {
    var newrecord = Caml_array.caml_array_dup(state);
    var init = imguiRecord[/* ioData */0];
    newrecord[/* imguiRecord */44] = /* record */[
      /* ioData : record */[
        /* pointUp */false,
        /* pointDown */false,
        /* pointPosition */init[/* pointPosition */2],
        /* pointMovementDelta */init[/* pointMovementDelta */3]
      ],
      /* isSetExecFuncInRenderWorkerForWorker */imguiRecord[/* isSetExecFuncInRenderWorkerForWorker */1],
      /* extendData */imguiRecord[/* extendData */2],
      /* wonderImguiIMGUIRecord */imguiRecord[/* wonderImguiIMGUIRecord */3]
    ];
    return newrecord;
  } else {
    return state;
  }
}

export {
  bindEvent ,
  resetPointEventStateWhenPointUp ,
  
}
/* OptionService-Wonderjs Not a pure module */
