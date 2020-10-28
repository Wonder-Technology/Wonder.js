'use strict';

var OptionSt$Wonderjs = require("../../library/structure/OptionSt.bs.js");

var dpContainer = {
  config: undefined,
  sceneGraphRepo: undefined,
  timeRepo: undefined,
  pipelineRepo: undefined,
  time: undefined
};

function unsafeGetConfigDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.config);
}

function setConfigDp(dp) {
  dpContainer.config = dp;
  
}

function _unsafeGetSceneGraphRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo);
}

function unsafeGetGameObjectRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).gameObjectRepo;
}

function unsafeGetPipelineRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.pipelineRepo);
}

function setPipelineRepoDp(dp) {
  dpContainer.pipelineRepo = dp;
  
}

function setSceneGraphRepoDp(dp) {
  dpContainer.sceneGraphRepo = dp;
  
}

function unsafeGetTimeRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.timeRepo);
}

function setTimeRepoDp(dp) {
  dpContainer.timeRepo = dp;
  
}

function unsafeGetTimeDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.time);
}

function setTimeDp(dp) {
  dpContainer.time = dp;
  
}

exports.dpContainer = dpContainer;
exports.unsafeGetConfigDp = unsafeGetConfigDp;
exports.setConfigDp = setConfigDp;
exports._unsafeGetSceneGraphRepoDp = _unsafeGetSceneGraphRepoDp;
exports.unsafeGetGameObjectRepoDp = unsafeGetGameObjectRepoDp;
exports.unsafeGetPipelineRepoDp = unsafeGetPipelineRepoDp;
exports.setPipelineRepoDp = setPipelineRepoDp;
exports.setSceneGraphRepoDp = setSceneGraphRepoDp;
exports.unsafeGetTimeRepoDp = unsafeGetTimeRepoDp;
exports.setTimeRepoDp = setTimeRepoDp;
exports.unsafeGetTimeDp = unsafeGetTimeDp;
exports.setTimeDp = setTimeDp;
/* No side effect */
