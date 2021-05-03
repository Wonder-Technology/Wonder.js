

import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _setMapMaterialIndices(materialMap, materialIndex, param) {
  var diffuseMapIndices = param[1];
  var materialIndices = param[0];
  if (materialMap !== undefined) {
    return /* tuple */[
            ArrayService$Wonderjs.push(materialIndex, materialIndices),
            ArrayService$Wonderjs.push(materialMap[/* index */0], diffuseMapIndices)
          ];
  } else {
    return /* tuple */[
            materialIndices,
            diffuseMapIndices
          ];
  }
}

function _convertMetallicRoughness(pbrMetallicRoughness, param, index) {
  var diffuseMapIndices = param[1];
  var materialIndices = param[0];
  if (pbrMetallicRoughness !== undefined) {
    return _setMapMaterialIndices(pbrMetallicRoughness[/* baseColorTexture */1], index, /* tuple */[
                materialIndices,
                diffuseMapIndices
              ]);
  } else {
    return /* tuple */[
            materialIndices,
            diffuseMapIndices
          ];
  }
}

function _convertSpecularGlossiness(pbrSpecularGlossiness, param, index) {
  return _setMapMaterialIndices(pbrSpecularGlossiness[/* diffuseTexture */1], index, /* tuple */[
              param[0],
              param[1]
            ]);
}

function convertToMaterialIndices(param) {
  var materials = param[/* materials */12];
  if (materials !== undefined) {
    var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
            var extensions = param$1[/* extensions */2];
            var pbrMetallicRoughness = param$1[/* pbrMetallicRoughness */0];
            var diffuseMapIndices = param[1];
            var materialIndices = param[0];
            if (extensions !== undefined) {
              var khr_materials_pbrSpecularGlossiness = extensions[/* khr_materials_pbrSpecularGlossiness */0];
              if (khr_materials_pbrSpecularGlossiness !== undefined) {
                return _convertSpecularGlossiness(khr_materials_pbrSpecularGlossiness, /* tuple */[
                            materialIndices,
                            diffuseMapIndices
                          ], index);
              } else {
                return _convertMetallicRoughness(pbrMetallicRoughness, /* tuple */[
                            materialIndices,
                            diffuseMapIndices
                          ], index);
              }
            } else {
              return _convertMetallicRoughness(pbrMetallicRoughness, /* tuple */[
                          materialIndices,
                          diffuseMapIndices
                        ], index);
            }
          }), /* tuple */[
          /* array */[],
          /* array */[]
        ], materials);
    return Contract$WonderLog.ensureCheck((function (param) {
                  var match = param[/* diffuseMapMaterialIndices */0];
                  var mapIndices = match[/* mapIndices */1];
                  var materialIndices = match[/* materialIndices */0];
                  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("materialIndices\' count === mapIndices\' count", "not"), (function (param) {
                                return Contract$WonderLog.Operators[/* = */0](materialIndices.length, mapIndices.length);
                              }));
                }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* record */[/* diffuseMapMaterialIndices : record */[
                  /* materialIndices */match[0],
                  /* mapIndices */match[1]
                ]]);
  } else {
    return /* record */[/* diffuseMapMaterialIndices : record */[
              /* materialIndices : array */[],
              /* mapIndices : array */[]
            ]];
  }
}

export {
  _setMapMaterialIndices ,
  _convertMetallicRoughness ,
  _convertSpecularGlossiness ,
  convertToMaterialIndices ,
  
}
/* Log-WonderLog Not a pure module */
