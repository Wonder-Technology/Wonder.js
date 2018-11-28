'use strict';

var CameraTool$Wonderjs = require("../../../tool/service/camera/CameraTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../tool/job/render_basic/RenderBasicJobTool.js");

function prepareForUseProgramCase(sandbox, state) {
  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
}

exports.prepareForUseProgramCase = prepareForUseProgramCase;
/* CameraTool-Wonderjs Not a pure module */
