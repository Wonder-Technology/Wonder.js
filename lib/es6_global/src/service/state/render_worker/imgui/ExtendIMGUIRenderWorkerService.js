

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ExtendButton$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/extend/ExtendButton.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../main/imgui/extend/ExtendIMGUIMainService.js";
import * as SerializeAllIMGUIService$Wonderjs from "../../../record/all/imgui/SerializeAllIMGUIService.js";
import * as ManageIMGUIRenderWorkerService$Wonderjs from "./ManageIMGUIRenderWorkerService.js";
import * as ManageCustomControlIMGUIService$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/extend/customControl/ManageCustomControlIMGUIService.js";

function button(param, showData, renderWorkerState) {
  var match = ExtendButton$WonderImgui.CustomControl[/* button */2](/* tuple */[
        param[0],
        param[1]
      ], showData, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(renderWorkerState));
  return /* tuple */[
          ManageIMGUIRenderWorkerService$Wonderjs.setRecord(match[0], renderWorkerState),
          match[1]
        ];
}

var Button = /* module */[/* button */button];

function unsafeGetCustomControl(name, renderWorkerState) {
  return ManageCustomControlIMGUIService$WonderImgui.unsafeGetCustomControl(name, ManageIMGUIRenderWorkerService$Wonderjs.getRecord(renderWorkerState));
}

var Extend = /* module */[/* unsafeGetCustomControl */unsafeGetCustomControl];

function serializeFuncMap(mainState) {
  return SerializeAllIMGUIService$Wonderjs.CustomControl[/* serializeFuncMap */0](Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* getFuncMap */0], mainState));
}

function deserializeFuncMap(funcMap) {
  return SerializeAllIMGUIService$Wonderjs.CustomControl[/* deserializeFuncMap */1](funcMap);
}

var CustomControl = /* module */[
  /* serializeFuncMap */serializeFuncMap,
  /* deserializeFuncMap */deserializeFuncMap
];

function serializeAllSkinDataMap(mainState) {
  return SerializeAllIMGUIService$Wonderjs.Skin[/* serializeAllSkinDataMap */0](Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* getAllSkinDataMap */0], mainState));
}

function deserializeAllSkinDataMap(allSkinDataMap) {
  return SerializeAllIMGUIService$Wonderjs.Skin[/* deserializeAllSkinDataMap */1](allSkinDataMap);
}

var Skin = /* module */[
  /* serializeAllSkinDataMap */serializeAllSkinDataMap,
  /* deserializeAllSkinDataMap */deserializeAllSkinDataMap
];

var ExtendData = /* module */[
  /* CustomControl */CustomControl,
  /* Skin */Skin
];

export {
  Button ,
  Extend ,
  ExtendData ,
  
}
/* ExtendIMGUIMainService-Wonderjs Not a pure module */
