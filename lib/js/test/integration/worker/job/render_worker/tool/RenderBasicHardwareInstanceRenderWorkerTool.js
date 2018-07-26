'use strict';

var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var InstanceRenderWorkerTool$Wonderjs = require("./InstanceRenderWorkerTool.js");
var RenderBasicHardwareInstanceTool$Wonderjs = require("../../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js");

function prepare(sandbox, state) {
  InstanceRenderWorkerTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox);
  var match = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, state);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[1],
          match[2]
        ];
}

exports.prepare = prepare;
/* CameraTool-Wonderjs Not a pure module */
