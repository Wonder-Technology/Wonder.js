

import * as Most from "most";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as GenerateWABSystem$Wonderjs from "../wab/generate/GenerateWABSystem.js";
import * as ManifestDataSystem$Wonderjs from "../manifest/ManifestDataSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FindDependencyDataSystem$Wonderjs from "../dependency/FindDependencyDataSystem.js";
import * as RemoveDependencyDataSystem$Wonderjs from "../dependency/RemoveDependencyDataSystem.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function buildDependencyRelation(dependencyRelationArrArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (relationMap, dependencyRelationArr) {
                return ImmutableHashMapService$WonderCommonlib.set(ArrayService$Wonderjs.unsafeGetFirst(dependencyRelationArr), dependencyRelationArr.slice(1), relationMap);
              }), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0), dependencyRelationArrArr);
}

function generate(dependencyRelation, param) {
  var rabDataArr = param[1];
  return Most.map((function (param) {
                return /* tuple */[
                        GenerateWABSystem$Wonderjs.generate(dependencyRelation, param[0]),
                        param[1],
                        param[2]
                      ];
              }), ManifestDataSystem$Wonderjs.addManifestData(dependencyRelation, RemoveDependencyDataSystem$Wonderjs.removeDuplicateBufferData(dependencyRelation, FindDependencyDataSystem$Wonderjs.buildImageAndGeometryNameMap(rabDataArr), /* tuple */[
                      param[0],
                      rabDataArr
                    ])));
}

export {
  buildDependencyRelation ,
  generate ,
  
}
/* most Not a pure module */
