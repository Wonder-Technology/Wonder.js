

import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../service/state/main/instance/JudgeInstanceMainService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../service/state/init_shader/init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as CreateInitLightMaterialStateMainService$Wonderjs from "../../../service/state/main/material/light/CreateInitLightMaterialStateMainService.js";

function execJob(flags, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitLightMaterialService$Wonderjs.init(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */13], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */14]
          ], state));
  return state;
}

export {
  execJob ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
