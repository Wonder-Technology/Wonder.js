'use strict';

var OptionService$Wonderjs = require("../../../../../../src/service/atom/OptionService.js");
var OperateRenderRenderWorkerService$Wonderjs = require("../../../../../../src/service/state/render_worker/render/OperateRenderRenderWorkerService.js");

function unsafeGetBasicRenderObjectRecord(state) {
  return OptionService$Wonderjs.unsafeGet(OperateRenderRenderWorkerService$Wonderjs.getBasicRenderObjectRecord(state));
}

var getBasicRenderObjectRecord = OperateRenderRenderWorkerService$Wonderjs.getBasicRenderObjectRecord;

exports.getBasicRenderObjectRecord = getBasicRenderObjectRecord;
exports.unsafeGetBasicRenderObjectRecord = unsafeGetBasicRenderObjectRecord;
/* OptionService-Wonderjs Not a pure module */
