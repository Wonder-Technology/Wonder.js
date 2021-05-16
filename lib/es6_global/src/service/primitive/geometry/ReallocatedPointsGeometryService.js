

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as TypeArrayService$Wonderjs from "../buffer/TypeArrayService.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";

function getInfo(infoIndex, infos) {
  return Contract$WonderLog.ensureCheck((function (param) {
                var endIndex = param[1];
                var startIndex = param[0];
                Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has info data", "not"), (function (param) {
                        Contract$WonderLog.assertNullableExist(startIndex);
                        return Contract$WonderLog.assertNullableExist(endIndex);
                      }));
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("endIndex >= startIndex", "is " + (String(endIndex) + "")), (function (param) {
                              return Contract$WonderLog.Operators[/* >= */7](endIndex, startIndex);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* tuple */[
              TypeArrayService$Wonderjs.getUint32_1(infoIndex, infos),
              TypeArrayService$Wonderjs.getUint32_1(infoIndex + 1 | 0, infos)
            ]);
}

function setInfo(infoIndex, startIndex, endIndex, infos) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("startIndex >= 0", "is " + (String(startIndex) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* >= */7](startIndex, 0);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("endIndex >= startIndex", "is " + (String(endIndex) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](endIndex, startIndex);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return TypeArrayService$Wonderjs.setUint32_1(infoIndex + 1 | 0, endIndex, TypeArrayService$Wonderjs.setUint32_1(infoIndex, startIndex, infos));
}

function hasPointData(infoIndex, infos) {
  var match = getInfo(infoIndex, infos);
  return match[1] > match[0];
}

function getFloat32PointData(infoIndex, points, infos) {
  var match = getInfo(infoIndex, infos);
  return TypeArrayService$Wonderjs.getFloat32Array(points, match[0], match[1]);
}

function _setPointData(param, fillTypeArrayFunc) {
  var offset = param[2];
  var newOffset = offset + param[3] | 0;
  setInfo(param[0], offset, newOffset, param[1]);
  Curry._1(fillTypeArrayFunc, offset);
  return newOffset;
}

var setFloat32PointData = _setPointData;

function getUint16PointData(infoIndex, points, infos) {
  var match = getInfo(infoIndex, infos);
  return TypeArrayService$Wonderjs.getUint16Array(points, match[0], match[1]);
}

var setUint16PointData = _setPointData;

function getUint32PointData(infoIndex, points, infos) {
  var match = getInfo(infoIndex, infos);
  return TypeArrayService$Wonderjs.getUint32Array(points, match[0], match[1]);
}

var setUint32PointData = _setPointData;

export {
  getInfo ,
  setInfo ,
  hasPointData ,
  getFloat32PointData ,
  _setPointData ,
  setFloat32PointData ,
  getUint16PointData ,
  setUint16PointData ,
  getUint32PointData ,
  setUint32PointData ,
  
}
/* Log-WonderLog Not a pure module */
