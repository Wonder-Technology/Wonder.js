

import * as Most from "most";
import * as AssetIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/AssetIMGUIAPI.js";
import * as FontIMGUIService$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/io/FontIMGUIService.js";
import * as ManageIMGUIMainService$Wonderjs from "./ManageIMGUIMainService.js";

function getSettedAssetFntContent(state) {
  return FontIMGUIService$WonderImgui.SetAsset[/* getFntContent */7](ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function unsafeGetSettedAssetFntContent(state) {
  return AssetIMGUIAPI$WonderImgui.unsafeGetSettedAssetFntContent(ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function getSettedAssetFntName(state) {
  return FontIMGUIService$WonderImgui.SetAsset[/* getFntName */9](ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function unsafeGetSettedAssetFntName(state) {
  return AssetIMGUIAPI$WonderImgui.unsafeGetSettedAssetFntName(ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function hasSettedAssetFntData(name, state) {
  return AssetIMGUIAPI$WonderImgui.hasSettedAssetFntData(name, ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function setSettedAssetFntData(name, content, state) {
  var __x = AssetIMGUIAPI$WonderImgui.setSettedAssetFntData(name, content, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function removeSettedAssetFntData(state) {
  var __x = AssetIMGUIAPI$WonderImgui.removeSettedAssetFntData(ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function getSettedAssetBitmapArrayBuffer(state) {
  return FontIMGUIService$WonderImgui.SetAsset[/* getBitmapArrayBuffer */0](ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function unsafeGetSettedAssetBitmapArrayBuffer(state) {
  return AssetIMGUIAPI$WonderImgui.unsafeGetSettedAssetBitmapArrayBuffer(ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function hasSettedAssetBitmapData(name, state) {
  return AssetIMGUIAPI$WonderImgui.hasSettedAssetBitmapData(name, ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function removeSettedAssetBitmapData(state) {
  var __x = AssetIMGUIAPI$WonderImgui.removeSettedAssetBitmapData(ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function getSettedAssetBitmapName(state) {
  return FontIMGUIService$WonderImgui.SetAsset[/* getBitmapName */2](ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function unsafeGetSettedAssetBitmapName(state) {
  return AssetIMGUIAPI$WonderImgui.unsafeGetSettedAssetBitmapName(ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function setSettedAssetBitmapData(name, bitmapArrayBuffer, state) {
  var __x = AssetIMGUIAPI$WonderImgui.setSettedAssetBitmapData(name, bitmapArrayBuffer, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function hasSettedAssetCustomImageData(id, state) {
  return AssetIMGUIAPI$WonderImgui.hasSettedAssetCustomImageData(id, ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function getSettedAssetCustomImageDataArr(state) {
  return AssetIMGUIAPI$WonderImgui.getSettedAssetCustomImageDataArr(ManageIMGUIMainService$Wonderjs.getRecord(state));
}

function addSettedAssetCustomImageData(data, state) {
  var __x = AssetIMGUIAPI$WonderImgui.addSettedAssetCustomImageData(data, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function removeSettedAssetCustomImageData(id, state) {
  var __x = AssetIMGUIAPI$WonderImgui.removeSettedAssetCustomImageData(id, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function initSettedAssets(state) {
  return Most.map((function (imguiRecord) {
                return ManageIMGUIMainService$Wonderjs.setRecord(imguiRecord, state);
              }), AssetIMGUIAPI$WonderImgui.initSettedAssets(ManageIMGUIMainService$Wonderjs.getRecord(state)));
}

export {
  getSettedAssetFntContent ,
  unsafeGetSettedAssetFntContent ,
  getSettedAssetFntName ,
  unsafeGetSettedAssetFntName ,
  hasSettedAssetFntData ,
  setSettedAssetFntData ,
  removeSettedAssetFntData ,
  getSettedAssetBitmapArrayBuffer ,
  unsafeGetSettedAssetBitmapArrayBuffer ,
  hasSettedAssetBitmapData ,
  removeSettedAssetBitmapData ,
  getSettedAssetBitmapName ,
  unsafeGetSettedAssetBitmapName ,
  setSettedAssetBitmapData ,
  hasSettedAssetCustomImageData ,
  getSettedAssetCustomImageDataArr ,
  addSettedAssetCustomImageData ,
  removeSettedAssetCustomImageData ,
  initSettedAssets ,
  
}
/* most Not a pure module */
