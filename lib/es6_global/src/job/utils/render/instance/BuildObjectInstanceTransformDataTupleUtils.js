

import * as OperateRenderSettingService$Wonderjs from "../../../../service/record/render/setting/OperateRenderSettingService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../../service/primitive/instance/ObjectInstanceCollectionService.js";

function build(sourceInstance, state) {
  var match = state[/* sourceInstanceRecord */15];
  var objectInstanceTransformIndex = ObjectInstanceCollectionService$Wonderjs.getObjectInstanceTransformIndex(sourceInstance, match[/* objectInstanceTransformIndexMap */0]);
  return /* tuple */[
          objectInstanceTransformIndex,
          /* tuple */[
            sourceInstance,
            OperateRenderSettingService$Wonderjs.unsafeGetObjectInstanceCountPerSourceInstance(state[/* settingRecord */19]),
            objectInstanceTransformIndex,
            match[/* objectInstanceTransformCollections */1]
          ]
        ];
}

export {
  build ,
  
}
/* OperateRenderSettingService-Wonderjs Not a pure module */
