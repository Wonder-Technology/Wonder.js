

import * as GroupLayoutIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/GroupLayoutIMGUIAPI.js";
import * as ManageIMGUIRenderWorkerService$Wonderjs from "./ManageIMGUIRenderWorkerService.js";
import * as FixedLayoutControlIMGUIService$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/control/FixedLayoutControlIMGUIService.js";

function label(rect, str, cssData, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.label(rect, str, cssData, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function image(rect, uv, id, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.image(rect, uv, id, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function box(rect, color, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.box(rect, color, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function beginGroup(position, state) {
  var __x = GroupLayoutIMGUIAPI$WonderImgui.beginGroup(position, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function endGroup(state) {
  var __x = GroupLayoutIMGUIAPI$WonderImgui.endGroup(ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

export {
  label ,
  image ,
  box ,
  beginGroup ,
  endGroup ,
  
}
/* FixedLayoutControlIMGUIService-WonderImgui Not a pure module */
