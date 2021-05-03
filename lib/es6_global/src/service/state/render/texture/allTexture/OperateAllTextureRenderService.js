

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../main/state/IsDebugMainService.js";

function setActivedTextureUnitIndex(activedTextureUnitIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* allTextureRecord */13];
  newrecord[/* allTextureRecord */13] = /* record */[
    /* activableTextureUnitArray */init[/* activableTextureUnitArray */0],
    /* activedTextureUnitIndex */activedTextureUnitIndex
  ];
  return newrecord;
}

function resetActivedTextureUnitIndex(state) {
  return setActivedTextureUnitIndex(0, state);
}

function getActivableTextureUnit(state) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("activableTextureUnitArray should has data", "not"), (function (param) {
                        var match = state[/* allTextureRecord */13];
                        return Contract$WonderLog.Operators[/* > */5](match[/* activableTextureUnitArray */0].length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = state[/* allTextureRecord */13];
  var activedTextureUnitIndex = match[/* activedTextureUnitIndex */1];
  var activableTextureUnitArray = match[/* activableTextureUnitArray */0];
  return Contract$WonderLog.ensureCheck((function (param) {
                var newActivedTextureUnitIndex = param[1];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("newActivedTextureUnitIndex <= activableTextureUnitArray.length", "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* <= */11](newActivedTextureUnitIndex, activableTextureUnitArray.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* tuple */[
              activableTextureUnitArray[activedTextureUnitIndex],
              activedTextureUnitIndex + 1 | 0
            ]);
}

export {
  setActivedTextureUnitIndex ,
  resetActivedTextureUnitIndex ,
  getActivableTextureUnit ,
  
}
/* Log-WonderLog Not a pure module */
