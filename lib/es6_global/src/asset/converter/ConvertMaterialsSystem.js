

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _buildDefaultMaterialName(materialIndex) {
  return ConvertCommon$Wonderjs.buildDefaultName("material", materialIndex);
}

function convertToLightMaterials(param) {
  var materials = param[/* materials */12];
  if (materials !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParami((function (arr, param, index) {
                  var pbrMetallicRoughness = param[/* pbrMetallicRoughness */0];
                  if (pbrMetallicRoughness !== undefined) {
                    var baseColorFactor = pbrMetallicRoughness[/* baseColorFactor */0];
                    var name = param[/* name */1];
                    var tmp;
                    if (baseColorFactor !== undefined) {
                      var baseColorFactor$1 = baseColorFactor;
                      tmp = /* array */[
                        Caml_array.caml_array_get(baseColorFactor$1, 0),
                        Caml_array.caml_array_get(baseColorFactor$1, 1),
                        Caml_array.caml_array_get(baseColorFactor$1, 2)
                      ];
                    } else {
                      tmp = /* array */[
                        1,
                        1,
                        1
                      ];
                    }
                    return ArrayService$Wonderjs.push(/* record */[
                                /* diffuseColor */tmp,
                                /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultName("material", index)
                              ], arr);
                  } else {
                    return arr;
                  }
                }), /* array */[], materials);
  } else {
    return /* array */[];
  }
}

export {
  _buildDefaultMaterialName ,
  convertToLightMaterials ,
  
}
/* ArrayService-Wonderjs Not a pure module */
