'use strict';

var RenderRecordTool$Wonderjs = require("../render/RenderRecordTool.js");
var CreateRenderStateMainService$Wonderjs = require("../../../src/service/state/main/render/CreateRenderStateMainService.js");

function createState(state) {
  var match = RenderRecordTool$Wonderjs.isCameraRecordExist(state);
  if (match) {
    return CreateRenderStateMainService$Wonderjs.createRenderState(state);
  } else {
    return CreateRenderStateMainService$Wonderjs.createRenderState(RenderRecordTool$Wonderjs.setCameraRecord(1, state));
  }
}

exports.createState = createState;
/* RenderRecordTool-Wonderjs Not a pure module */
