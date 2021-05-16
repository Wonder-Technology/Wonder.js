

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AssetIMGUITool$Wonderjs from "../../../../../tool/service/imgui/AssetIMGUITool.js";
import * as AssetIMGUIAPI$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/AssetIMGUIAPI.js";
import * as AssetIMGUIService$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/io/AssetIMGUIService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";
import * as InitBasicSourceTextureRenderWorkerTool$Wonderjs from "../../../tool/texture/InitBasicSourceTextureRenderWorkerTool.js";

var getBitmap = AssetIMGUIService$WonderImgui.getBitmap;

function setBitmap(bitmap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */AssetIMGUIService$WonderImgui.setBitmap(bitmap, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

var getFntData = AssetIMGUIService$WonderImgui.getFntData;

function setFntData(fntData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */AssetIMGUIService$WonderImgui.setFntData(fntData, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

function buildCustomImageData(source, id, $staropt$star, param) {
  var imageType = $staropt$star !== undefined ? $staropt$star : /* Png */1;
  return /* tuple */[
          source,
          id,
          imageType
        ];
}

var getCustomImageArr = AssetIMGUIAPI$WonderImgui.getCustomImageArr;

function setCustomImageArr(customImageArr, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */AssetIMGUIAPI$WonderImgui.setCustomImageArr(customImageArr, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

function prepareState(sandbox) {
  var match = InitBasicSourceTextureRenderWorkerTool$Wonderjs.prepareState(sandbox, /* tuple */[
        11,
        12,
        13,
        14
      ]);
  var state = AssetIMGUITool$Wonderjs.prepareFontAsset(match[0]);
  return /* tuple */[
          state,
          /* tuple */[
            /* tuple */[
              11,
              12,
              13,
              14
            ],
            match[1]
          ]
        ];
}

function prepareSetData(sandbox) {
  var match = prepareState(sandbox);
  var match$1 = match[1];
  var state = setFntData(2, match[0]);
  var bitmap = {
    width: 100,
    height: 200
  };
  var state$1 = setBitmap(bitmap, state);
  var source1 = {
    width: 100,
    height: 200
  };
  var source2 = {
    width: 300,
    height: 400
  };
  var customImageArr = /* array */[
    buildCustomImageData(source1, "a1", /* Png */1, /* () */0),
    buildCustomImageData(source2, "a2", /* Jpg */0, /* () */0)
  ];
  var state$2 = setCustomImageArr(customImageArr, state$1);
  return /* tuple */[
          state$2,
          /* tuple */[
            2,
            bitmap,
            customImageArr
          ],
          /* tuple */[
            match$1[0],
            match$1[1]
          ]
        ];
}

export {
  getBitmap ,
  setBitmap ,
  getFntData ,
  setFntData ,
  buildCustomImageData ,
  getCustomImageArr ,
  setCustomImageArr ,
  prepareState ,
  prepareSetData ,
  
}
/* AssetIMGUITool-Wonderjs Not a pure module */
