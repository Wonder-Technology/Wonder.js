

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as MostUtils$Wonderjs from "../../../../../asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as JobConfigService$Wonderjs from "../../../../primitive/JobConfigService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function getExecutableJob(jobs, jobItemName) {
  return JobConfigService$Wonderjs.unsafeFindFirst(jobs, jobItemName, (function (param) {
                return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], jobItemName);
              }));
}

function _addHandleFuncStream(action, handleFuncStream, handleFuncStreamArr) {
  if (action) {
    return ArrayService$Wonderjs.push(handleFuncStream, handleFuncStreamArr);
  } else {
    handleFuncStreamArr.unshift(handleFuncStream);
    return handleFuncStreamArr;
  }
}

function _buildStream(stateData, customHandle) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                Curry._1(customHandle, stateData);
                return undefined;
              }));
}

function _addSourceJobAllCustomJobHandleStreams(_subJobName, workerCustomMainLoopTargetJobMap, stateData, _handleFuncStreamArr) {
  while(true) {
    var handleFuncStreamArr = _handleFuncStreamArr;
    var subJobName = _subJobName;
    var match = MutableHashMapService$WonderCommonlib.get(subJobName, workerCustomMainLoopTargetJobMap);
    if (match !== undefined) {
      var match$1 = match;
      var handleFunc = match$1[2];
      _handleFuncStreamArr = _addHandleFuncStream(match$1[1], MostUtils$Wonderjs.callFunc((function(handleFunc){
              return function (param) {
                Curry._1(handleFunc, stateData);
                return undefined;
              }
              }(handleFunc))), handleFuncStreamArr);
      _subJobName = match$1[0];
      continue ;
    } else {
      return handleFuncStreamArr;
    }
  };
}

function addCustomJobHandleToStreamArr(subJobName, handleFuncStreamArr, workerCustomMainTargetJobMap, stateData, streamArr) {
  return ArrayService$Wonderjs.fastConcat(streamArr, _addSourceJobAllCustomJobHandleStreams(subJobName, workerCustomMainTargetJobMap, stateData, handleFuncStreamArr));
}

export {
  getExecutableJob ,
  _addHandleFuncStream ,
  _buildStream ,
  _addSourceJobAllCustomJobHandleStreams ,
  addCustomJobHandleToStreamArr ,
  
}
/* MostUtils-Wonderjs Not a pure module */
