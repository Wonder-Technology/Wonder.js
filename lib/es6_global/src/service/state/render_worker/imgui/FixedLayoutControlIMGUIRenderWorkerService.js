

import * as GroupLayoutIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/GroupLayoutIMGUIAPI.js";
import * as ManageIMGUIRenderWorkerService$Wonderjs from "./ManageIMGUIRenderWorkerService.js";
import * as FixedLayoutControlIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/control/FixedLayoutControlIMGUIService.js";

function label(rect, str, align, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.label(rect, str, align, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function image(rect, uv, id, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.image(rect, uv, id, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function button(rect, str, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.button(rect, str, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIRenderWorkerService$Wonderjs.setRecord(match[0], state),
          match[1]
        ];
}

function box(rect, color, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.box(rect, color, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return ManageIMGUIRenderWorkerService$Wonderjs.setRecord(__x, state);
}

function radioButton(groupDataArr, defaultSelectIndex, group, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.radioButton(groupDataArr, defaultSelectIndex, group, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIRenderWorkerService$Wonderjs.setRecord(match[0], state),
          match[1]
        ];
}

function checkbox(rect, defaultIsSelected, str, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.checkbox(rect, defaultIsSelected, str, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIRenderWorkerService$Wonderjs.setRecord(match[0], state),
          match[1]
        ];
}

function sliderInt(param, param$1, param$2, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.sliderInt(/* tuple */[
        param[0],
        param[1]
      ], /* tuple */[
        param$1[0],
        param$1[1]
      ], /* tuple */[
        param$2[0],
        param$2[1]
      ], ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIRenderWorkerService$Wonderjs.setRecord(match[0], state),
          match[1],
          match[2]
        ];
}

function sliderFloat(param, param$1, param$2, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.sliderFloat(/* tuple */[
        param[0],
        param[1]
      ], /* tuple */[
        param$1[0],
        param$1[1],
        param$1[2]
      ], /* tuple */[
        param$2[0],
        param$2[1]
      ], ManageIMGUIRenderWorkerService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIRenderWorkerService$Wonderjs.setRecord(match[0], state),
          match[1],
          match[2]
        ];
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
  button ,
  box ,
  radioButton ,
  checkbox ,
  sliderInt ,
  sliderFloat ,
  beginGroup ,
  endGroup ,
  
}
/* FixedLayoutControlIMGUIService-WonderImgui Not a pure module */
