

import * as CameraTool$Wonderjs from "../../service/camera/CameraTool.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as InstanceTool$Wonderjs from "../../service/instance/InstanceTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../src/api/SourceInstanceAPI.js";
import * as RenderBasicJobTool$Wonderjs from "../../job/render_basic/RenderBasicJobTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function createSourceInstanceGameObject(sandbox, count, state) {
  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var gameObject = match[1];
  var match$1 = SourceInstanceAPI$Wonderjs.createSourceInstance(match[0]);
  var sourceInstance = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent(gameObject, sourceInstance, match$1[0]);
  var match$2 = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
          var match = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, param[0]);
          return /* tuple */[
                  match[0],
                  /* :: */[
                    match[1],
                    param[1]
                  ]
                ];
        }), /* tuple */[
        state$1,
        /* [] */0
      ], ArrayService$Wonderjs.range(0, count - 1 | 0));
  return /* tuple */[
          match$2[0],
          gameObject,
          match[2],
          match$2[1]
        ];
}

function prepare(sandbox, count, state) {
  var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowBatchInstance(state);
  var match = createSourceInstanceGameObject(sandbox, count, state$1);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[1],
          match[2],
          match[3]
        ];
}

function createSourceInstanceGameObjectWithGeometry(sandbox, count, state) {
  var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithGeometry(sandbox, state);
  var gameObject = match[1];
  var match$1 = SourceInstanceAPI$Wonderjs.createSourceInstance(match[0]);
  var sourceInstance = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent(gameObject, sourceInstance, match$1[0]);
  var match$2 = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
          var match = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, param[0]);
          return /* tuple */[
                  match[0],
                  /* :: */[
                    match[1],
                    param[1]
                  ]
                ];
        }), /* tuple */[
        state$1,
        /* [] */0
      ], ArrayService$Wonderjs.range(0, count - 1 | 0));
  return /* tuple */[
          match$2[0],
          gameObject,
          match[2],
          match$2[1]
        ];
}

function prepareWithGeometry(sandbox, count, state) {
  var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowBatchInstance(state);
  var match = createSourceInstanceGameObjectWithGeometry(sandbox, count, state$1);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[1],
          match[2],
          match[3]
        ];
}

export {
  createSourceInstanceGameObject ,
  prepare ,
  createSourceInstanceGameObjectWithGeometry ,
  prepareWithGeometry ,
  
}
/* CameraTool-Wonderjs Not a pure module */
