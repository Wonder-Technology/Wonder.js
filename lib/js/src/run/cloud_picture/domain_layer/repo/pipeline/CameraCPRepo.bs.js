'use strict';

var CPRepo$Wonderjs = require("../CPRepo.bs.js");
var OptionSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");

function getCameraBufferData(param) {
  return OptionSt$Wonderjs.map(CPRepo$Wonderjs.getCamera(undefined).cameraBufferData, (function (param) {
                return [
                        UniformBufferVO$Wonderjs.create(param[0]),
                        param[1]
                      ];
              }));
}

function setCameraBufferData(param) {
  return CPRepo$Wonderjs.setCamera({
              cameraBufferData: [
                UniformBufferVO$Wonderjs.value(param[0]),
                param[1]
              ]
            });
}

exports.getCameraBufferData = getCameraBufferData;
exports.setCameraBufferData = setCameraBufferData;
/* CPRepo-Wonderjs Not a pure module */
