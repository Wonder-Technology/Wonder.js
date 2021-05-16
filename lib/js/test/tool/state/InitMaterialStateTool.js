'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function isRenderConfigRecordExist(state) {
  return Js_option.isSome(state[/* renderConfigRecord */4]);
}

function setRenderConfig(renderConfig, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* renderConfigRecord */4] = renderConfig;
  return newrecord;
}

exports.isRenderConfigRecordExist = isRenderConfigRecordExist;
exports.setRenderConfig = setRenderConfig;
/* No side effect */
