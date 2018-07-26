

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ManageIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/ManageIMGUIService.js";
import * as RecordIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/RecordIMGUIService.js";

function getWonderIMGUIRecord(state) {
  return state[/* imguiRecord */42][/* wonderImguiIMGUIRecord */1];
}

function getIOData(state) {
  return state[/* imguiRecord */42][/* ioData */0];
}

function create() {
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
          /* wonderImguiIMGUIRecord */ManageIMGUIService$WonderImgui.createRecord(/* () */0)
        ];
}

function setControlDataFromRenderWorker(imguiData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* wonderImguiIMGUIRecord */RecordIMGUIService$WonderImgui.setControlData(imguiData.controlData, state[/* imguiRecord */42][/* wonderImguiIMGUIRecord */1])
  ];
  return newrecord;
}

export {
  getWonderIMGUIRecord ,
  getIOData ,
  create ,
  setControlDataFromRenderWorker ,
  
}
/* ManageIMGUIService-WonderImgui Not a pure module */
