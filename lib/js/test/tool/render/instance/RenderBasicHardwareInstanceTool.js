'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CameraTool$Wonderjs = require("../../service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../core/DirectorTool.js");
var InstanceTool$Wonderjs = require("../../service/instance/InstanceTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var RenderJobsTool$Wonderjs = require("../../job/no_worker/loop/RenderJobsTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../src/api/SourceInstanceAPI.js");
var RenderBasicJobTool$Wonderjs = require("../../job/render_basic/RenderBasicJobTool.js");

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

exports.createSourceInstanceGameObject = createSourceInstanceGameObject;
exports.prepare = prepare;
exports.createSourceInstanceGameObjectWithGeometry = createSourceInstanceGameObjectWithGeometry;
exports.prepareWithGeometry = prepareWithGeometry;
exports.prepareForTestVertexAttribPointer = prepareForTestVertexAttribPointer;
/* Sinon Not a pure module */
