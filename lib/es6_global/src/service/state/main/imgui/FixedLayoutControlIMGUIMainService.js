

import * as GroupLayoutIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/GroupLayoutIMGUIAPI.js";
import * as ManageIMGUIMainService$Wonderjs from "./ManageIMGUIMainService.js";
import * as FixedLayoutControlIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/control/FixedLayoutControlIMGUIService.js";

function label(rect, str, align, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.label(rect, str, align, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function image(rect, uv, id, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.image(rect, uv, id, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function button(rect, str, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.button(rect, str, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.setRecord(match[0], state),
          match[1]
        ];
}

function box(rect, color, state) {
  var __x = FixedLayoutControlIMGUIService$WonderImgui.box(rect, color, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function radioButton(groupDataArr, defaultSelectIndex, group, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.radioButton(groupDataArr, defaultSelectIndex, group, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.setRecord(match[0], state),
          match[1]
        ];
}

function checkbox(rect, defaultIsSelected, str, state) {
  var match = FixedLayoutControlIMGUIService$WonderImgui.checkbox(rect, defaultIsSelected, str, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.setRecord(match[0], state),
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
      ], ManageIMGUIMainService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.setRecord(match[0], state),
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
      ], ManageIMGUIMainService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.setRecord(match[0], state),
          match[1],
          match[2]
        ];
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
  button ,
  box ,
  radioButton ,
  checkbox ,
  sliderInt ,
  sliderFloat ,
  beginGroup ,
  endGroup ,
  
}
/* ManageIMGUIMainService-Wonderjs Not a pure module */
