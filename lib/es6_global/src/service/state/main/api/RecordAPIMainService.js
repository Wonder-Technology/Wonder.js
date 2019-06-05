

import * as RecordIMGUIAPIMainService$Wonderjs from "./RecordIMGUIAPIMainService.js";
import * as RecordScriptAPIMainService$Wonderjs from "./script/RecordScriptAPIMainService.js";

function create(param) {
  return /* record */[
          /* scriptAPIJsObj */RecordScriptAPIMainService$Wonderjs.create(/* () */0),
          /* imguiAPIJsObj */RecordIMGUIAPIMainService$Wonderjs.create(/* () */0)
        ];
}

export {
  create ,
  
}
/* RecordIMGUIAPIMainService-Wonderjs Not a pure module */
