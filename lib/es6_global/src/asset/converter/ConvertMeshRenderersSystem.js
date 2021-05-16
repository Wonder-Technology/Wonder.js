

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as Caml_builtin_exceptions from "../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ConvertMeshUtils$Wonderjs from "./utils/ConvertMeshUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _convertByMesh(meshes, geometryGameObjectIndices, geometryIndices) {
  return geometryGameObjectIndices.map((function (param, index) {
                var geometryIndex = geometryIndices[index];
                var match = meshes[geometryIndex];
                var primitive = ConvertCommon$Wonderjs.getPrimitiveData(match[/* primitives */0]);
                var mode = primitive[/* mode */3];
                var match$1 = ConvertMeshUtils$Wonderjs.doesPrimitiveHasMaterial(primitive);
                if (match$1) {
                  var tmp;
                  if (mode !== undefined) {
                    var match$2 = mode;
                    if (match$2 > 6 || match$2 < 0) {
                      throw [
                            Caml_builtin_exceptions.match_failure,
                            /* tuple */[
                              "ConvertMeshRenderersSystem.re",
                              16,
                              15
                            ]
                          ];
                    } else {
                      tmp = match$2;
                    }
                  } else {
                    tmp = /* Triangles */4;
                  }
                  return /* record */[
                          /* drawMode */tmp,
                          /* isRender */true
                        ];
                }
                
              }));
}

function convertToMeshRenderers(param, param$1) {
  var extras = param$1[/* extras */15];
  var meshes = param$1[/* meshes */11];
  var geometryIndices = param[/* componentIndices */1];
  var geometryGameObjectIndices = param[/* gameObjectIndices */0];
  if (extras !== undefined) {
    var meshRenderers = extras[/* meshRenderers */4];
    if (Js_option.isSome(meshRenderers) && OptionService$Wonderjs.unsafeGet(meshRenderers).length > 0) {
      return ArrayService$WonderCommonlib.reduceOneParami((function (arr, param, index) {
                    return ArrayService$Wonderjs.push(/* record */[
                                /* drawMode */param[/* drawMode */0],
                                /* isRender */param[/* isRender */1]
                              ], arr);
                  }), /* array */[], OptionService$Wonderjs.unsafeGet(meshRenderers));
    } else {
      return _convertByMesh(meshes, geometryGameObjectIndices, geometryIndices);
    }
  } else {
    return _convertByMesh(meshes, geometryGameObjectIndices, geometryIndices);
  }
}

export {
  _convertByMesh ,
  convertToMeshRenderers ,
  
}
/* ArrayService-Wonderjs Not a pure module */
