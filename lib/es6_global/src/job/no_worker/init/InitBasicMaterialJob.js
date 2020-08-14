

import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../service/state/main/instance/JudgeInstanceMainService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../service/state/init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as CreateInitBasicMaterialStateMainService$Wonderjs from "../../../service/state/main/material/basic/CreateInitBasicMaterialStateMainService.js";

function execJob(flags, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitBasicMaterialService$Wonderjs.init(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */10], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */11]
          ], state));
  return state;
}

export {
  execJob ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
