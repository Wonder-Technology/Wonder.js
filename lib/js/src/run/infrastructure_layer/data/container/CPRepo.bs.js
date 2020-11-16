'use strict';

var CPContainerManager$Wonderjs = require("../CPContainerManager.bs.js");

function getPipeline(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pipeline;
}

function setPipeline(pipeline) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: pipeline,
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getTime(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).time;
}

function setTime(time) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getPicture(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).picture;
}

function setPicture(picture) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getWebGPU(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).webgpu;
}

function setWebGPU(webgpu) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: po.picture,
              webgpu: webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getCamera(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).camera;
}

function setCamera(camera) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getPass(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pass;
}

function setPass(pass) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getRayTracingPass(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pathTracingPass;
}

function setRayTracingPass(pathTracingPass) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: pathTracingPass,
              accumulationPass: po.accumulationPass
            });
}

function getAccumulationPass(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).accumulationPass;
}

function setAccumulationPass(accumulationPass) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: accumulationPass
            });
}

exports.getPipeline = getPipeline;
exports.setPipeline = setPipeline;
exports.getTime = getTime;
exports.setTime = setTime;
exports.getPicture = getPicture;
exports.setPicture = setPicture;
exports.getWebGPU = getWebGPU;
exports.setWebGPU = setWebGPU;
exports.getCamera = getCamera;
exports.setCamera = setCamera;
exports.getPass = getPass;
exports.setPass = setPass;
exports.getRayTracingPass = getRayTracingPass;
exports.setRayTracingPass = setRayTracingPass;
exports.getAccumulationPass = getAccumulationPass;
exports.setAccumulationPass = setAccumulationPass;
/* CPContainerManager-Wonderjs Not a pure module */
