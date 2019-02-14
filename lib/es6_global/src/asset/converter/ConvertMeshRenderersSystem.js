

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as Caml_builtin_exceptions from "../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _convertByMesh(meshes, geometryGameObjectIndices, geometryIndices) {
  return geometryGameObjectIndices.map((function (_, index) {
                var geometryIndex = geometryIndices[index];
                var match = meshes[geometryIndex];
                var match$1 = ConvertCommon$Wonderjs.getPrimitiveData(match[/* primitives */0]);
                var mode = match$1[/* mode */3];
                var tmp;
                if (mode !== undefined) {
                  var match$2 = mode;
                  if (match$2 > 6 || match$2 < 0) {
                    throw [
                          Caml_builtin_exceptions.match_failure,
                          /* tuple */[
                            "ConvertMeshRenderersSystem.re",
                            17,
                            13
                          ]
                        ];
                  } else {
                    tmp = match$2;
                  }
                } else {
                  tmp = /* Triangles */4;
                }
                return /* record */[/* drawMode */tmp];
              }));
}

function convertToMeshRenderers(param, param$1) {
  var extras = param$1[/* extras */15];
  var meshes = param$1[/* meshes */11];
  var geometryIndices = param[/* componentIndices */1];
  var geometryGameObjectIndices = param[/* gameObjectIndices */0];
  if (extras !== undefined) {
    var meshRenderers = extras[/* meshRenderers */3];
    if (meshRenderers !== undefined) {
      var meshRenderers$1 = meshRenderers;
      if (meshRenderers$1.length > 0) {
        return ArrayService$WonderCommonlib.reduceOneParami((function (arr, param, _) {
                      return ArrayService$Wonderjs.push(/* record */[/* drawMode */param[/* drawMode */0]], arr);
                    }), /* array */[], meshRenderers$1);
      } else {
        return _convertByMesh(meshes, geometryGameObjectIndices, geometryIndices);
      }
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
