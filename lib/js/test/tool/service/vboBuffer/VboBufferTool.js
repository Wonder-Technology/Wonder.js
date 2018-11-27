'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var FakeGlTool$Wonderjs = require("../../gl/FakeGlTool.js");
var RenderStateTool$Wonderjs = require("../../state/RenderStateTool.js");
var DeviceManagerService$Wonderjs = require("../../../../src/service/record/all/device/DeviceManagerService.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var ArrayBufferRenderService$Wonderjs = require("../../../../src/service/state/render/vboBuffer/ArrayBufferRenderService.js");
var GetVboBufferRenderService$Wonderjs = require("../../../../src/service/state/render/vboBuffer/GetVboBufferRenderService.js");
var IndicesGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/IndicesGeometryMainService.js");
var InstanceBufferRenderService$Wonderjs = require("../../../../src/service/state/render/vboBuffer/InstanceBufferRenderService.js");
var ElementArrayBufferRenderService$Wonderjs = require("../../../../src/service/state/render/vboBuffer/ElementArrayBufferRenderService.js");
var GetGeometryIndicesRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/GetGeometryIndicesRenderService.js");
var GetGeometryNormalsRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/GetGeometryNormalsRenderService.js");
var GetGeometryVerticesRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/GetGeometryVerticesRenderService.js");
var GetGeometryTexCoordsRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/GetGeometryTexCoordsRenderService.js");

function getRecord(state) {
  return state[/* vboBufferRecord */33];
}

function getOrCreateInstanceBuffer(sourceInstanceIndex, defaultCapacity, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return InstanceBufferRenderService$Wonderjs.getOrCreateBuffer(/* tuple */[
              DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]),
              sourceInstanceIndex,
              defaultCapacity
            ], /* tuple */[
              state$1[/* sourceInstanceRecord */15][/* matrixInstanceBufferCapacityMap */3],
              state$1[/* vboBufferRecord */1][/* matrixInstanceBufferMap */4]
            ], state$1);
}

function addVboBufferToGeometryBufferMapByRecord(geometryIndex, vboBufferRecord) {
  SparseMapService$WonderCommonlib.set(geometryIndex, 0, vboBufferRecord[/* geometryVertexBufferMap */0]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 1, vboBufferRecord[/* geometryTexCoordBufferMap */1]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 2, vboBufferRecord[/* geometryNormalBufferMap */2]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 3, vboBufferRecord[/* geometryElementArrayBufferMap */3]);
  return vboBufferRecord;
}

function addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, vboBufferRecord) {
  SparseMapService$WonderCommonlib.set(sourceInstanceIndex, 0, vboBufferRecord[/* matrixInstanceBufferMap */4]);
  return vboBufferRecord;
}

function addVboBufferToGeometryBufferMap(geometryIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */33] = addVboBufferToGeometryBufferMapByRecord(geometryIndex, state[/* vboBufferRecord */33]);
  return newrecord;
}

function addVboBufferToSourceInstanceBufferMap(sourceInstanceIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */33] = addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, state[/* vboBufferRecord */33]);
  return newrecord;
}

function getVboBufferRecord(state) {
  return state[/* vboBufferRecord */33];
}

function prepareCreatedBuffer(sandbox, state) {
  var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  Sinon.returns(20, Sinon.onCall(0, createBuffer));
  Sinon.returns(21, Sinon.onCall(1, createBuffer));
  Sinon.returns(22, Sinon.onCall(2, createBuffer));
  Sinon.returns(12, Sinon.onCall(3, createBuffer));
  Sinon.returns(22, Sinon.onCall(4, createBuffer));
  Sinon.returns(23, Sinon.onCall(5, createBuffer));
  Sinon.returns(24, Sinon.onCall(6, createBuffer));
  Sinon.returns(13, Sinon.onCall(7, createBuffer));
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
  return /* tuple */[
          state$1,
          /* tuple */[
            20,
            21,
            22,
            23,
            24,
            25
          ],
          /* tuple */[
            12,
            13
          ],
          createBuffer
        ];
}

function getOrCreateGeometryVertexArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* geometryVertexBufferMap */0]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetGeometryVerticesRenderService$Wonderjs.getVertices
            ], state$1);
}

function getOrCreateGeometryTexCoordArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* geometryTexCoordBufferMap */1]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetGeometryTexCoordsRenderService$Wonderjs.getTexCoords
            ], state$1);
}

function getOrCreateGeometryNormalArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* geometryNormalBufferMap */2]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetGeometryNormalsRenderService$Wonderjs.getNormals
            ], state$1);
}

function getOrCreateGeometryElementArrayBuffer(geometryIndex, state) {
  var renderState = RenderStateTool$Wonderjs.createState(state);
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(renderState[/* deviceManagerRecord */18]);
  var elementArrayBufferMap = renderState[/* vboBufferRecord */1][/* geometryElementArrayBufferMap */3];
  var match = IndicesGeometryMainService$Wonderjs.unsafeGetIndicesType(geometryIndex, state);
  if (match) {
    return ElementArrayBufferRenderService$Wonderjs.getOrCreate32Buffer(gl, /* tuple */[
                geometryIndex,
                elementArrayBufferMap
              ], GetGeometryIndicesRenderService$Wonderjs.getIndices32(geometryIndex, renderState), renderState);
  } else {
    return ElementArrayBufferRenderService$Wonderjs.getOrCreate16Buffer(gl, /* tuple */[
                geometryIndex,
                elementArrayBufferMap
              ], GetGeometryIndicesRenderService$Wonderjs.getIndices(geometryIndex, renderState), renderState);
  }
}

function getOrCreateAllGeometryBuffers(geometry, state) {
  return /* tuple */[
          getOrCreateGeometryVertexArrayBuffer(geometry, state),
          getOrCreateGeometryTexCoordArrayBuffer(geometry, state),
          getOrCreateGeometryNormalArrayBuffer(geometry, state),
          getOrCreateGeometryElementArrayBuffer(geometry, state)
        ];
}

exports.getRecord = getRecord;
exports.getOrCreateInstanceBuffer = getOrCreateInstanceBuffer;
exports.addVboBufferToGeometryBufferMapByRecord = addVboBufferToGeometryBufferMapByRecord;
exports.addVboBufferToSourceInstanceBufferMapByRecord = addVboBufferToSourceInstanceBufferMapByRecord;
exports.addVboBufferToGeometryBufferMap = addVboBufferToGeometryBufferMap;
exports.addVboBufferToSourceInstanceBufferMap = addVboBufferToSourceInstanceBufferMap;
exports.getVboBufferRecord = getVboBufferRecord;
exports.prepareCreatedBuffer = prepareCreatedBuffer;
exports.getOrCreateGeometryVertexArrayBuffer = getOrCreateGeometryVertexArrayBuffer;
exports.getOrCreateGeometryTexCoordArrayBuffer = getOrCreateGeometryTexCoordArrayBuffer;
exports.getOrCreateGeometryNormalArrayBuffer = getOrCreateGeometryNormalArrayBuffer;
exports.getOrCreateGeometryElementArrayBuffer = getOrCreateGeometryElementArrayBuffer;
exports.getOrCreateAllGeometryBuffers = getOrCreateAllGeometryBuffers;
/* Sinon Not a pure module */
