'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CPRepo$Wonderjs = require("../CPRepo.bs.js");
var OptionSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var StorageBufferVO$Wonderjs = require("../../../../../construct/domain_layer/domain/webgpu/core/value_object/StorageBufferVO.bs.js");

function getSceneDescBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getRayTracingPass(undefined).sceneDescBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1],
                        param[2]
                      ];
              }));
}

function setSceneDescBufferData(param) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1],
                param[2]
              ],
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getPointIndexBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getRayTracingPass(undefined).pointIndexBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1],
                        param[2]
                      ];
              }));
}

function setPointIndexBufferData(param) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1],
                param[2]
              ],
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getVertexBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getRayTracingPass(undefined).vertexBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1],
                        param[2]
                      ];
              }));
}

function setVertexBufferData(param) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1],
                param[2]
              ],
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getIndexBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getRayTracingPass(undefined).indexBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1]
                      ];
              }));
}

function setIndexBufferData(param) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1]
              ],
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getPBRMaterialBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getRayTracingPass(undefined).pbrMaterialBufferData, (function (param) {
                return [
                        StorageBufferVO$Wonderjs.create(param[0]),
                        param[1],
                        param[2]
                      ];
              }));
}

function setPBRMaterialBufferData(param) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: [
                StorageBufferVO$Wonderjs.value(param[0]),
                param[1],
                param[2]
              ],
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getShaderBindingTable(param) {
  return CPRepo$Wonderjs.getRayTracingPass(undefined).shaderBindingTable;
}

function setShaderBindingTable(shaderBindingTable) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: Caml_option.some(shaderBindingTable),
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function addStaticBindGroupData(setSlot, bindGroup) {
  var po = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: po.sceneDescBufferData,
              pointIndexBufferData: po.pointIndexBufferData,
              vertexBufferData: po.vertexBufferData,
              indexBufferData: po.indexBufferData,
              pbrMaterialBufferData: po.pbrMaterialBufferData,
              shaderBindingTable: po.shaderBindingTable,
              staticBindGroupDataList: {
                hd: {
                  setSlot: setSlot,
                  bindGroup: bindGroup
                },
                tl: po.staticBindGroupDataList
              },
              pipeline: po.pipeline,
              cameraBindGroupLayout: po.cameraBindGroupLayout,
              directionLightBindGroupLayout: po.directionLightBindGroupLayout
            });
}

function getAllStaticBindGroupData(param) {
  return CPRepo$Wonderjs.getRayTracingPass(undefined).staticBindGroupDataList;
}

function getPipeline(param) {
  return CPRepo$Wonderjs.getRayTracingPass(undefined).pipeline;
}

function setPipeline(pipeline) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: Caml_option.some(pipeline),
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getCameraBindGroupLayout(param) {
  return CPRepo$Wonderjs.getRayTracingPass(undefined).cameraBindGroupLayout;
}

function setCameraBindGroupLayout(bindGroupLayout) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: Caml_option.some(bindGroupLayout),
              directionLightBindGroupLayout: init.directionLightBindGroupLayout
            });
}

function getDirectionLightBindGroupLayout(param) {
  return CPRepo$Wonderjs.getRayTracingPass(undefined).directionLightBindGroupLayout;
}

function setDirectionLightBindGroupLayout(bindGroupLayout) {
  var init = CPRepo$Wonderjs.getRayTracingPass(undefined);
  return CPRepo$Wonderjs.setRayTracingPass({
              sceneDescBufferData: init.sceneDescBufferData,
              pointIndexBufferData: init.pointIndexBufferData,
              vertexBufferData: init.vertexBufferData,
              indexBufferData: init.indexBufferData,
              pbrMaterialBufferData: init.pbrMaterialBufferData,
              shaderBindingTable: init.shaderBindingTable,
              staticBindGroupDataList: init.staticBindGroupDataList,
              pipeline: init.pipeline,
              cameraBindGroupLayout: init.cameraBindGroupLayout,
              directionLightBindGroupLayout: Caml_option.some(bindGroupLayout)
            });
}

exports.getSceneDescBufferData = getSceneDescBufferData;
exports.setSceneDescBufferData = setSceneDescBufferData;
exports.getPointIndexBufferData = getPointIndexBufferData;
exports.setPointIndexBufferData = setPointIndexBufferData;
exports.getVertexBufferData = getVertexBufferData;
exports.setVertexBufferData = setVertexBufferData;
exports.getIndexBufferData = getIndexBufferData;
exports.setIndexBufferData = setIndexBufferData;
exports.getPBRMaterialBufferData = getPBRMaterialBufferData;
exports.setPBRMaterialBufferData = setPBRMaterialBufferData;
exports.getShaderBindingTable = getShaderBindingTable;
exports.setShaderBindingTable = setShaderBindingTable;
exports.addStaticBindGroupData = addStaticBindGroupData;
exports.getAllStaticBindGroupData = getAllStaticBindGroupData;
exports.getPipeline = getPipeline;
exports.setPipeline = setPipeline;
exports.getCameraBindGroupLayout = getCameraBindGroupLayout;
exports.setCameraBindGroupLayout = setCameraBindGroupLayout;
exports.getDirectionLightBindGroupLayout = getDirectionLightBindGroupLayout;
exports.setDirectionLightBindGroupLayout = setDirectionLightBindGroupLayout;
/* CPRepo-Wonderjs Not a pure module */
