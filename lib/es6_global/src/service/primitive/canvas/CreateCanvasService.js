

import * as $$String from "../../../../../../node_modules/bs-platform/lib/es6/string.js";
import * as Pervasives from "../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as DomExtend$Wonderjs from "../../../external/DomExtend.js";
import * as DomService$Wonderjs from "../DomService.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";

function _getCanvasId(domId) {
  var match = $$String.contains(domId, /* "#" */35);
  if (match) {
    return domId;
  } else {
    return Contract$WonderLog.ensureCheck((function (id) {
                  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("dom id start with \'#\'", "is " + (String(domId) + "")), (function (param) {
                                return Contract$WonderLog.assertTrue((/#[^#]+/).test(id));
                              }));
                }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), "#" + (String(domId) + ""));
  }
}

function createCanvas(canvasId) {
  if (canvasId !== undefined) {
    var canvasId$1 = canvasId;
    var match = DomExtend$Wonderjs.findFirstHtmlElement(document, _getCanvasId(canvasId$1));
    if (match !== undefined) {
      return Caml_option.valFromOption(match);
    } else {
      return Pervasives.failwith("canvas whose id is " + (String(canvasId$1) + " should exist"));
    }
  } else {
    var arg = DomExtend$Wonderjs.findFirstHtmlElement(document, "body");
    return (function (param) {
                return DomExtend$Wonderjs.prependTo(param, arg);
              })(DomService$Wonderjs.buildCanvas());
  }
}

export {
  _getCanvasId ,
  createCanvas ,
  
}
/* Log-WonderLog Not a pure module */
