'use strict';

var GLBTool$Wonderjs = require("../../asset/tool/GLBTool.js");
var ConvertTool$Wonderjs = require("../../asset/tool/ConvertTool.js");

function prepare(sandbox) {
  ConvertTool$Wonderjs.buildFakeLoadImage();
  GLBTool$Wonderjs.buildFakeTextDecoder(GLBTool$Wonderjs.convertUint8ArrayToBuffer);
  GLBTool$Wonderjs.buildFakeTextEncoder();
  return GLBTool$Wonderjs.buildFakeURL(sandbox);
}

exports.prepare = prepare;
/* GLBTool-Wonderjs Not a pure module */
