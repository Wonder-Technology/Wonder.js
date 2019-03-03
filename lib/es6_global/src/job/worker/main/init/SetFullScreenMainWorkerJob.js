

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as ViewService$Wonderjs from "../../../../service/record/main/device/ViewService.js";
import * as ScreenService$Wonderjs from "../../../../service/primitive/device/ScreenService.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";

function execJob(param, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var viewRecord = state[/* viewRecord */8];
                state[/* viewRecord */8] = ViewService$Wonderjs.setCanvas(ScreenService$Wonderjs.setToFullScreen(ScreenService$Wonderjs.queryFullScreenData(/* () */0), ViewService$Wonderjs.unsafeGetCanvas(viewRecord)), state[/* viewRecord */8]);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
