

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_int32 from "./../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../service/state/main/geometry/TexCoordsGeometryMainService.js";

function _getBufferData(param, param$1) {
  var bytes_per_element = param$1[2];
  var accessorIndex = param$1[0];
  var accessors = param[/* accessors */10];
  var bufferViews = param[/* bufferViews */9];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not support interleaved buffer data", "is interleaved"), (function (param) {
                        var accessor = accessors[accessorIndex];
                        var match = bufferViews[accessor[/* bufferView */0]];
                        var byteStride = match[/* byteStride */3];
                        var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(byteStride);
                        if (match$1) {
                          return Contract$WonderLog.assertPass(/* () */0);
                        } else {
                          return Contract$WonderLog.Operators[/* = */0](OptionService$Wonderjs.unsafeGetJsonSerializedValue(byteStride), Caml_int32.imul(BufferUtils$Wonderjs.getAccessorTypeSize(accessor[/* type_ */4]), bytes_per_element));
                        }
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var accessor = accessors[accessorIndex];
  var bufferView = bufferViews[accessor[/* bufferView */0]];
  var dataView = param$1[1][bufferView[/* buffer */0]];
  var offset = accessor[/* byteOffset */1] + bufferView[/* byteOffset */1] | 0;
  return /* tuple */[
          dataView.buffer,
          offset,
          BufferUtils$Wonderjs.computeTypeArrayLengthByAccessorData(accessor[/* count */2], accessor[/* type_ */4])
        ];
}

function _getBufferPointData(param, fromBufferRangeFunc) {
  var match = _getBufferData(param[3], /* tuple */[
        param[0],
        param[2],
        param[1]
      ]);
  return Curry._3(fromBufferRangeFunc, match[0], match[1], match[2]);
}

function getBufferAttributeData(accessorIndex, dataViewArr, wd) {
  return _getBufferPointData(/* tuple */[
              accessorIndex,
              Float32Array.BYTES_PER_ELEMENT,
              dataViewArr,
              wd
            ], (function (prim, prim$1, prim$2) {
                return new Float32Array(prim, prim$1, prim$2);
              }));
}

function getAccessorComponentType(param, accessorIndex) {
  return param[/* accessors */10][accessorIndex][/* componentType */3];
}

function getBufferIndex16Data(componentType, accessorIndex, dataViewArr, wd) {
  switch (componentType) {
    case 1 : 
        return Caml_option.some(Uint16Array.from(_getBufferPointData(/* tuple */[
                            accessorIndex,
                            Uint8Array.BYTES_PER_ELEMENT,
                            dataViewArr,
                            wd
                          ], (function (prim, prim$1, prim$2) {
                              return new Uint8Array(prim, prim$1, prim$2);
                            }))));
    case 2 : 
        return undefined;
    case 3 : 
        return Caml_option.some(_getBufferPointData(/* tuple */[
                        accessorIndex,
                        Uint16Array.BYTES_PER_ELEMENT,
                        dataViewArr,
                        wd
                      ], (function (prim, prim$1, prim$2) {
                          return new Uint16Array(prim, prim$1, prim$2);
                        })));
    default:
      return undefined;
  }
}

function getBufferIndex32Data(componentType, accessorIndex, dataViewArr, wd) {
  if (componentType !== 4) {
    return undefined;
  } else {
    return Caml_option.some(_getBufferPointData(/* tuple */[
                    accessorIndex,
                    Uint32Array.BYTES_PER_ELEMENT,
                    dataViewArr,
                    wd
                  ], (function (prim, prim$1, prim$2) {
                      return new Uint32Array(prim, prim$1, prim$2);
                    })));
  }
}

function _makeEmptyAttributePoints(param) {
  return new Float32Array(/* array */[]);
}

function _setIndexData(geometry, param, state) {
  var index = param[2];
  var dataViewArr = param[1];
  var wd = param[0];
  var componentType = getAccessorComponentType(wd, index);
  var match = getBufferIndex16Data(componentType, index, dataViewArr, wd);
  if (match !== undefined) {
    return IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array(geometry, Caml_option.valFromOption(match), state);
  } else {
    var match$1 = getBufferIndex32Data(componentType, index, dataViewArr, wd);
    if (match$1 !== undefined) {
      return IndicesGeometryMainService$Wonderjs.setIndicesByUint32Array(geometry, Caml_option.valFromOption(match$1), state);
    } else {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_batchSetGeometryData", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
    }
  }
}

function setGeometryData(geometry, wd, dataViewArr, param, state) {
  var texCoord = param[/* texCoord */3];
  var normal = param[/* normal */2];
  var state$1 = VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray(geometry, getBufferAttributeData(param[/* position */1], dataViewArr, wd), state);
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(normal);
  var normals = match ? new Float32Array(/* array */[]) : getBufferAttributeData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(normal), dataViewArr, wd);
  var state$2 = NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray(geometry, normals, state$1);
  var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(texCoord);
  var texCoords = match$1 ? new Float32Array(/* array */[]) : getBufferAttributeData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(texCoord), dataViewArr, wd);
  var state$3 = TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray(geometry, texCoords, state$2);
  return _setIndexData(geometry, /* tuple */[
              wd,
              dataViewArr,
              param[/* index */4]
            ], state$3);
}

export {
  _getBufferData ,
  _getBufferPointData ,
  getBufferAttributeData ,
  getAccessorComponentType ,
  getBufferIndex16Data ,
  getBufferIndex32Data ,
  _makeEmptyAttributePoints ,
  _setIndexData ,
  setGeometryData ,
  
}
/* Log-WonderLog Not a pure module */
