

import * as ExtendButton$WonderImgui from "../../../../../node_modules/wonder-imgui/lib/es6_global/src/extend/ExtendButton.js";
import * as ExtendIMGUIAPI$WonderImgui from "../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ExtendIMGUIAPI.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../service/state/main/imgui/extend/ExtendIMGUIMainService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ManageIMGUIMainService.js";

var hasCustomControl = ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* hasCustomControl */5];

var unsafeGetCustomControl = ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* unsafeGetCustomControl */6];

var registerCustomControl = ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* registerCustomControl */2];

var removeCustomControl = ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* removeCustomControl */3];

var hasSkinData = ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* hasSkinData */8];

var addSkinData = ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* addSkinData */3];

var removeSkinData = ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* removeSkinData */4];

var unsafeGetSkinData = ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* unsafeGetSkinData */6];

function unsafeGetDefaultSkinData(state) {
  return ExtendIMGUIAPI$WonderImgui.unsafeGetDefaultSkinData(ManageIMGUIMainService$Wonderjs.getRecord(state));
}

var createDefaultSkinData = ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* createDefaultSkinData */10];

var setSkinData = ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* setSkinData */7];

function createDefaultButtonSkinData(param) {
  return ExtendButton$WonderImgui.Skin[/* createDefaultSkinData */1](/* () */0);
}

var createAllCustomStyleData = ExtendIMGUIAPI$WonderImgui.createAllCustomStyleData;

var createSingleCustomStyleData = ExtendIMGUIAPI$WonderImgui.createSingleCustomStyleData;

var addCustomStyleData = ExtendIMGUIAPI$WonderImgui.addCustomStyleData;

var removeCustomStyleData = ExtendIMGUIAPI$WonderImgui.removeCustomStyleData;

var addSingleCustomStyleData = ExtendIMGUIAPI$WonderImgui.addSingleCustomStyleData;

var removeSingleCustomStyleData = ExtendIMGUIAPI$WonderImgui.removeSingleCustomStyleData;

var createSkinData = ExtendIMGUIAPI$WonderImgui.createSkinData;

var getDefaultSkinName = ExtendIMGUIAPI$WonderImgui.getDefaultSkinName;

var getButtonSkinData = ExtendIMGUIAPI$WonderImgui.getButtonSkinData;

var setButtonSkinData = ExtendIMGUIAPI$WonderImgui.setButtonSkinData;

var createButtonSkinData = ExtendIMGUIAPI$WonderImgui.createButtonSkinData;

export {
  hasCustomControl ,
  unsafeGetCustomControl ,
  registerCustomControl ,
  removeCustomControl ,
  createAllCustomStyleData ,
  createSingleCustomStyleData ,
  addCustomStyleData ,
  removeCustomStyleData ,
  addSingleCustomStyleData ,
  removeSingleCustomStyleData ,
  hasSkinData ,
  addSkinData ,
  removeSkinData ,
  createSkinData ,
  unsafeGetSkinData ,
  unsafeGetDefaultSkinData ,
  createDefaultSkinData ,
  setSkinData ,
  getDefaultSkinName ,
  getButtonSkinData ,
  setButtonSkinData ,
  createButtonSkinData ,
  createDefaultButtonSkinData ,
  
}
/* ExtendIMGUIAPI-WonderImgui Not a pure module */
