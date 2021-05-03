'use strict';

var Sinon = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function buildFinishRenderData($staropt$star, param) {
  var customData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : Sinon.match.any;
  return {
          operateType: "FINISH_RENDER",
          customData: customData
        };
}

exports.buildFinishRenderData = buildFinishRenderData;
/* sinon Not a pure module */
