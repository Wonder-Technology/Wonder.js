

import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../service/state/main/instance/JudgeInstanceMainService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../service/state/init_shader/init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as CreateInitLightMaterialStateMainService$Wonderjs from "../../../service/state/main/material/light/CreateInitLightMaterialStateMainService.js";

function execJob(flags, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitLightMaterialService$Wonderjs.init(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */11], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */12]
          ], state));
  return state;
}

export {
  execJob ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
