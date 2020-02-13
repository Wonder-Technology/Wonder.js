'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var SceneGraphIMGUITool$Wonderjs = require("../../../integration/no_worker/asset/tool/SceneGraphIMGUITool.js");
var SetAssetIMGUIMainService$Wonderjs = require("../../../../src/service/state/main/imgui/SetAssetIMGUIMainService.js");

function buildFakeBitmapName(param) {
  return "bitmap";
}

function buildFakeBitmapData($staropt$star, param) {
  if ($staropt$star !== undefined) {
    return Caml_option.valFromOption($staropt$star);
  } else {
    return new ArrayBuffer(10);
  }
}

function buildCustomImageData($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var id = $staropt$star !== undefined ? $staropt$star : "c1";
  var mimeType = $staropt$star$1 !== undefined ? $staropt$star$1 : "image/png";
  var data = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : new ArrayBuffer(20);
  return /* tuple */[
          data,
          id,
          mimeType
        ];
}

function buildAndSetAssetData(state) {
  return SetAssetIMGUIMainService$Wonderjs.addSettedAssetCustomImageData(buildCustomImageData("c2", "image/jpeg", Caml_option.some(new ArrayBuffer(30)), /* () */0), SetAssetIMGUIMainService$Wonderjs.addSettedAssetCustomImageData(buildCustomImageData("c1", "image/png", Caml_option.some(new ArrayBuffer(20)), /* () */0), SetAssetIMGUIMainService$Wonderjs.setSettedAssetBitmapData("bitmap", buildFakeBitmapData(undefined, /* () */0), SetAssetIMGUIMainService$Wonderjs.setSettedAssetFntData(SceneGraphIMGUITool$Wonderjs.buildFakeFntName(/* () */0), SceneGraphIMGUITool$Wonderjs.buildFakeFntContent(/* () */0), state))));
}

exports.buildFakeBitmapName = buildFakeBitmapName;
exports.buildFakeBitmapData = buildFakeBitmapData;
exports.buildCustomImageData = buildCustomImageData;
exports.buildAndSetAssetData = buildAndSetAssetData;
/* SceneGraphIMGUITool-Wonderjs Not a pure module */
