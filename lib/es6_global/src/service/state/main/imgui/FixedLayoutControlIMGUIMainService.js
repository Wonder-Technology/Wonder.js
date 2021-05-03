

import * as GroupLayoutIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/GroupLayoutIMGUIAPI.js";
import * as ManageIMGUIMainService$Wonderjs from "./ManageIMGUIMainService.js";
import * as FixedLayoutControlIMGUIService$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/control/FixedLayoutControlIMGUIService.js";

function label(rect, str, data, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.label(rect, str, data, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function image(rect, uv, id, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.image(rect, uv, id, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function box(rect, color, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.box(rect, color, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function beginGroup(position, state) {
  var __x = GroupLayoutIMGUIAPI$WonderImgui.beginGroup(position, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function endGroup(state) {
  var __x = GroupLayoutIMGUIAPI$WonderImgui.endGroup(ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

export {
  label ,
  image ,
  box ,
  beginGroup ,
  endGroup ,
  
}
/* ManageIMGUIMainService-Wonderjs Not a pure module */
