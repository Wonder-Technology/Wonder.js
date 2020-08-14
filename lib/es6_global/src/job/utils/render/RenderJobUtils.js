

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DrawGLSLService$Wonderjs from "../../../service/record/all/sender/DrawGLSLService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../service/record/all/location/GLSLLocationService.js";
import * as GeometryRenderService$Wonderjs from "../../../service/state/render/geometry/GeometryRenderService.js";
import * as UseProgramRenderService$Wonderjs from "../../../service/state/render/program/UseProgramRenderService.js";
import * as ArrayBufferRenderService$Wonderjs from "../../../service/state/render/vboBuffer/ArrayBufferRenderService.js";
import * as ElementArrayBufferRenderService$Wonderjs from "../../../service/state/render/vboBuffer/ElementArrayBufferRenderService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryIndicesRenderService.js";
import * as GetGeometryNormalsRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryNormalsRenderService.js";
import * as GetGeometryVerticesRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryVerticesRenderService.js";
import * as HandleAttributeConfigDataService$Wonderjs from "../../../service/record/all/sender/attribute/HandleAttributeConfigDataService.js";
import * as GetGeometryTexCoordsRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryTexCoordsRenderService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../../../service/record/all/sender/uniform/HandleUniformRenderObjectModelService.js";
import * as HandleUniformRenderObjectMaterialService$Wonderjs from "../../../service/record/all/sender/uniform/HandleUniformRenderObjectMaterialService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/send_render_data/CreateSendRenederDataSubStateRenderService.js";

function _getOrCreateBuffer(buffer, param, param$1, state) {
  var match = param$1[1];
  var match$1 = param$1[0];
  var elementArrayBufferMap = match$1[3];
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
                    match$1[2]
                  ], match[2], state);
    case 2 : 
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
                    ], match[4], state);
        } else {
          return ElementArrayBufferRenderService$Wonderjs.getOrCreate16Buffer(gl, /* tuple */[
                      geometryIndex,
                      elementArrayBufferMap
                    ], match[3], state);
        }
    case 4 : 
    case 5 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getOrCreateBuffer", "unknown buffer: " + (String(buffer) + ""), "", "", ""));
  }
  
}

function _directlySendAttributeData(gl, param, sendRenderDataSubState, state) {
  var vboBufferRecord = state[/* vboBufferRecord */1];
  var currentGeometryBufferMapAndGetPointsFuncsTuple_000 = /* tuple */[
    vboBufferRecord[/* geometryVertexBufferMap */0],
    vboBufferRecord[/* geometryTexCoordBufferMap */1],
    vboBufferRecord[/* geometryNormalBufferMap */2],
    vboBufferRecord[/* geometryElementArrayBufferMap */3]
  ];
  var currentGeometryBufferMapAndGetPointsFuncsTuple_001 = /* tuple */[
    GetGeometryVerticesRenderService$Wonderjs.getVertices,
    GetGeometryTexCoordsRenderService$Wonderjs.getTexCoords,
    GetGeometryNormalsRenderService$Wonderjs.getNormals,
    GetGeometryIndicesRenderService$Wonderjs.getIndices16,
    GetGeometryIndicesRenderService$Wonderjs.getIndices32
  ];
  var currentGeometryBufferMapAndGetPointsFuncsTuple = /* tuple */[
    currentGeometryBufferMapAndGetPointsFuncsTuple_000,
    currentGeometryBufferMapAndGetPointsFuncsTuple_001
  ];
  var dataTuple_001 = param[1];
  var dataTuple = /* tuple */[
    gl,
    dataTuple_001
  ];
  ArrayService$WonderCommonlib.forEach((function (param) {
          var arrayBuffer = _getOrCreateBuffer(param[/* buffer */2], dataTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, state);
          return param[/* sendFunc */3](gl, /* tuple */[
                      param[/* size */1],
                      param[/* pos */0]
                    ], arrayBuffer, sendRenderDataSubState);
        }), HandleAttributeConfigDataService$Wonderjs.unsafeGetAttributeSendData(param[0], state[/* glslSenderRecord */3]));
  return state;
}

var sendAttributeData = _directlySendAttributeData;

function sendUniformRenderObjectModelData(gl, param, param$1) {
  var getRenderDataSubState = param$1[0];
  var transformIndex = param[1];
  ArrayService$WonderCommonlib.forEach((function (param) {
          var pos = param[/* pos */0];
          var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
          if (match) {
            return param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](transformIndex, getRenderDataSubState));
          } else {
            return /* () */0;
          }
        }), HandleUniformRenderObjectModelService$Wonderjs.unsafeGetUniformSendData(param[0], param$1[1][/* glslSenderRecord */3]));
  return /* () */0;
}

function sendUniformRenderObjectMaterialData(gl, param, getRenderDataSubState, state) {
  var materialIndex = param[1];
  ArrayService$WonderCommonlib.forEach((function (param) {
          return param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                      param[/* name */1],
                      param[/* pos */2]
                    ], param[/* getDataFunc */3](materialIndex, getRenderDataSubState));
        }), HandleUniformRenderObjectMaterialService$Wonderjs.unsafeGetUniformSendData(param[0], state[/* glslSenderRecord */3]));
  return state;
}

function render(gl, param, bindAndUpdateFunc, state) {
  var shaderIndex = param[2];
  var materialIndex = param[1];
  var state$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, state);
  var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state$1);
  var state$2 = sendAttributeData(gl, /* tuple */[
        shaderIndex,
        param[4]
      ], sendRenderDataSubState, state$1);
  var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state$2);
  sendUniformRenderObjectModelData(gl, /* tuple */[
        shaderIndex,
        param[0]
      ], /* tuple */[
        getRenderDataSubState,
        state$2
      ]);
  var record = state$2[/* glslSenderRecord */3];
  var lastSendMaterialData = record[/* lastSendMaterialData */11];
  var exit = 0;
  if (lastSendMaterialData !== undefined) {
    var match = lastSendMaterialData;
    if (match[0] === materialIndex && match[1] === shaderIndex) {
      return state$2;
    } else {
      exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    record[/* lastSendMaterialData */11] = /* tuple */[
      materialIndex,
      shaderIndex
    ];
    var getRenderDataSubState$1 = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state$2);
    var state$3 = sendUniformRenderObjectMaterialData(gl, /* tuple */[
          shaderIndex,
          materialIndex
        ], getRenderDataSubState$1, state$2);
    return bindAndUpdateFunc(gl, materialIndex, state$3);
  }
  
}

function draw(gl, glDrawMode, geometryIndex, state) {
  return DrawGLSLService$Wonderjs.drawElement(/* tuple */[
              glDrawMode,
              GeometryRenderService$Wonderjs.getIndexType(gl, geometryIndex, state),
              GeometryRenderService$Wonderjs.getIndexTypeSize(gl, geometryIndex, state),
              GetGeometryIndicesRenderService$Wonderjs.getIndicesCount(geometryIndex, state)
            ], gl);
}

export {
  _getOrCreateBuffer ,
  _directlySendAttributeData ,
  sendAttributeData ,
  sendUniformRenderObjectModelData ,
  sendUniformRenderObjectMaterialData ,
  render ,
  draw ,
  
}
/* Log-WonderLog Not a pure module */
