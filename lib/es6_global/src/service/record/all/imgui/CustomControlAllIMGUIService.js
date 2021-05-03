

import * as ExtendIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ExtendIMGUIAPI.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function registerAllCustomControlsToWonderImguiIMGUIRecord(funcMap, imguiRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (imguiRecord, param) {
                return ExtendIMGUIAPI$WonderImgui.registerCustomControl(param[0], param[1], imguiRecord);
              }), imguiRecord, ImmutableHashMapService$WonderCommonlib.getValidEntries(funcMap));
}

var registerCustomControl = ExtendIMGUIAPI$WonderImgui.registerCustomControl;

export {
  registerCustomControl ,
  registerAllCustomControlsToWonderImguiIMGUIRecord ,
  
}
/* ExtendIMGUIAPI-WonderImgui Not a pure module */
