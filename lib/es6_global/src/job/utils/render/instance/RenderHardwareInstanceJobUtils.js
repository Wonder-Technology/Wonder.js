

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as DrawGLSLService$Wonderjs from "../../../../service/record/all/sender/DrawGLSLService.js";
import * as TypeArrayService$Wonderjs from "../../../../service/primitive/buffer/TypeArrayService.js";
import * as AllGPUDetectService$Wonderjs from "../../../../service/record/all/gpu/AllGPUDetectService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../service/record/all/sender/SendGLSLDataService.js";
import * as GeometryRenderService$Wonderjs from "../../../../service/state/render/geometry/GeometryRenderService.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as InstanceBufferRenderService$Wonderjs from "../../../../service/state/render/vboBuffer/InstanceBufferRenderService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "../../../../service/state/render/geometry/GetGeometryIndicesRenderService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../../service/primitive/instance/ObjectInstanceCollectionService.js";
import * as HandleAttributeConfigDataService$Wonderjs from "../../../../service/record/all/sender/attribute/HandleAttributeConfigDataService.js";
import * as StaticRenderSourceInstanceService$Wonderjs from "../../../../service/record/render/instance/sourceInstance/StaticRenderSourceInstanceService.js";
import * as GetTransformDataGetRenderDataService$Wonderjs from "../../../../service/state/render/sub/get_render_data/transform/GetTransformDataGetRenderDataService.js";
import * as MarkIsSendTransformMatrixDataService$Wonderjs from "../../../../service/primitive/instance/MarkIsSendTransformMatrixDataService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../../service/state/render/sub/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as BuildObjectInstanceTransformDataTupleUtils$Wonderjs from "./BuildObjectInstanceTransformDataTupleUtils.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../../../service/state/render/sub/send_render_data/CreateSendRenederDataSubStateRenderService.js";

function _fillObjectInstanceData(objectInstanceTransformDataTuple, matricesArrayForInstance, fillMatrixTypeArrFunc, getRenderDataSubState, offset) {
  ObjectInstanceCollectionService$Wonderjs.reduceObjectInstanceTransformCollection(objectInstanceTransformDataTuple, offset, (function (offset, objectInstanceTransform) {
          return fillMatrixTypeArrFunc(objectInstanceTransform, matricesArrayForInstance, getRenderDataSubState, offset);
        }));
  return /* () */0;
}

function _sendTransformMatrixDataBuffer(param, param$1, sendRenderDataSubState) {
  var match = param$1[0];
  var pos = match[/* pos */0];
  var gl = param[0];
  gl.vertexAttribPointer(pos, match[/* size */1], gl.FLOAT, false, param$1[1], match[/* getOffsetFunc */2](param$1[2]));
  param[1].vertexAttribDivisorANGLE(pos, 1);
  SendGLSLDataService$Wonderjs.enableVertexAttribArray(gl, pos, sendRenderDataSubState[/* vertexAttribHistoryArray */0]);
  return sendRenderDataSubState;
}

function _sendTransformMatrixDataBufferData(glDataTuple, shaderIndex, stride, param) {
  var state = param[1];
  var sendRenderDataSubState = param[0];
  ArrayService$WonderCommonlib.forEachi((function (sendData, index) {
          return _sendTransformMatrixDataBuffer(glDataTuple, /* tuple */[
                      sendData,
                      stride,
                      index
                    ], sendRenderDataSubState);
        }), HandleAttributeConfigDataService$Wonderjs.unsafeGetInstanceAttributeSendData(shaderIndex, state[/* glslSenderRecord */3]));
  return state;
}

function _updateAndSendTransformMatrixDataBufferData(glDataTuple, shaderIndex, param, param$1) {
  InstanceBufferRenderService$Wonderjs.updateData(glDataTuple[0], param[1], param[2]);
  return _sendTransformMatrixDataBufferData(glDataTuple, shaderIndex, param[0], /* tuple */[
              param$1[0],
              param$1[1]
            ]);
}

function _sendTransformMatrixData(param, param$1, fillMatrixTypeArrFunc, state) {
  var match = param$1[2];
  var matrixFloat32ArrayMap = match[2];
  var matrixInstanceBufferMap = match[1];
  var matrixInstanceBufferCapacityMap = match[0];
  var match$1 = param$1[1];
  var defaultCapacity = match$1[0];
  var match$2 = param$1[0];
  var gl = match$2[0];
  var sourceInstance = param[1];
  var matrixInstanceBuffer = InstanceBufferRenderService$Wonderjs.getOrCreateBuffer(/* tuple */[
        gl,
        sourceInstance,
        defaultCapacity
      ], /* tuple */[
        matrixInstanceBufferCapacityMap,
        matrixInstanceBufferMap
      ], state);
  var matricesArrayForInstance = InstanceBufferRenderService$Wonderjs.getOrCreateMatrixFloat32Array(sourceInstance, defaultCapacity, /* tuple */[
        matrixInstanceBufferCapacityMap,
        matrixFloat32ArrayMap
      ], state);
  var match$3 = InstanceBufferRenderService$Wonderjs.setCapacityAndUpdateBufferTypeArray(/* tuple */[
        gl,
        sourceInstance,
        Caml_int32.imul(match$1[4], match$1[1]),
        defaultCapacity
      ], /* tuple */[
        matrixInstanceBuffer,
        matricesArrayForInstance
      ], /* tuple */[
        matrixInstanceBufferMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap
      ], state);
  var matricesArrayForInstance$1 = match$3[1];
  var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state);
  _fillObjectInstanceData(match$1[3], matricesArrayForInstance$1, fillMatrixTypeArrFunc, getRenderDataSubState, fillMatrixTypeArrFunc(param[0], matricesArrayForInstance$1, getRenderDataSubState, 0));
  return _updateAndSendTransformMatrixDataBufferData(/* tuple */[
              gl,
              match$2[1]
            ], match$2[2], /* tuple */[
              match$1[2],
              matricesArrayForInstance$1,
              match$3[0]
            ], /* tuple */[
              CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state),
              state
            ]);
}

function _sendStaticTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, state) {
  var match = dataTuple[2];
  var match$1 = dataTuple[1];
  var match$2 = dataTuple[0];
  var gl = match$2[0];
  var sourceInstance = componentTuple[1];
  var match$3 = MarkIsSendTransformMatrixDataService$Wonderjs.isSendTransformMatrixData(sourceInstance, state[/* sourceInstanceRecord */17][/* isSendTransformMatrixDataMap */5]);
  if (match$3) {
    InstanceBufferRenderService$Wonderjs.bind(gl, InstanceBufferRenderService$Wonderjs.getOrCreateBuffer(/* tuple */[
              gl,
              sourceInstance,
              match$1[0]
            ], /* tuple */[
              match[0],
              match[1]
            ], state));
    var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state);
    return _sendTransformMatrixDataBufferData(/* tuple */[
                gl,
                match$2[1]
              ], match$2[2], match$1[2], /* tuple */[
                sendRenderDataSubState,
                state
              ]);
  } else {
    var state$1 = _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, state);
    var newrecord = Caml_array.caml_array_dup(state$1);
    newrecord[/* sourceInstanceRecord */17] = StaticRenderSourceInstanceService$Wonderjs.markIsSendTransformMatrixData(sourceInstance, true, state$1[/* sourceInstanceRecord */17]);
    return newrecord;
  }
}

function _sendDynamicTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  return _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc, (newrecord[/* sourceInstanceRecord */17] = StaticRenderSourceInstanceService$Wonderjs.markIsSendTransformMatrixData(componentTuple[1], false, state[/* sourceInstanceRecord */17]), newrecord));
}

function _geMatrixMapTuple(state) {
  var match = state[/* vboBufferRecord */1];
  var match$1 = state[/* sourceInstanceRecord */17];
  return /* tuple */[
          match$1[/* matrixInstanceBufferCapacityMap */3],
          match[/* matrixInstanceBufferMap */4],
          match$1[/* matrixFloat32ArrayMap */4]
        ];
}

function _renderSourceInstanceGameObject(gl, indexTuple, renderFunc, state) {
  return renderFunc(gl, indexTuple, state);
}

function _prepareData(gl, shaderIndex, param, state) {
  var extension = AllGPUDetectService$Wonderjs.unsafeGetInstanceExtension(state[/* gpuDetectRecord */18]);
  var match = BuildObjectInstanceTransformDataTupleUtils$Wonderjs.build(param[0], state);
  var instanceRenderListCount = ObjectInstanceCollectionService$Wonderjs.getObjectInstanceTransformCount(match[0]) + 1 | 0;
  return /* tuple */[
          /* tuple */[
            gl,
            extension,
            shaderIndex
          ],
          /* tuple */[
            param[1],
            param[2],
            param[3],
            match[1],
            instanceRenderListCount
          ],
          _geMatrixMapTuple(state)
        ];
}

function _unbind(shaderIndex, extension, state) {
  ArrayService$WonderCommonlib.forEach((function (param) {
          extension.vertexAttribDivisorANGLE(param[/* pos */0], 0);
          return /* () */0;
        }), HandleAttributeConfigDataService$Wonderjs.unsafeGetInstanceAttributeSendData(shaderIndex, state[/* glslSenderRecord */3]));
  return state;
}

function render(gl, param, param$1, state) {
  var fillMatrixTypeArrFunc = param$1[1];
  var indexTuple = param[0];
  var sourceInstance = indexTuple[5];
  var geometryIndex = indexTuple[4];
  var meshRendererIndex = indexTuple[3];
  var shaderIndex = indexTuple[2];
  var transformIndex = indexTuple[0];
  var state$1 = _renderSourceInstanceGameObject(gl, /* tuple */[
        transformIndex,
        indexTuple[1],
        shaderIndex,
        meshRendererIndex,
        geometryIndex
      ], param$1[0], state);
  var dataTuple = _prepareData(gl, shaderIndex, /* tuple */[
        sourceInstance,
        param[1],
        param[2],
        param[3]
      ], state$1);
  var match = dataTuple[0];
  var extension = match[1];
  var gl$1 = match[0];
  var match$1 = StaticRenderSourceInstanceService$Wonderjs.isTransformStatic(sourceInstance, state$1[/* sourceInstanceRecord */17]);
  var state$2 = match$1 ? _sendStaticTransformMatrixData(/* tuple */[
          transformIndex,
          sourceInstance
        ], dataTuple, fillMatrixTypeArrFunc, state$1) : _sendDynamicTransformMatrixData(/* tuple */[
          transformIndex,
          sourceInstance
        ], dataTuple, fillMatrixTypeArrFunc, state$1);
  DrawGLSLService$Wonderjs.drawElementsInstancedANGLE(/* tuple */[
        DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl$1, meshRendererIndex, state$2),
        GeometryRenderService$Wonderjs.getIndexType(gl$1, geometryIndex, state$2),
        GeometryRenderService$Wonderjs.getIndexTypeSize(gl$1, geometryIndex, state$2),
        GetGeometryIndicesRenderService$Wonderjs.getIndicesCount(geometryIndex, state$2),
        dataTuple[1][4]
      ], extension);
  return _unbind(shaderIndex, extension, state$2);
}

function fillMatrixTypeArr(transformIndex, matricesArrayForInstance, state, offset) {
  return TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
              matricesArrayForInstance,
              offset
            ], /* tuple */[
              GetTransformDataGetRenderDataService$Wonderjs.getLocalToWorldMatrixTypeArray(transformIndex, state),
              0
            ], 16);
}

export {
  _fillObjectInstanceData ,
  _sendTransformMatrixDataBuffer ,
  _sendTransformMatrixDataBufferData ,
  _updateAndSendTransformMatrixDataBufferData ,
  _sendTransformMatrixData ,
  _sendStaticTransformMatrixData ,
  _sendDynamicTransformMatrixData ,
  _geMatrixMapTuple ,
  _renderSourceInstanceGameObject ,
  _prepareData ,
  _unbind ,
  render ,
  fillMatrixTypeArr ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
