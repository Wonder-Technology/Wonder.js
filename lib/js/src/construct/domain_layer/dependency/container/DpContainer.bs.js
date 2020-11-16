'use strict';

var OptionSt$Wonderjs = require("../../library/structure/OptionSt.bs.js");

var dpContainer = {
  config: undefined,
  sceneGraphRepo: undefined,
  imageRepo: undefined,
  timeRepo: undefined,
  pipelineRepo: undefined,
  time: undefined,
  webgpuCore: undefined,
  webgpuRayTracing: undefined
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

function unsafeGetSceneRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).sceneRepo;
}

function unsafeGetGameObjectRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).gameObjectRepo;
}

function unsafeGetTransformRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).transformRepo;
}

function unsafeGetBSDFMaterialRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).bsdfMaterialRepo;
}

function unsafeGetGeometryRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).geometryRepo;
}

function unsafeGetDirectionLightRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).directionLightRepo;
}

function unsafeGetBasicCameraViewRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).basicCameraViewRepo;
}

function unsafeGetPerspectiveCameraProjectionRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.sceneGraphRepo).perspectiveCameraProjectionRepo;
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

function unsafeGetWebGPUCoreDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.webgpuCore);
}

function setWebGPUCoreDp(dp) {
  dpContainer.webgpuCore = dp;
  
}

function unsafeGetWebGPURayTracingDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.webgpuRayTracing);
}

function setWebGPURayTracingDp(dp) {
  dpContainer.webgpuRayTracing = dp;
  
}

function unsafeGetImageRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.imageRepo);
}

function setImageRepoDp(dp) {
  dpContainer.imageRepo = dp;
  
}

exports.dpContainer = dpContainer;
exports.unsafeGetConfigDp = unsafeGetConfigDp;
exports.setConfigDp = setConfigDp;
exports._unsafeGetSceneGraphRepoDp = _unsafeGetSceneGraphRepoDp;
exports.unsafeGetSceneRepoDp = unsafeGetSceneRepoDp;
exports.unsafeGetGameObjectRepoDp = unsafeGetGameObjectRepoDp;
exports.unsafeGetTransformRepoDp = unsafeGetTransformRepoDp;
exports.unsafeGetBSDFMaterialRepoDp = unsafeGetBSDFMaterialRepoDp;
exports.unsafeGetGeometryRepoDp = unsafeGetGeometryRepoDp;
exports.unsafeGetDirectionLightRepoDp = unsafeGetDirectionLightRepoDp;
exports.unsafeGetBasicCameraViewRepoDp = unsafeGetBasicCameraViewRepoDp;
exports.unsafeGetPerspectiveCameraProjectionRepoDp = unsafeGetPerspectiveCameraProjectionRepoDp;
exports.unsafeGetPipelineRepoDp = unsafeGetPipelineRepoDp;
exports.setPipelineRepoDp = setPipelineRepoDp;
exports.setSceneGraphRepoDp = setSceneGraphRepoDp;
exports.unsafeGetTimeRepoDp = unsafeGetTimeRepoDp;
exports.setTimeRepoDp = setTimeRepoDp;
exports.unsafeGetTimeDp = unsafeGetTimeDp;
exports.setTimeDp = setTimeDp;
exports.unsafeGetWebGPUCoreDp = unsafeGetWebGPUCoreDp;
exports.setWebGPUCoreDp = setWebGPUCoreDp;
exports.unsafeGetWebGPURayTracingDp = unsafeGetWebGPURayTracingDp;
exports.setWebGPURayTracingDp = setWebGPURayTracingDp;
exports.unsafeGetImageRepoDp = unsafeGetImageRepoDp;
exports.setImageRepoDp = setImageRepoDp;
/* No side effect */
