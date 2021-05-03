

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ManageIMGUIService$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/ManageIMGUIService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function getRecord(state) {
  return state[/* imguiRecord */44];
}

function getWonderIMGUIRecord(state) {
  return state[/* imguiRecord */44][/* wonderImguiIMGUIRecord */3];
}

function setWonderIMGUIRecord(imguiRecord, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */imguiRecord
  ];
  return newrecord;
}

function getIOData(state) {
  return state[/* imguiRecord */44][/* ioData */0];
}

function create(param) {
  return /* record */[
          /* ioData : record */[
            /* pointUp */false,
            /* pointDown */false,
            /* pointPosition : tuple */[
              0,
              0
            ],
            /* pointMovementDelta : tuple */[
              0,
              0
            ]
          ],
          /* isSetExecFuncInRenderWorkerForWorker */false,
          /* extendData : record */[
            /* customControlData : record */[/* funcMap */ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0)],
            /* skinData : record */[/* allSkinDataMap */ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0)]
          ],
          /* wonderImguiIMGUIRecord */ManageIMGUIService$WonderImgui.createRecord(/* () */0)
        ];
}

export {
  getRecord ,
  getWonderIMGUIRecord ,
  setWonderIMGUIRecord ,
  getIOData ,
  create ,
  
}
/* ManageIMGUIService-WonderImgui Not a pure module */
