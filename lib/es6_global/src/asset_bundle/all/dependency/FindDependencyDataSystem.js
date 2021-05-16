

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../../../asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../utils/GenerateABUtils.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ImmutableHashMapService$Wonderjs from "../../../service/atom/ImmutableHashMapService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function _buildImageNameMap(rabRelativePath, param, allRabDepdentImageNameMap) {
  var __x = ArrayService$WonderCommonlib.reduceOneParam((function (nameMap, param) {
          return ImmutableHashMapService$WonderCommonlib.set(param[/* name */0], true, nameMap);
        }), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0), param[/* images */2]);
  return ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, __x, allRabDepdentImageNameMap);
}

function _buildGeometryNameMap(rabRelativePath, param, allRabGeometryNameMap) {
  var __x = ArrayService$WonderCommonlib.reduceOneParam((function (nameMap, param) {
          return ImmutableHashMapService$WonderCommonlib.set(param[/* name */0], true, nameMap);
        }), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0), param[/* geometrys */5]);
  return ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, __x, allRabGeometryNameMap);
}

function buildImageAndGeometryNameMap(param, param$1) {
  var rab = param[1];
  var rabRelativePath = param[0];
  var dataView = DataViewCommon$Wonderjs.create(rab);
  var match = GenerateABUtils$Wonderjs.readHeader(dataView);
  var jsonStr = GenerateABUtils$Wonderjs.getJsonStr(match[1], rab);
  var resourceAssetBundleContent = JSON.parse(jsonStr);
  return /* tuple */[
          _buildImageNameMap(rabRelativePath, resourceAssetBundleContent, param$1[0]),
          _buildGeometryNameMap(rabRelativePath, resourceAssetBundleContent, param$1[1])
        ];
}

var RAB = /* module */[
  /* _buildImageNameMap */_buildImageNameMap,
  /* _buildGeometryNameMap */_buildGeometryNameMap,
  /* buildImageAndGeometryNameMap */buildImageAndGeometryNameMap
];

function buildImageAndGeometryNameMap$1(rabDataArr) {
  return Contract$WonderLog.ensureCheck((function (param) {
                var allRabGeometryNameMap = param[1];
                var allRabImageNameMap = param[0];
                var _judge = function (allDependentNameMap) {
                  return ArrayService$WonderCommonlib.forEach((function (nameMap) {
                                return Contract$WonderLog.assertFalse(ArrayService$Wonderjs.hasDuplicateItems((function (item) {
                                                  return item;
                                                }), ImmutableHashMapService$Wonderjs.getValidKeys(nameMap)));
                              }), ImmutableHashMapService$WonderCommonlib.getValidValues(allDependentNameMap));
                };
                Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("one dependent rab->image has no duplicate name", "has"), (function (param) {
                        return _judge(allRabImageNameMap);
                      }));
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("one dependent rab->geometry has no duplicate name", "has"), (function (param) {
                              return _judge(allRabGeometryNameMap);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), ArrayService$WonderCommonlib.reduceOneParam((function (param, rabData) {
                    return buildImageAndGeometryNameMap(rabData, /* tuple */[
                                param[0],
                                param[1]
                              ]);
                  }), /* tuple */[
                  ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
                  ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0)
                ], rabDataArr));
}

function _findByDepthSearch(abRelativePath, dependencyRelation, allDependentAbRelativePathArr) {
  var match = ImmutableHashMapService$WonderCommonlib.get(abRelativePath, dependencyRelation);
  if (match !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (allDependentAbRelativePathArr, abRelativePath) {
                  return _findByDepthSearch(abRelativePath, dependencyRelation, ArrayService$Wonderjs.push(abRelativePath, allDependentAbRelativePathArr));
                }), allDependentAbRelativePathArr, match);
  } else {
    return allDependentAbRelativePathArr;
  }
}

function findAllDependencyRABRelativePathByDepthSearch(abRelativePath, dependencyRelation) {
  return ArrayService$Wonderjs.removeDuplicateItems((function (item) {
                return item;
              }), _findByDepthSearch(abRelativePath, dependencyRelation, ArrayService$WonderCommonlib.createEmpty(/* () */0)).reverse());
}

function _isFindByBreadthSearchEnd(thisLayerAddedDependentAbRelativePathArr, thisLayerRemainedDependentAbRelativePathArr) {
  if (thisLayerAddedDependentAbRelativePathArr.length === 0) {
    return thisLayerRemainedDependentAbRelativePathArr.length === 0;
  } else {
    return false;
  }
}

function _addRemainedDependentAbRelativePathToThisLayer(dependencyRelation, param) {
  var thisLayerAddedDependentAbRelativePathArr = param[2];
  var thisLayerRemainedDependentAbRelativePathArr = param[1];
  var dependentAbRelativePath = ArrayService$Wonderjs.unsafeGetFirst(thisLayerRemainedDependentAbRelativePathArr);
  var thisLayerRemainedDependentAbRelativePathArr$1 = thisLayerRemainedDependentAbRelativePathArr.slice(1);
  var match = ImmutableHashMapService$WonderCommonlib.get(dependentAbRelativePath, dependencyRelation);
  var thisLayerAddedDependentAbRelativePathArr$1 = match !== undefined ? ArrayService$Wonderjs.fastConcat(thisLayerAddedDependentAbRelativePathArr, match) : thisLayerAddedDependentAbRelativePathArr;
  return /* tuple */[
          param[0],
          thisLayerRemainedDependentAbRelativePathArr$1,
          thisLayerAddedDependentAbRelativePathArr$1
        ];
}

function _addThisLayerAbRelativePathArrToAll(dependencyRelation, param) {
  var thisLayerAddedDependentAbRelativePathArr = param[2];
  var allDependentAbRelativePathArr = ArrayService$Wonderjs.push(thisLayerAddedDependentAbRelativePathArr, param[0]);
  var thisLayerRemainedDependentAbRelativePathArr = thisLayerAddedDependentAbRelativePathArr.slice();
  var thisLayerAddedDependentAbRelativePathArr$1 = ArrayService$WonderCommonlib.createEmpty(/* () */0);
  return /* tuple */[
          allDependentAbRelativePathArr,
          thisLayerRemainedDependentAbRelativePathArr,
          thisLayerAddedDependentAbRelativePathArr$1
        ];
}

function _findByBreadthSearch(dependencyRelation, _allDependentAbRelativePathArr, _thisLayerAddedDependentAbRelativePathArr, _thisLayerRemainedDependentAbRelativePathArr) {
  while(true) {
    var thisLayerRemainedDependentAbRelativePathArr = _thisLayerRemainedDependentAbRelativePathArr;
    var thisLayerAddedDependentAbRelativePathArr = _thisLayerAddedDependentAbRelativePathArr;
    var allDependentAbRelativePathArr = _allDependentAbRelativePathArr;
    var match = _isFindByBreadthSearchEnd(thisLayerAddedDependentAbRelativePathArr, thisLayerRemainedDependentAbRelativePathArr);
    if (match) {
      return allDependentAbRelativePathArr;
    } else {
      var match$1 = thisLayerRemainedDependentAbRelativePathArr.length > 0;
      var match$2 = match$1 ? _addRemainedDependentAbRelativePathToThisLayer(dependencyRelation, /* tuple */[
              allDependentAbRelativePathArr,
              thisLayerRemainedDependentAbRelativePathArr,
              thisLayerAddedDependentAbRelativePathArr
            ]) : _addThisLayerAbRelativePathArrToAll(dependencyRelation, /* tuple */[
              allDependentAbRelativePathArr,
              thisLayerRemainedDependentAbRelativePathArr,
              thisLayerAddedDependentAbRelativePathArr
            ]);
      _thisLayerRemainedDependentAbRelativePathArr = match$2[1];
      _thisLayerAddedDependentAbRelativePathArr = match$2[2];
      _allDependentAbRelativePathArr = match$2[0];
      continue ;
    }
  };
}

function _isInclude(dependentAbRelativePath, allRemainedDependentAbRelativePath) {
  return allRemainedDependentAbRelativePath.filter((function (remainedDependentAbRelativePathArr) {
                return remainedDependentAbRelativePathArr.includes(dependentAbRelativePath);
              })).length > 0;
}

function findAllDependencyRABRelativePathByBreadthSearch(abRelativePath, dependencyRelation) {
  var match = ImmutableHashMapService$WonderCommonlib.get(abRelativePath, dependencyRelation);
  if (match !== undefined) {
    var dependentAbRelativePathArr = match;
    var allDependencyRABRelativePath = _findByBreadthSearch(dependencyRelation, ArrayService$WonderCommonlib.createEmpty(/* () */0), ArrayService$WonderCommonlib.createEmpty(/* () */0), dependentAbRelativePathArr).map((function (dependentAbRelativePathArr) {
            return ArrayService$Wonderjs.removeDuplicateItems((function (item) {
                          return item;
                        }), dependentAbRelativePathArr);
          }));
    return ArrayService$Wonderjs.push(dependentAbRelativePathArr, allDependencyRABRelativePath.map((function (dependentAbRelativePathArr, index) {
                        var allRemainedDependentAbRelativePath = allDependencyRABRelativePath.slice(index + 1 | 0);
                        return dependentAbRelativePathArr.filter((function (dependentAbRelativePath) {
                                      return !_isInclude(dependentAbRelativePath, allRemainedDependentAbRelativePath);
                                    }));
                      })).reverse());
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

export {
  RAB ,
  buildImageAndGeometryNameMap$1 as buildImageAndGeometryNameMap,
  _findByDepthSearch ,
  findAllDependencyRABRelativePathByDepthSearch ,
  _isFindByBreadthSearchEnd ,
  _addRemainedDependentAbRelativePathToThisLayer ,
  _addThisLayerAbRelativePathArrToAll ,
  _findByBreadthSearch ,
  _isInclude ,
  findAllDependencyRABRelativePathByBreadthSearch ,
  
}
/* Log-WonderLog Not a pure module */
