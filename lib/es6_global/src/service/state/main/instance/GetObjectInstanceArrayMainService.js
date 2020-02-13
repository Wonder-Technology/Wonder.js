

import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as GameObjectTransformService$Wonderjs from "../../../record/main/transform/GameObjectTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../primitive/instance/ObjectInstanceCollectionService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "./RecordSourceInstanceMainService.js";

function getObjectInstanceTransformArray(sourceInstance, state) {
  var match = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  return ObjectInstanceCollectionService$Wonderjs.getObjectInstanceTransformArray(sourceInstance, BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(state[/* settingRecord */0]), match[/* objectInstanceTransformIndexMap */1], match[/* objectInstanceTransformCollections */4]);
}

function getObjectInstanceArray(sourceInstance, state) {
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  return getObjectInstanceTransformArray(sourceInstance, state).map((function (transform) {
                return GameObjectTransformService$Wonderjs.unsafeGetGameObject(transform, transformRecord);
              }));
}

export {
  getObjectInstanceTransformArray ,
  getObjectInstanceArray ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
