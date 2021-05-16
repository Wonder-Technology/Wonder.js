

import * as SourceInstanceTool$Wonderjs from "../instance/SourceInstanceTool.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../../src/service/primitive/instance/ObjectInstanceCollectionService.js";

function addObjectInstanceTransform(sourceInstance, objectInstanceTransform, objectInstanceCountPerSourceInstance, state) {
  var match = SourceInstanceTool$Wonderjs.getRecord(state);
  return ObjectInstanceCollectionService$Wonderjs.addObjectInstanceTransform(sourceInstance, objectInstanceTransform, objectInstanceCountPerSourceInstance, /* tuple */[
              match[/* objectInstanceTransformIndexMap */1],
              match[/* objectInstanceTransformCollections */4]
            ]);
}

export {
  addObjectInstanceTransform ,
  
}
/* SourceInstanceTool-Wonderjs Not a pure module */
