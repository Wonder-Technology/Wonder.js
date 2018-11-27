

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ProgramService$Wonderjs from "../../../service/record/all/program/ProgramService.js";
import * as DrawGLSLService$Wonderjs from "../../../service/record/render/sender/DrawGLSLService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../service/record/all/location/GLSLLocationService.js";
import * as GeometryRenderService$Wonderjs from "../../../service/state/render/geometry/GeometryRenderService.js";
import * as UseProgramRenderService$Wonderjs from "../../../service/state/render/program/UseProgramRenderService.js";
import * as ArrayBufferRenderService$Wonderjs from "../../../service/state/render/vboBuffer/ArrayBufferRenderService.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as ElementArrayBufferRenderService$Wonderjs from "../../../service/state/render/vboBuffer/ElementArrayBufferRenderService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryIndicesRenderService.js";
import * as GetGeometryNormalsRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryNormalsRenderService.js";
import * as GetGeometryVerticesRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryVerticesRenderService.js";
import * as HandleAttributeConfigDataService$Wonderjs from "../../../service/record/render/sender/attribute/HandleAttributeConfigDataService.js";
import * as GetGeometryTexCoordsRenderService$Wonderjs from "../../../service/state/render/geometry/GetGeometryTexCoordsRenderService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../../../service/record/render/sender/uniform/HandleUniformRenderObjectModelService.js";
import * as HandleUniformRenderObjectMaterialService$Wonderjs from "../../../service/record/render/sender/uniform/HandleUniformRenderObjectMaterialService.js";

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
                    ], match[4](geometryIndex, state), state);
        } else {
          return ElementArrayBufferRenderService$Wonderjs.getOrCreate16Buffer(gl, /* tuple */[
                      geometryIndex,
                      elementArrayBufferMap
                    ], match[3](geometryIndex, state), state);
        }
    case 4 : 
    case 5 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_sendAttributeData", "unknown buffer: " + (String(buffer) + ""), "", "", ""));
  }
  
}

function _directlySendAttributeData(gl, param, state) {
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
    GetGeometryIndicesRenderService$Wonderjs.getIndices,
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
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var arrayBuffer = _getOrCreateBuffer(param[/* buffer */2], dataTuple, currentGeometryBufferMapAndGetPointsFuncsTuple, state);
                return param[/* sendFunc */3](gl, /* tuple */[
                            param[/* size */1],
                            param[/* pos */0]
                          ], arrayBuffer, state);
              }), state, HandleAttributeConfigDataService$Wonderjs.unsafeGetAttributeSendData(param[0], state[/* glslSenderRecord */3]));
}

var _sendAttributeData = _directlySendAttributeData;

function _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var pos = param[/* pos */0];
                var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
                if (match) {
                  param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](transformIndex, state));
                }
                return state;
              }), state, HandleUniformRenderObjectModelService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
}

function _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                      param[/* name */1],
                      param[/* pos */2]
                    ], param[/* getDataFunc */3](materialIndex, state));
                return state;
              }), state, HandleUniformRenderObjectMaterialService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
}

function render(gl, param, bindAndUpdateFunc, state) {
  var shaderIndex = param[2];
  var materialIndex = param[1];
  var program = ProgramService$Wonderjs.unsafeGetProgram(shaderIndex, state[/* programRecord */4]);
  var state$1 = _sendUniformRenderObjectModelData(gl, shaderIndex, param[0], _sendAttributeData(gl, /* tuple */[
            shaderIndex,
            param[4]
          ], UseProgramRenderService$Wonderjs.use(gl, program, state)));
  var record = state$1[/* glslSenderRecord */3];
  var lastSendMaterialData = record[/* lastSendMaterialData */10];
  var exit = 0;
  if (lastSendMaterialData !== undefined) {
    var match = lastSendMaterialData;
    if (match[0] === materialIndex && match[1] === shaderIndex) {
      return state$1;
    } else {
      exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    record[/* lastSendMaterialData */10] = /* tuple */[
      materialIndex,
      shaderIndex
    ];
    var state$2 = _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex, state$1);
    return bindAndUpdateFunc(gl, materialIndex, state$2);
  }
  
}

function draw(gl, meshRendererIndex, geometryIndex, state) {
  return DrawGLSLService$Wonderjs.drawElement(/* tuple */[
              DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, meshRendererIndex, state),
              GeometryRenderService$Wonderjs.getIndexType(gl, geometryIndex, state),
              GeometryRenderService$Wonderjs.getIndexTypeSize(gl, geometryIndex, state),
              GetGeometryIndicesRenderService$Wonderjs.getIndicesCount(geometryIndex, state)
            ], gl);
}

export {
  _getOrCreateBuffer ,
  _directlySendAttributeData ,
  _sendAttributeData ,
  _sendUniformRenderObjectModelData ,
  _sendUniformRenderObjectMaterialData ,
  render ,
  draw ,
  
}
/* Log-WonderLog Not a pure module */
