'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var VboBufferTool$Wonderjs = require("../../../tool/service/vboBuffer/VboBufferTool.js");

function addVboBufferToSourceInstanceBufferMap(sourceInstanceIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */25] = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, state[/* vboBufferRecord */25]);
  return newrecord;
}

exports.addVboBufferToSourceInstanceBufferMap = addVboBufferToSourceInstanceBufferMap;
/* VboBufferTool-Wonderjs Not a pure module */
