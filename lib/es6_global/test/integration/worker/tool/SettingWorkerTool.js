

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "./../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as DomService$Wonderjs from "../../../../src/service/primitive/DomService.js";
import * as SettingTool$Wonderjs from "../../../tool/service/setting/SettingTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../src/service/state/main/state/CreateStateMainService.js";

var addTransferControlToOffscreen = (
  function(canvas) {
    if(canvas.transferControlToOffscreen === undefined){
      canvas.transferControlToOffscreen = function(){
        return canvas
      };
    }

    return canvas;
  }
  );

function buildFakeCanvas(param) {
  return Curry._1(addTransferControlToOffscreen, DomService$Wonderjs.buildCanvas());
}

function buildFakeCanvasForNotPassCanvasId(sandbox) {
  return SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, Curry._1(addTransferControlToOffscreen, DomService$Wonderjs.buildCanvas()));
}

function createStateAndSetToStateData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var state = $staropt$star !== undefined ? $staropt$star : CreateStateMainService$Wonderjs.createState(/* () */0);
  var isDebug = $staropt$star$1 !== undefined ? $staropt$star$1 : "true";
  var canvasId = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var context = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var useHardwareInstance = $staropt$star$4 !== undefined ? $staropt$star$4 : "false";
  var useWorker = $staropt$star$5 !== undefined ? $staropt$star$5 : "false";
  var buffer = $staropt$star$6 !== undefined ? $staropt$star$6 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return SettingTool$Wonderjs.setToStateData(state, isDebug, canvasId, context, useHardwareInstance, useWorker, buffer);
}

var setMemory = SettingTool$Wonderjs.setMemory;

export {
  addTransferControlToOffscreen ,
  buildFakeCanvas ,
  buildFakeCanvasForNotPassCanvasId ,
  createStateAndSetToStateData ,
  setMemory ,
  
}
/* addTransferControlToOffscreen Not a pure module */
