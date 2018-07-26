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
var InstanceBufferRenderService$Wonderjs = require("../../../../src/service/state/render/vboBuffer/InstanceBufferRenderService.js");
var ElementArrayBufferRenderService$Wonderjs = require("../../../../src/service/state/render/vboBuffer/ElementArrayBufferRenderService.js");
var GetBoxGeometryIndicesRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/box/GetBoxGeometryIndicesRenderService.js");
var GetBoxGeometryNormalsRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/box/GetBoxGeometryNormalsRenderService.js");
var GetBoxGeometryVerticesRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/box/GetBoxGeometryVerticesRenderService.js");
var GetBoxGeometryTexCoordsRenderService$Wonderjs = require("../../../../src/service/state/render/geometry/box/GetBoxGeometryTexCoordsRenderService.js");

function getRecord(state) {
  return state[/* vboBufferRecord */34];
}

function getOrCreateBoxGeometryVertexArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* boxGeometryVertexBufferMap */0]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetBoxGeometryVerticesRenderService$Wonderjs.getVertices
            ], state$1);
}

function getOrCreateBoxGeometryTexCoordArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* boxGeometryTexCoordBufferMap */1]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetBoxGeometryTexCoordsRenderService$Wonderjs.getTexCoords
            ], state$1);
}

function getOrCreateBoxGeometryNormalArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* boxGeometryNormalBufferMap */2]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetBoxGeometryNormalsRenderService$Wonderjs.getNormals
            ], state$1);
}

function getOrCreateBoxGeometryElementArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* boxGeometryElementArrayBufferMap */3]
            ], /* tuple */[
              ElementArrayBufferRenderService$Wonderjs.createBuffer,
              GetBoxGeometryIndicesRenderService$Wonderjs.getIndices
            ], state$1);
}

function getOrCreateInstanceBuffer(sourceInstanceIndex, defaultCapacity, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return InstanceBufferRenderService$Wonderjs.getOrCreateBuffer(/* tuple */[
              DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */18]),
              sourceInstanceIndex,
              defaultCapacity
            ], /* tuple */[
              state$1[/* sourceInstanceRecord */15][/* matrixInstanceBufferCapacityMap */3],
              state$1[/* vboBufferRecord */1][/* matrixInstanceBufferMap */8]
            ], state$1);
}

function addVboBufferToBoxGeometryBufferMapByRecord(geometryIndex, vboBufferRecord) {
  SparseMapService$WonderCommonlib.set(geometryIndex, 0, vboBufferRecord[/* boxGeometryVertexBufferMap */0]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 1, vboBufferRecord[/* boxGeometryTexCoordBufferMap */1]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 2, vboBufferRecord[/* boxGeometryNormalBufferMap */2]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 3, vboBufferRecord[/* boxGeometryElementArrayBufferMap */3]);
  return vboBufferRecord;
}

function addVboBufferToCustomGeometryBufferMapByRecord(geometryIndex, vboBufferRecord) {
  SparseMapService$WonderCommonlib.set(geometryIndex, 0, vboBufferRecord[/* customGeometryVertexBufferMap */4]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 1, vboBufferRecord[/* customGeometryTexCoordBufferMap */5]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 2, vboBufferRecord[/* customGeometryNormalBufferMap */6]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 3, vboBufferRecord[/* customGeometryElementArrayBufferMap */7]);
  return vboBufferRecord;
}

function addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, vboBufferRecord) {
  SparseMapService$WonderCommonlib.set(sourceInstanceIndex, 0, vboBufferRecord[/* matrixInstanceBufferMap */8]);
  return vboBufferRecord;
}

function addVboBufferToBoxGeometryBufferMap(geometryIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */34] = addVboBufferToBoxGeometryBufferMapByRecord(geometryIndex, state[/* vboBufferRecord */34]);
  return newrecord;
}

function addVboBufferToCustomGeometryBufferMap(geometryIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */34] = addVboBufferToCustomGeometryBufferMapByRecord(geometryIndex, state[/* vboBufferRecord */34]);
  return newrecord;
}

function addVboBufferToSourceInstanceBufferMap(sourceInstanceIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */34] = addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, state[/* vboBufferRecord */34]);
  return newrecord;
}

function getVboBufferRecord(state) {
  return state[/* vboBufferRecord */34];
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
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
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

function getOrCreateAllBoxGeometryBuffers(geometry, state) {
  return /* tuple */[
          getOrCreateBoxGeometryVertexArrayBuffer(geometry, state),
          getOrCreateBoxGeometryTexCoordArrayBuffer(geometry, state),
          getOrCreateBoxGeometryNormalArrayBuffer(geometry, state),
          getOrCreateBoxGeometryElementArrayBuffer(geometry, state)
        ];
}

exports.getRecord = getRecord;
exports.getOrCreateBoxGeometryVertexArrayBuffer = getOrCreateBoxGeometryVertexArrayBuffer;
exports.getOrCreateBoxGeometryTexCoordArrayBuffer = getOrCreateBoxGeometryTexCoordArrayBuffer;
exports.getOrCreateBoxGeometryNormalArrayBuffer = getOrCreateBoxGeometryNormalArrayBuffer;
exports.getOrCreateBoxGeometryElementArrayBuffer = getOrCreateBoxGeometryElementArrayBuffer;
exports.getOrCreateInstanceBuffer = getOrCreateInstanceBuffer;
exports.addVboBufferToBoxGeometryBufferMapByRecord = addVboBufferToBoxGeometryBufferMapByRecord;
exports.addVboBufferToCustomGeometryBufferMapByRecord = addVboBufferToCustomGeometryBufferMapByRecord;
exports.addVboBufferToSourceInstanceBufferMapByRecord = addVboBufferToSourceInstanceBufferMapByRecord;
exports.addVboBufferToBoxGeometryBufferMap = addVboBufferToBoxGeometryBufferMap;
exports.addVboBufferToCustomGeometryBufferMap = addVboBufferToCustomGeometryBufferMap;
exports.addVboBufferToSourceInstanceBufferMap = addVboBufferToSourceInstanceBufferMap;
exports.getVboBufferRecord = getVboBufferRecord;
exports.prepareCreatedBuffer = prepareCreatedBuffer;
exports.getOrCreateAllBoxGeometryBuffers = getOrCreateAllBoxGeometryBuffers;
/* Sinon Not a pure module */
