

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var _buildDefaultName = ConvertCommon$Wonderjs.buildDefaultGameObjectName;

function _getNames(param) {
  var meshes = param[/* meshes */11];
  return ArrayService$WonderCommonlib.reduceOneParami((function (nameArr, node, index) {
                var name = node[/* name */0];
                if (name !== undefined) {
                  return ArrayService$Wonderjs.push(name, nameArr);
                } else {
                  var match = node[/* mesh */2];
                  if (match !== undefined) {
                    var match$1 = meshes[match];
                    var name$1 = match$1[/* name */1];
                    if (name$1 !== undefined) {
                      return ArrayService$Wonderjs.push(name$1, nameArr);
                    } else {
                      return ArrayService$Wonderjs.push(ConvertCommon$Wonderjs.buildDefaultGameObjectName(index), nameArr);
                    }
                  } else {
                    return ArrayService$Wonderjs.push(ConvertCommon$Wonderjs.buildDefaultGameObjectName(index), nameArr);
                  }
                }
              }), /* array */[], param[/* nodes */10]);
}

function _getIsRoots(param) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (isRootMap, param, index) {
                var extras = param[/* extras */8];
                if (extras !== undefined) {
                  var isRoot = extras[/* isRoot */5];
                  if (isRoot !== undefined) {
                    return MutableSparseMapService$WonderCommonlib.set(index, isRoot, isRootMap);
                  } else {
                    return isRootMap;
                  }
                } else {
                  return isRootMap;
                }
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), param[/* nodes */10]);
}

function convert(gltf) {
  return /* record */[
          /* count */ConvertCommon$Wonderjs.getCount(gltf[/* nodes */10]),
          /* names */_getNames(gltf),
          /* isRoots */_getIsRoots(gltf)
        ];
}

export {
  _buildDefaultName ,
  _getNames ,
  _getIsRoots ,
  convert ,
  
}
/* ArrayService-Wonderjs Not a pure module */
