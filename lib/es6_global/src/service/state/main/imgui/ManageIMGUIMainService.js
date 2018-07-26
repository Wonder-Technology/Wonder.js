

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ViewService$Wonderjs from "../../../record/main/device/ViewService.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as RecordIMGUIMainService$Wonderjs from "./RecordIMGUIMainService.js";

function getIMGUIFunc(state) {
  return ManageIMGUIAPI$WonderImgui.getIMGUIFunc(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function setIMGUIFunc(customData, func, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.setIMGUIFunc(customData, func, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

function getCustomData(state) {
  return ManageIMGUIAPI$WonderImgui.getCustomData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function getCanvasSize(param) {
  var viewRecord = param[/* viewRecord */8];
  var match = ViewService$Wonderjs.getCanvas(viewRecord);
  if (match !== undefined) {
    var canvas = Js_primitive.valFromOption(match);
    return /* tuple */[
            canvas.width,
            canvas.height
          ];
  } else {
    return /* tuple */[
            0,
            0
          ];
  }
}

var getRecord = RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord;

function setRecord(record, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* wonderImguiIMGUIRecord */record
  ];
  return newrecord;
}

export {
  getIMGUIFunc ,
  setIMGUIFunc ,
  getCustomData ,
  getCanvasSize ,
  getRecord ,
  setRecord ,
  
}
/* ViewService-Wonderjs Not a pure module */
