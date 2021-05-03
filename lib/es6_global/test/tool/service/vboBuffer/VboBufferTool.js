

import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as RenderStateTool$Wonderjs from "../../state/RenderStateTool.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../src/service/record/all/device/AllDeviceManagerService.js";
import * as ArrayBufferRenderService$Wonderjs from "../../../../src/service/state/render/vboBuffer/ArrayBufferRenderService.js";
import * as GetVboBufferRenderService$Wonderjs from "../../../../src/service/state/render/vboBuffer/GetVboBufferRenderService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../../src/service/state/main/geometry/IndicesGeometryMainService.js";
import * as InstanceBufferRenderService$Wonderjs from "../../../../src/service/state/render/vboBuffer/InstanceBufferRenderService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ElementArrayBufferRenderService$Wonderjs from "../../../../src/service/state/render/vboBuffer/ElementArrayBufferRenderService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "../../../../src/service/state/render/geometry/GetGeometryIndicesRenderService.js";
import * as GetGeometryNormalsRenderService$Wonderjs from "../../../../src/service/state/render/geometry/GetGeometryNormalsRenderService.js";
import * as GetGeometryVerticesRenderService$Wonderjs from "../../../../src/service/state/render/geometry/GetGeometryVerticesRenderService.js";
import * as GetGeometryTexCoordsRenderService$Wonderjs from "../../../../src/service/state/render/geometry/GetGeometryTexCoordsRenderService.js";

function getRecord(state) {
  return state[/* vboBufferRecord */36];
}

function getOrCreateInstanceBuffer(sourceInstanceIndex, defaultCapacity, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return InstanceBufferRenderService$Wonderjs.getOrCreateBuffer(/* tuple */[
              AllDeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */20]),
              sourceInstanceIndex,
              defaultCapacity
            ], /* tuple */[
              state$1[/* sourceInstanceRecord */17][/* matrixInstanceBufferCapacityMap */3],
              state$1[/* vboBufferRecord */1][/* matrixInstanceBufferMap */4]
            ], state$1);
}

function addVboBufferToGeometryBufferMapByRecord(geometryIndex, vboBufferRecord) {
  MutableSparseMapService$WonderCommonlib.set(geometryIndex, 0, vboBufferRecord[/* geometryVertexBufferMap */0]);
  MutableSparseMapService$WonderCommonlib.set(geometryIndex, 1, vboBufferRecord[/* geometryTexCoordBufferMap */1]);
  MutableSparseMapService$WonderCommonlib.set(geometryIndex, 2, vboBufferRecord[/* geometryNormalBufferMap */2]);
  MutableSparseMapService$WonderCommonlib.set(geometryIndex, 3, vboBufferRecord[/* geometryElementArrayBufferMap */3]);
  return vboBufferRecord;
}

function addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, vboBufferRecord) {
  MutableSparseMapService$WonderCommonlib.set(sourceInstanceIndex, 0, vboBufferRecord[/* matrixInstanceBufferMap */4]);
  return vboBufferRecord;
}

function addVboBufferToGeometryBufferMap(geometryIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */36] = addVboBufferToGeometryBufferMapByRecord(geometryIndex, state[/* vboBufferRecord */36]);
  return newrecord;
}

function addVboBufferToSourceInstanceBufferMap(sourceInstanceIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */36] = addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, state[/* vboBufferRecord */36]);
  return newrecord;
}

function getVboBufferRecord(state) {
  return state[/* vboBufferRecord */36];
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
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
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
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(AllDeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */20]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* geometryVertexBufferMap */0]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetGeometryVerticesRenderService$Wonderjs.getVertices
            ], state$1);
}

function getOrCreateGeometryTexCoordArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(AllDeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */20]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* geometryTexCoordBufferMap */1]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetGeometryTexCoordsRenderService$Wonderjs.getTexCoords
            ], state$1);
}

function getOrCreateGeometryNormalArrayBuffer(geometryIndex, state) {
  var state$1 = RenderStateTool$Wonderjs.createState(state);
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(AllDeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */20]), /* tuple */[
              geometryIndex,
              state$1[/* vboBufferRecord */1][/* geometryNormalBufferMap */2]
            ], /* tuple */[
              ArrayBufferRenderService$Wonderjs.createBuffer,
              GetGeometryNormalsRenderService$Wonderjs.getNormals
            ], state$1);
}

function getOrCreateGeometryElementArrayBuffer(geometryIndex, state) {
  var renderState = RenderStateTool$Wonderjs.createState(state);
  var gl = AllDeviceManagerService$Wonderjs.unsafeGetGl(renderState[/* deviceManagerRecord */20]);
  var elementArrayBufferMap = renderState[/* vboBufferRecord */1][/* geometryElementArrayBufferMap */3];
  var match = IndicesGeometryMainService$Wonderjs.unsafeGetIndicesType(geometryIndex, state);
  if (match) {
    return ElementArrayBufferRenderService$Wonderjs.getOrCreate32Buffer(gl, /* tuple */[
                geometryIndex,
                elementArrayBufferMap
              ], GetGeometryIndicesRenderService$Wonderjs.getIndices32, renderState);
  } else {
    return ElementArrayBufferRenderService$Wonderjs.getOrCreate16Buffer(gl, /* tuple */[
                geometryIndex,
                elementArrayBufferMap
              ], GetGeometryIndicesRenderService$Wonderjs.getIndices16, renderState);
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

export {
  getRecord ,
  getOrCreateInstanceBuffer ,
  addVboBufferToGeometryBufferMapByRecord ,
  addVboBufferToSourceInstanceBufferMapByRecord ,
  addVboBufferToGeometryBufferMap ,
  addVboBufferToSourceInstanceBufferMap ,
  getVboBufferRecord ,
  prepareCreatedBuffer ,
  getOrCreateGeometryVertexArrayBuffer ,
  getOrCreateGeometryTexCoordArrayBuffer ,
  getOrCreateGeometryNormalArrayBuffer ,
  getOrCreateGeometryElementArrayBuffer ,
  getOrCreateAllGeometryBuffers ,
  
}
/* Sinon Not a pure module */
