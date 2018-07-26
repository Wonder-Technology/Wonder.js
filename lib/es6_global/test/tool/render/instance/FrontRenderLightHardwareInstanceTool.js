

import * as CameraTool$Wonderjs from "../../service/camera/CameraTool.js";
import * as InstanceTool$Wonderjs from "../../service/instance/InstanceTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../src/api/SourceInstanceAPI.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../job/no_worker/loop/FrontRenderLightJobTool.js";

function createSourceInstanceGameObject(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var gameObject = match[1];
  var match$1 = SourceInstanceAPI$Wonderjs.createSourceInstance(match[0]);
  var sourceInstance = match$1[1];
  var match$2 = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, match$1[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent(gameObject, sourceInstance, match$2[0]);
  return /* tuple */[
          state$1,
          gameObject,
          /* tuple */[
            match[2],
            match[3],
            match[4],
            sourceInstance,
            match$2[1]
          ]
        ];
}

function prepare(sandbox, state) {
  var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox, state);
  var match = createSourceInstanceGameObject(sandbox, state$1);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[1],
          match[2]
        ];
}

export {
  createSourceInstanceGameObject ,
  prepare ,
  
}
/* CameraTool-Wonderjs Not a pure module */
