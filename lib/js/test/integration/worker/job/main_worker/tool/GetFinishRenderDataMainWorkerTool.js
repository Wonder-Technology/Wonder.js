'use strict';

var Sinon = require("sinon");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function buildFinishRenderData($staropt$star, _) {
  var customData = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : Sinon.match.any;
  return {
          operateType: "FINISH_RENDER",
          customData: customData
        };
}

exports.buildFinishRenderData = buildFinishRenderData;
/* sinon Not a pure module */
