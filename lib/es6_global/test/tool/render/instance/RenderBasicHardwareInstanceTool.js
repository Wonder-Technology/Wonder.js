

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as CameraTool$Wonderjs from "../../service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../core/DirectorTool.js";
import * as InstanceTool$Wonderjs from "../../service/instance/InstanceTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as RenderJobsTool$Wonderjs from "../../job/no_worker/loop/RenderJobsTool.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../src/api/SourceInstanceAPI.js";
import * as RenderBasicJobTool$Wonderjs from "../../job/render_basic/RenderBasicJobTool.js";

function createSourceInstanceGameObject(sandbox, state) {
  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
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

function createSourceInstanceGameObjectWithGeometry(sandbox, state) {
  var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithGeometry(sandbox, state);
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

function prepareWithGeometry(sandbox, state) {
  var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox, state);
  var match = createSourceInstanceGameObjectWithGeometry(sandbox, state$1);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[1],
          match[2]
        ];
}

function prepareForTestVertexAttribPointer(sandbox, prepareFunc, state) {
  var match = Curry._2(prepareFunc, sandbox, state);
  var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[5]), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
  var state$2 = RenderJobsTool$Wonderjs.init(state$1);
  var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
  return /* tuple */[
          state$3,
          1,
          /* tuple */[
            match[1],
            match[2],
            match[3],
            match[4]
          ],
          vertexAttribPointer
        ];
}

export {
  createSourceInstanceGameObject ,
  prepare ,
  createSourceInstanceGameObjectWithGeometry ,
  prepareWithGeometry ,
  prepareForTestVertexAttribPointer ,
  
}
/* Sinon Not a pure module */
