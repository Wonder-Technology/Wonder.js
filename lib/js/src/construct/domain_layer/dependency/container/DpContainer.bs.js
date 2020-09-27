'use strict';

var OptionSt$Wonderjs = require("../../library/structure/OptionSt.bs.js");

var dpContainer = {
  otherConfig: undefined,
  poConfig: undefined,
  repo: undefined,
  time: undefined,
  webgpuCore: undefined,
  webgpuRayTracing: undefined,
  network: undefined
};

function unsafeGetOtherConfigDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.otherConfig);
}

function unsafeGetPOConfigDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.poConfig);
}

function setOtherConfigDp(dp) {
  dpContainer.otherConfig = dp;
  
}

function setPOConfigDp(dp) {
  dpContainer.poConfig = dp;
  
}

function _unsafeGetRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo);
}

function unsafeGetSceneRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).sceneRepo;
}

function unsafeGetGameObjectRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).gameObjectRepo;
}

function unsafeGetTransformRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).transformRepo;
}

function unsafeGetPBRMaterialRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).pbrMaterialRepo;
}

function unsafeGetGeometryRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).geometryRepo;
}

function unsafeGetDirectionLightRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).directionLightRepo;
}

function unsafeGetBasicCameraViewRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).basicCameraViewRepo;
}

function unsafeGetPerspectiveCameraProjectionRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).perspectiveCameraProjectionRepo;
}

function unsafeGetGlobalTempRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).globalTempRepo;
}

function unsafeGetPipelineRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).pipelineRepo;
}

function unsafeGetTimeRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).timeRepo;
}

function unsafeGetImageRepoDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.repo).imageRepo;
}

function setRepoDp(dp) {
  dpContainer.repo = dp;
  
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

function unsafeGetNetworkDp(param) {
  return OptionSt$Wonderjs.unsafeGet(dpContainer.network);
}

function setNetworkDp(dp) {
  dpContainer.network = dp;
  
}

exports.dpContainer = dpContainer;
exports.unsafeGetOtherConfigDp = unsafeGetOtherConfigDp;
exports.unsafeGetPOConfigDp = unsafeGetPOConfigDp;
exports.setOtherConfigDp = setOtherConfigDp;
exports.setPOConfigDp = setPOConfigDp;
exports._unsafeGetRepoDp = _unsafeGetRepoDp;
exports.unsafeGetSceneRepoDp = unsafeGetSceneRepoDp;
exports.unsafeGetGameObjectRepoDp = unsafeGetGameObjectRepoDp;
exports.unsafeGetTransformRepoDp = unsafeGetTransformRepoDp;
exports.unsafeGetPBRMaterialRepoDp = unsafeGetPBRMaterialRepoDp;
exports.unsafeGetGeometryRepoDp = unsafeGetGeometryRepoDp;
exports.unsafeGetDirectionLightRepoDp = unsafeGetDirectionLightRepoDp;
exports.unsafeGetBasicCameraViewRepoDp = unsafeGetBasicCameraViewRepoDp;
exports.unsafeGetPerspectiveCameraProjectionRepoDp = unsafeGetPerspectiveCameraProjectionRepoDp;
exports.unsafeGetGlobalTempRepoDp = unsafeGetGlobalTempRepoDp;
exports.unsafeGetPipelineRepoDp = unsafeGetPipelineRepoDp;
exports.unsafeGetTimeRepoDp = unsafeGetTimeRepoDp;
exports.unsafeGetImageRepoDp = unsafeGetImageRepoDp;
exports.setRepoDp = setRepoDp;
exports.unsafeGetTimeDp = unsafeGetTimeDp;
exports.setTimeDp = setTimeDp;
exports.unsafeGetWebGPUCoreDp = unsafeGetWebGPUCoreDp;
exports.setWebGPUCoreDp = setWebGPUCoreDp;
exports.unsafeGetWebGPURayTracingDp = unsafeGetWebGPURayTracingDp;
exports.setWebGPURayTracingDp = setWebGPURayTracingDp;
exports.unsafeGetNetworkDp = unsafeGetNetworkDp;
exports.setNetworkDp = setNetworkDp;
/* No side effect */
