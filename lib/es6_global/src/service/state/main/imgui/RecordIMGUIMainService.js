

import * as ManageIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/ManageIMGUIService.js";

function getWonderIMGUIRecord(state) {
  return state[/* imguiRecord */42][/* wonderImguiIMGUIRecord */2];
}

function getIOData(state) {
  return state[/* imguiRecord */42][/* ioData */0];
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
          /* isSetIMGUIFuncInRenderWorkerForWorker */false,
          /* wonderImguiIMGUIRecord */ManageIMGUIService$WonderImgui.createRecord(/* () */0)
        ];
}

export {
  getWonderIMGUIRecord ,
  getIOData ,
  create ,
  
}
/* ManageIMGUIService-WonderImgui Not a pure module */
