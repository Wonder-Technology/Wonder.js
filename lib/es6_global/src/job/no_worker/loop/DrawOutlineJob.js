

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as RenderJobUtils$Wonderjs from "../../utils/render/RenderJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../service/record/all/location/GLSLLocationService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as GeometryRenderService$Wonderjs from "../../../service/state/render/geometry/GeometryRenderService.js";
import * as UseProgramRenderService$Wonderjs from "../../../service/state/render/program/UseProgramRenderService.js";
import * as ArrayBufferRenderService$Wonderjs from "../../../service/state/render/vboBuffer/ArrayBufferRenderService.js";
import * as OperateRenderJobDataService$Wonderjs from "../../../service/record/render/jobData/OperateRenderJobDataService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../service/state/main/render/CreateRenderStateMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as ElementArrayBufferRenderService$Wonderjs from "../../../service/state/render/vboBuffer/ElementArrayBufferRenderService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryIndicesRenderService.js";
import * as GetGeometryNormalsRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryNormalsRenderService.js";
import * as GetGeometryVerticesRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryVerticesRenderService.js";
import * as HandleAttributeConfigDataService$Wonderjs from "../../../service/record/all/sender/attribute/HandleAttributeConfigDataService.js";
import * as NoMaterialShaderIndexShaderService$Wonderjs from "../../../service/record/all/shader/NoMaterialShaderIndexShaderService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../../../service/record/all/sender/uniform/HandleUniformRenderObjectModelService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/send_render_data/CreateSendRenederDataSubStateRenderService.js";
import * as HandleNoMaterialShaderUniformConfigDataService$Wonderjs from "../../../service/record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderUniformConfigDataService.js";

function _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex, getRenderDataSubState, state) {
  ArrayService$WonderCommonlib.forEach((function (param) {
          var pos = param[/* pos */0];
          var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
          if (match) {
            return param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](transformIndex, getRenderDataSubState));
          } else {
            return /* () */0;
          }
        }), HandleUniformRenderObjectModelService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
  return /* () */0;
}

function _sendAttributeData(gl, indexTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, sendRenderDataSubState, state, getOrCreateBufferFunc) {
  var dataTuple_001 = indexTuple[1];
  var dataTuple = /* tuple */[
    gl,
    dataTuple_001
  ];
  ArrayService$WonderCommonlib.forEach((function (param) {
          var arrayBuffer = Curry._4(getOrCreateBufferFunc, param[/* buffer */2], dataTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, state);
          return param[/* sendFunc */3](gl, /* tuple */[
                      param[/* size */1],
                      param[/* pos */0]
                    ], arrayBuffer, sendRenderDataSubState);
        }), HandleAttributeConfigDataService$Wonderjs.unsafeGetAttributeSendData(indexTuple[0], state[/* glslSenderRecord */3]));
  return /* () */0;
}

function _getOrCreateBuffer(buffer, param, param$1, state) {
  var match = param$1[1];
  var match$1 = param$1[0];
  var elementArrayBufferMap = match$1[1];
  var geometryIndex = param[1];
  var gl = param[0];
  if (buffer !== 3) {
    if (buffer !== 0) {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getOrCreateBuffer", "unknown buffer: " + (String(buffer) + ""), "", "", ""));
    } else {
      return ArrayBufferRenderService$Wonderjs.getOrCreateBuffer(gl, /* tuple */[
                  geometryIndex,
                  match$1[0]
                ], match[0], state);
    }
  } else {
    var match$2 = GeometryRenderService$Wonderjs.unsafeGetIndicesType(geometryIndex, state);
    if (match$2) {
      return ElementArrayBufferRenderService$Wonderjs.getOrCreate32Buffer(gl, /* tuple */[
                  geometryIndex,
                  elementArrayBufferMap
                ], match[2](geometryIndex, state), state);
    } else {
      return ElementArrayBufferRenderService$Wonderjs.getOrCreate16Buffer(gl, /* tuple */[
                  geometryIndex,
                  elementArrayBufferMap
                ], match[1](geometryIndex, state), state);
    }
  }
}

function _sendAttributeData$1(gl, indexTuple, sendRenderDataSubState, state) {
  var vboBufferRecord = state[/* vboBufferRecord */1];
  var currentGeometryBufferMapAndGetPointsFuncsTuple_000 = /* tuple */[
    vboBufferRecord[/* geometryVertexBufferMap */0],
    vboBufferRecord[/* geometryElementArrayBufferMap */3]
  ];
  var currentGeometryBufferMapAndGetPointsFuncsTuple_001 = /* tuple */[
    GetGeometryVerticesRenderService$Wonderjs.getVertices,
    GetGeometryIndicesRenderService$Wonderjs.getIndices16,
    GetGeometryIndicesRenderService$Wonderjs.getIndices32
  ];
  var currentGeometryBufferMapAndGetPointsFuncsTuple = /* tuple */[
    currentGeometryBufferMapAndGetPointsFuncsTuple_000,
    currentGeometryBufferMapAndGetPointsFuncsTuple_001
  ];
  return _sendAttributeData(gl, indexTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, sendRenderDataSubState, state, _getOrCreateBuffer);
}

function draw(gl, shaderIndex, renderDataArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var geometryIndex = param[3];
                var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state);
                _sendAttributeData$1(gl, /* tuple */[
                      shaderIndex,
                      geometryIndex
                    ], sendRenderDataSubState, state);
                var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state);
                _sendUniformRenderObjectModelData(gl, shaderIndex, param[0], getRenderDataSubState, state);
                RenderJobUtils$Wonderjs.draw(gl, param[2], geometryIndex, state);
                return state;
              }), state, renderDataArr);
}

var DrawOriginGameObjects = /* module */[
  /* _getOrCreateBuffer */_getOrCreateBuffer,
  /* _sendAttributeData */_sendAttributeData$1,
  /* draw */draw
];

function _getOrCreateBuffer$1(buffer, param, param$1, state) {
  var match = param$1[1];
  var match$1 = param$1[0];
  var elementArrayBufferMap = match$1[2];
  var geometryIndex = param[1];
  var gl = param[0];
  var exit = 0;
  switch (buffer) {
    case 0 : 
        return ArrayBufferRenderService$Wonderjs.getOrCreateBuffer(gl, /* tuple */[
                    geometryIndex,
                    match$1[0]
                  ], match[0], state);
    case 1 : 
        return ArrayBufferRenderService$Wonderjs.getOrCreateBuffer(gl, /* tuple */[
                    geometryIndex,
                    match$1[1]
                  ], match[1], state);
    case 3 : 
        var match$2 = GeometryRenderService$Wonderjs.unsafeGetIndicesType(geometryIndex, state);
        if (match$2) {
          return ElementArrayBufferRenderService$Wonderjs.getOrCreate32Buffer(gl, /* tuple */[
                      geometryIndex,
                      elementArrayBufferMap
                    ], match[3](geometryIndex, state), state);
        } else {
          return ElementArrayBufferRenderService$Wonderjs.getOrCreate16Buffer(gl, /* tuple */[
                      geometryIndex,
                      elementArrayBufferMap
                    ], match[2](geometryIndex, state), state);
        }
    case 2 : 
    case 4 : 
    case 5 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getOrCreateBuffer", "unknown buffer: " + (String(buffer) + ""), "", "", ""));
  }
  
}

function _sendAttributeData$2(gl, indexTuple, sendRenderDataSubState, state) {
  var vboBufferRecord = state[/* vboBufferRecord */1];
  var currentGeometryBufferMapAndGetPointsFuncsTuple_000 = /* tuple */[
    vboBufferRecord[/* geometryVertexBufferMap */0],
    vboBufferRecord[/* geometryNormalBufferMap */2],
    vboBufferRecord[/* geometryElementArrayBufferMap */3]
  ];
  var currentGeometryBufferMapAndGetPointsFuncsTuple_001 = /* tuple */[
    GetGeometryVerticesRenderService$Wonderjs.getVertices,
    GetGeometryNormalsRenderService$Wonderjs.getNormals,
    GetGeometryIndicesRenderService$Wonderjs.getIndices16,
    GetGeometryIndicesRenderService$Wonderjs.getIndices32
  ];
  var currentGeometryBufferMapAndGetPointsFuncsTuple = /* tuple */[
    currentGeometryBufferMapAndGetPointsFuncsTuple_000,
    currentGeometryBufferMapAndGetPointsFuncsTuple_001
  ];
  return _sendAttributeData(gl, indexTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, sendRenderDataSubState, state, _getOrCreateBuffer$1);
}

function _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state) {
  ArrayService$WonderCommonlib.forEach((function (param) {
          var pos = param[/* pos */2];
          var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
          if (match) {
            return param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                        param[/* name */1],
                        pos
                      ], param[/* getDataFunc */3](getRenderDataSubState));
          } else {
            return /* () */0;
          }
        }), HandleNoMaterialShaderUniformConfigDataService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
  return state;
}

function draw$1(gl, shaderIndex, renderDataArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var geometryIndex = param[3];
                var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state);
                _sendAttributeData$2(gl, /* tuple */[
                      shaderIndex,
                      geometryIndex
                    ], sendRenderDataSubState, state);
                var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state);
                _sendUniformRenderObjectModelData(gl, shaderIndex, param[0], getRenderDataSubState, state);
                _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state);
                RenderJobUtils$Wonderjs.draw(gl, param[2], geometryIndex, state);
                return state;
              }), state, renderDataArr);
}

var DrawExpandGameObjects = /* module */[
  /* _getOrCreateBuffer */_getOrCreateBuffer$1,
  /* _sendAttributeData */_sendAttributeData$2,
  /* _sendUniformNoMaterialShaderData */_sendUniformNoMaterialShaderData,
  /* draw */draw$1
];

function _prepareGlState(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setColorWrite(gl, /* tuple */[
        false,
        false,
        false,
        false
      ], DeviceManagerService$Wonderjs.setDepthWrite(gl, false, DeviceManagerService$Wonderjs.setDepthTest(gl, false, DeviceManagerService$Wonderjs.setStencilMask(gl, 255, DeviceManagerService$Wonderjs.setStencilFunc(gl, gl.ALWAYS, 1, 255, DeviceManagerService$Wonderjs.setStencilOp(gl, gl.KEEP, gl.KEEP, gl.REPLACE, DeviceManagerService$Wonderjs.setStencilTest(gl, true, state[/* deviceManagerRecord */18])))))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

var _useDrawOriginGameObjectsProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

var _useDrawExpandGameObjectsProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

function _setGlStateBeforeDrawExpandGameObjects(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setColorWrite(gl, /* tuple */[
        true,
        true,
        true,
        true
      ], DeviceManagerService$Wonderjs.setDepthWrite(gl, false, DeviceManagerService$Wonderjs.setDepthTest(gl, false, DeviceManagerService$Wonderjs.setStencilMask(gl, 0, DeviceManagerService$Wonderjs.setStencilFunc(gl, gl.NOTEQUAL, 1, 255, state[/* deviceManagerRecord */18])))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

function _restoreGlState(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setDepthWrite(gl, true, DeviceManagerService$Wonderjs.setDepthTest(gl, true, DeviceManagerService$Wonderjs.setStencilMask(gl, 255, DeviceManagerService$Wonderjs.setStencilTest(gl, false, state[/* deviceManagerRecord */18]))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

function exec(renderDataArr, state) {
  var shaderRecord = state[/* shaderRecord */23];
  var drawOriginGameObjectsShaderIndex = NoMaterialShaderIndexShaderService$Wonderjs.unsafeGetShaderIndex("outline_draw_origin_gameObjects", shaderRecord);
  var drawExpandGameObjectsShaderIndex = NoMaterialShaderIndexShaderService$Wonderjs.unsafeGetShaderIndex("outline_draw_expand_gameObjects", shaderRecord);
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]);
  var state$1 = _prepareGlState(gl, state);
  var state$2 = _setGlStateBeforeDrawExpandGameObjects(gl, draw(gl, drawOriginGameObjectsShaderIndex, renderDataArr, UseProgramRenderService$Wonderjs.useByShaderIndex(gl, drawOriginGameObjectsShaderIndex, state$1)));
  return _restoreGlState(gl, draw$1(gl, drawExpandGameObjectsShaderIndex, renderDataArr, UseProgramRenderService$Wonderjs.useByShaderIndex(gl, drawExpandGameObjectsShaderIndex, state$2)));
}

var DrawOutlineJobUtils = /* module */[
  /* _sendUniformRenderObjectModelData */_sendUniformRenderObjectModelData,
  /* _sendAttributeData */_sendAttributeData,
  /* DrawOriginGameObjects */DrawOriginGameObjects,
  /* DrawExpandGameObjects */DrawExpandGameObjects,
  /* _prepareGlState */_prepareGlState,
  /* _useDrawOriginGameObjectsProgram */_useDrawOriginGameObjectsProgram,
  /* _useDrawExpandGameObjectsProgram */_useDrawExpandGameObjectsProgram,
  /* _setGlStateBeforeDrawExpandGameObjects */_setGlStateBeforeDrawExpandGameObjects,
  /* _restoreGlState */_restoreGlState,
  /* exec */exec
];

function _getMaterialComponent(gameObject, gameObjectRecord) {
  var match = GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent(gameObject, gameObjectRecord);
  if (match !== undefined) {
    return match;
  } else {
    var match$1 = GetComponentGameObjectService$Wonderjs.getLightMaterialComponent(gameObject, gameObjectRecord);
    if (match$1 !== undefined) {
      return match$1;
    } else {
      return undefined;
    }
  }
}

function _getRenderDataArr(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ArrayService$WonderCommonlib.reduceOneParam((function (renderDataArr, gameObjectNeedDrawOutline) {
                var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObjectNeedDrawOutline, gameObjectRecord);
                var match = Js_option.andThen((function (geometry) {
                        return Js_option.andThen((function (material) {
                                      return Js_option.andThen((function (meshRenderer) {
                                                    return /* tuple */[
                                                            transform,
                                                            material,
                                                            meshRenderer,
                                                            geometry
                                                          ];
                                                  }), GetComponentGameObjectService$Wonderjs.getMeshRendererComponent(gameObjectNeedDrawOutline, gameObjectRecord));
                                    }), _getMaterialComponent(gameObjectNeedDrawOutline, gameObjectRecord));
                      }), GetComponentGameObjectService$Wonderjs.getGeometryComponent(gameObjectNeedDrawOutline, gameObjectRecord));
                if (match !== undefined) {
                  return ArrayService$Wonderjs.push(match, renderDataArr);
                } else {
                  return renderDataArr;
                }
              }), /* array */[], OperateRenderJobDataService$Wonderjs.getGameObjectsNeedDrawOutline(state[/* jobDataRecord */43]));
}

function execJob(_, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  exec(_getRenderDataArr(state), renderState);
  return state;
}

export {
  DrawOutlineJobUtils ,
  _getMaterialComponent ,
  _getRenderDataArr ,
  execJob ,
  
}
/* Log-WonderLog Not a pure module */
