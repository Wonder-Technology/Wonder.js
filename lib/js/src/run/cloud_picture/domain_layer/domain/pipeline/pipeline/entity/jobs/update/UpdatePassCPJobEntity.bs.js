'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var PassCPRepo$Wonderjs = require("../../../../../../repo/pipeline/PassCPRepo.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/WebGPUCoreDpRunAPI.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/scene/component/utils/TypeArrayCPRepoUtils.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_pass");
}

function _updateCommonBufferData(param) {
  var commonBufferData = param[1];
  var commonBuffer = param[0];
  var sampleCount = PassCPRepo$Wonderjs.getSampleCount(undefined);
  var totalSampleCount = PassCPRepo$Wonderjs.getTotalSampleCount(undefined);
  return Result$Wonderjs.tap(ListResult$Wonderjs.mergeResults({
                  hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1(0, sampleCount, commonBufferData),
                  tl: {
                    hd: TypeArrayCPRepoUtils$Wonderjs.setUint32_1(1, totalSampleCount, commonBufferData),
                    tl: /* [] */0
                  }
                }), (function (param) {
                Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubUint32Data, 0, commonBufferData, UniformBufferVO$Wonderjs.value(commonBuffer));
                return PassCPRepo$Wonderjs.setCommonBufferData([
                            commonBuffer,
                            commonBufferData
                          ]);
              }));
}

function _updateAllBufferData(param) {
  return _updateCommonBufferData([
              param[0],
              param[1]
            ]);
}

function exec(param) {
  return Most.just(Result$Wonderjs.bind(OptionSt$Wonderjs.get(PassCPRepo$Wonderjs.getCommonBufferData(undefined)), (function (param) {
                    return _updateAllBufferData([
                                param[0],
                                param[1]
                              ]);
                  })));
}

exports.create = create;
exports._updateCommonBufferData = _updateCommonBufferData;
exports._updateAllBufferData = _updateAllBufferData;
exports.exec = exec;
/* most Not a pure module */
