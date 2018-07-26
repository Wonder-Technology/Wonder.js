

import * as List from "../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Pervasives from "../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as MostUtils$Wonderjs from "../../../../../asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as JobConfigService$Wonderjs from "../../../../primitive/JobConfigService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function getExecutableJob(jobs, jobItemName) {
  return JobConfigService$Wonderjs.unsafeFindFirst(jobs, jobItemName, (function (param) {
                return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], jobItemName);
              }));
}

function _addHandleFuncToList(action, handleFunc, handleList) {
  if (action) {
    return Pervasives.$at(handleList, /* :: */[
                handleFunc,
                /* [] */0
              ]);
  } else {
    return /* :: */[
            handleFunc,
            handleList
          ];
  }
}

function _findAllCustomJobHandles(_subJobName, workerCustomMainLoopTargetJobMap, _handleList) {
  while(true) {
    var handleList = _handleList;
    var subJobName = _subJobName;
    var match = HashMapService$WonderCommonlib.get(subJobName, workerCustomMainLoopTargetJobMap);
    if (match !== undefined) {
      var match$1 = match;
      _handleList = _addHandleFuncToList(match$1[1], match$1[2], handleList);
      _subJobName = match$1[0];
      continue ;
    } else {
      return handleList;
    }
  };
}

function _buildCustomStreamArr(customJobHandleList, stateData) {
  return List.fold_left((function (streamArr, customHandle) {
                return ArrayService$Wonderjs.push(MostUtils$Wonderjs.callFunc((function () {
                                  Curry._1(customHandle, stateData);
                                  return undefined;
                                })), streamArr);
              }), /* array */[], customJobHandleList);
}

function addCustomJobHandleToStreamArr(subJobName, workerCustomMainTargetJobMap, stateData, streamArr) {
  var list = _findAllCustomJobHandles(subJobName, workerCustomMainTargetJobMap, /* [] */0);
  if (List.length(list) === 0) {
    return streamArr;
  } else {
    return streamArr.concat(_buildCustomStreamArr(list, stateData));
  }
}

export {
  getExecutableJob ,
  _addHandleFuncToList ,
  _findAllCustomJobHandles ,
  _buildCustomStreamArr ,
  addCustomJobHandleToStreamArr ,
  
}
/* MostUtils-Wonderjs Not a pure module */
