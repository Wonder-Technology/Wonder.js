

import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CreateTransformMainService$Wonderjs from "../transform/CreateTransformMainService.js";
import * as CreateObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/CreateObjectInstanceService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../primitive/instance/ObjectInstanceCollectionService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "./RecordSourceInstanceMainService.js";
import * as AddComponentGameObjectMainService$Wonderjs from "../gameObject/AddComponentGameObjectMainService.js";
import * as CreateGameObjectGameObjectService$Wonderjs from "../../../record/main/gameObject/CreateGameObjectGameObjectService.js";

function createInstance(sourceInstance, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = CreateGameObjectGameObjectService$Wonderjs.create(gameObjectRecord);
  var uid = match[1];
  var match$1 = CreateTransformMainService$Wonderjs.create(state);
  var transform = match$1[1];
  var state$1 = match$1[0];
  var sourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(state$1);
  state$1[/* gameObjectRecord */10] = match[0];
  var match$2 = ObjectInstanceCollectionService$Wonderjs.addObjectInstanceTransform(sourceInstance, transform, BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(state[/* settingRecord */0]), /* tuple */[
        sourceInstanceRecord[/* objectInstanceTransformIndexMap */1],
        sourceInstanceRecord[/* objectInstanceTransformCollections */4]
      ]);
  state$1[/* sourceInstanceRecord */6] = /* record */[
    /* index */sourceInstanceRecord[/* index */0],
    /* objectInstanceTransformIndexMap */match$2[0],
    /* buffer */sourceInstanceRecord[/* buffer */2],
    /* isTransformStatics */sourceInstanceRecord[/* isTransformStatics */3],
    /* objectInstanceTransformCollections */match$2[1],
    /* matrixInstanceBufferCapacityMap */sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */5],
    /* matrixFloat32ArrayMap */sourceInstanceRecord[/* matrixFloat32ArrayMap */6],
    /* isSendTransformMatrixDataMap */sourceInstanceRecord[/* isSendTransformMatrixDataMap */7],
    /* disposedIndexArray */sourceInstanceRecord[/* disposedIndexArray */8],
    /* gameObjectMap */sourceInstanceRecord[/* gameObjectMap */9]
  ];
  var match$3 = CreateObjectInstanceService$Wonderjs.create(sourceInstance, uid, state$1[/* objectInstanceRecord */7]);
  state$1[/* objectInstanceRecord */7] = match$3[0];
  var state$2 = AddComponentGameObjectMainService$Wonderjs.addObjectInstanceComponent(uid, match$3[1], AddComponentGameObjectMainService$Wonderjs.addTransformComponent(uid, transform, state$1));
  return /* tuple */[
          state$2,
          uid
        ];
}

export {
  createInstance ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
