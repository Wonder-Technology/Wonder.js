'use strict';

var List = require("bs-platform/lib/js/list.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/BasicSourceTextureTool.js");

function setSource(mapList, state) {
  return List.fold_left((function (state, map) {
                var source = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
                return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map, source, state);
              }), state, mapList);
}

exports.setSource = setSource;
/* BasicSourceTextureAPI-Wonderjs Not a pure module */
