

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";

function getRootNodeIndexs(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* nodes */0]);
}

function _getDefaultIsRoot(param) {
  return true;
}

function _convertIMGUI(extras) {
  return Js_option.andThen((function (param) {
                var imgui = param[/* imgui */0];
                if (imgui !== undefined) {
                  var match = imgui;
                  return /* record */[
                          /* imguiFunc */match[/* imguiFunc */0],
                          /* customData */match[/* customData */1]
                        ];
                }
                
              }), extras);
}

function _convertIsRoot(extras) {
  if (extras !== undefined) {
    var isRoot = extras[/* isRoot */1];
    if (isRoot !== undefined) {
      return isRoot;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function convertToScene(ambientLightArr, param) {
  var scenes = param[/* scenes */1];
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has one scene", "not"), (function (param) {
                  return Contract$WonderLog.Operators[/* = */0](scenes.length, 1);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has one ambientLight at most", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* <= */11](ambientLightArr.length, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = ConvertCommon$Wonderjs.getScene(scenes, param[/* scene */2]);
  var extras = match[/* extras */2];
  var match$1 = ambientLightArr.length === 1;
  return /* record */[
          /* gameObjects */OptionService$Wonderjs.unsafeGet(match[/* nodes */0]),
          /* ambientLight */match$1 ? /* record */[/* color */Caml_array.caml_array_get(ambientLightArr, 0)[/* color */0]] : undefined,
          /* imgui */_convertIMGUI(extras),
          /* isRoot */_convertIsRoot(extras)
        ];
}

export {
  getRootNodeIndexs ,
  _getDefaultIsRoot ,
  _convertIMGUI ,
  _convertIsRoot ,
  convertToScene ,
  
}
/* Log-WonderLog Not a pure module */
