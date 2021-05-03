

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ExtendButton$WonderImgui from "./../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/extend/ExtendButton.js";
import * as SkinAllIMGUIService$Wonderjs from "../../../../record/all/imgui/SkinAllIMGUIService.js";
import * as ManageIMGUIMainService$Wonderjs from "../ManageIMGUIMainService.js";
import * as DataSkinIMGUIService$WonderImgui from "./../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/extend/skin/DataSkinIMGUIService.js";
import * as AllSkinDataMapService$WonderImgui from "./../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/primitive/extend/AllSkinDataMapService.js";
import * as CustomControlAllIMGUIService$Wonderjs from "../../../../record/all/imgui/CustomControlAllIMGUIService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as ManageCustomControlIMGUIService$WonderImgui from "./../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/extend/customControl/ManageCustomControlIMGUIService.js";

function button(param, showData, state) {
  var match = ExtendButton$WonderImgui.CustomControl[/* button */2](/* tuple */[
        param[0],
        param[1]
      ], showData, ManageIMGUIMainService$Wonderjs.getRecord(state));
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.setRecord(match[0], state),
          match[1]
        ];
}

var Button = /* module */[/* button */button];

function unsafeGetCustomControl(name, state) {
  return ManageCustomControlIMGUIService$WonderImgui.unsafeGetCustomControl(name, ManageIMGUIMainService$Wonderjs.getRecord(state));
}

var Extend = /* module */[/* unsafeGetCustomControl */unsafeGetCustomControl];

function _getExtendData(state) {
  return state[/* imguiRecord */44][/* extendData */2];
}

function getFuncMap(state) {
  return state[/* imguiRecord */44][/* extendData */2][/* customControlData */0][/* funcMap */0];
}

function setFuncMap(funcMap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  var init$1 = state[/* imguiRecord */44][/* extendData */2];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData : record */[
      /* customControlData : record */[/* funcMap */funcMap],
      /* skinData */init$1[/* skinData */1]
    ],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

function registerCustomControl(name, customControlFunc, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  var init$1 = state[/* imguiRecord */44][/* extendData */2];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData : record */[
      /* customControlData : record */[/* funcMap */ImmutableHashMapService$WonderCommonlib.set(name, customControlFunc, state[/* imguiRecord */44][/* extendData */2][/* customControlData */0][/* funcMap */0])],
      /* skinData */init$1[/* skinData */1]
    ],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

function removeCustomControl(name, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  var init$1 = state[/* imguiRecord */44][/* extendData */2];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData : record */[
      /* customControlData : record */[/* funcMap */ImmutableHashMapService$WonderCommonlib.deleteVal(name, state[/* imguiRecord */44][/* extendData */2][/* customControlData */0][/* funcMap */0])],
      /* skinData */init$1[/* skinData */1]
    ],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

function registerAllCustomControlsToWonderImguiIMGUIRecord(state) {
  var __x = CustomControlAllIMGUIService$Wonderjs.registerAllCustomControlsToWonderImguiIMGUIRecord(state[/* imguiRecord */44][/* extendData */2][/* customControlData */0][/* funcMap */0], ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function hasCustomControl(name, state) {
  return ImmutableHashMapService$WonderCommonlib.has(name, state[/* imguiRecord */44][/* extendData */2][/* customControlData */0][/* funcMap */0]);
}

function unsafeGetCustomControl$1(name, state) {
  return ImmutableHashMapService$WonderCommonlib.unsafeGet(name, state[/* imguiRecord */44][/* extendData */2][/* customControlData */0][/* funcMap */0]);
}

var CustomControl = /* module */[
  /* getFuncMap */getFuncMap,
  /* setFuncMap */setFuncMap,
  /* registerCustomControl */registerCustomControl,
  /* removeCustomControl */removeCustomControl,
  /* registerAllCustomControlsToWonderImguiIMGUIRecord */registerAllCustomControlsToWonderImguiIMGUIRecord,
  /* hasCustomControl */hasCustomControl,
  /* unsafeGetCustomControl */unsafeGetCustomControl$1
];

function getAllSkinDataMap(state) {
  return state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0];
}

function setAllSkinDataMap(allSkinDataMap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  var init$1 = state[/* imguiRecord */44][/* extendData */2];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData : record */[
      /* customControlData */init$1[/* customControlData */0],
      /* skinData : record */[/* allSkinDataMap */allSkinDataMap]
    ],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

function _setAllSkinDataMap(allSkinDataMap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  var init$1 = state[/* imguiRecord */44][/* extendData */2];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData : record */[
      /* customControlData */init$1[/* customControlData */0],
      /* skinData : record */[/* allSkinDataMap */allSkinDataMap]
    ],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

function addSkinData(skinName, skinData, state) {
  return _setAllSkinDataMap(AllSkinDataMapService$WonderImgui.addSkinData(skinName, skinData, state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0]), state);
}

function removeSkinData(skinName, state) {
  return _setAllSkinDataMap(AllSkinDataMapService$WonderImgui.removeSkinData(skinName, state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0]), state);
}

function getSkinData(skinName, state) {
  return ImmutableHashMapService$WonderCommonlib.get(skinName, state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0]);
}

function unsafeGetSkinData(skinName, state) {
  return OptionService$Wonderjs.unsafeGet(ImmutableHashMapService$WonderCommonlib.get(skinName, state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0]));
}

function setSkinData(skinName, skinData, state) {
  return _setAllSkinDataMap(ImmutableHashMapService$WonderCommonlib.set(skinName, skinData, state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0]), state);
}

function hasSkinData(skinName, state) {
  return ImmutableHashMapService$WonderCommonlib.has(skinName, state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0]);
}

function mergeAllSkinDataMapsToWonderImguiIMGUIRecord(state) {
  var __x = SkinAllIMGUIService$Wonderjs.mergeAllSkinDataMapsToWonderImguiIMGUIRecord(state[/* imguiRecord */44][/* extendData */2][/* skinData */1][/* allSkinDataMap */0], ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

var Skin = /* module */[
  /* getAllSkinDataMap */getAllSkinDataMap,
  /* setAllSkinDataMap */setAllSkinDataMap,
  /* _setAllSkinDataMap */_setAllSkinDataMap,
  /* addSkinData */addSkinData,
  /* removeSkinData */removeSkinData,
  /* getSkinData */getSkinData,
  /* unsafeGetSkinData */unsafeGetSkinData,
  /* setSkinData */setSkinData,
  /* hasSkinData */hasSkinData,
  /* mergeAllSkinDataMapsToWonderImguiIMGUIRecord */mergeAllSkinDataMapsToWonderImguiIMGUIRecord,
  /* createDefaultSkinData */DataSkinIMGUIService$WonderImgui._createDefaultSkinData
];

var ExtendData = /* module */[
  /* _getExtendData */_getExtendData,
  /* CustomControl */CustomControl,
  /* Skin */Skin
];

export {
  Button ,
  Extend ,
  ExtendData ,
  
}
/* OptionService-Wonderjs Not a pure module */
