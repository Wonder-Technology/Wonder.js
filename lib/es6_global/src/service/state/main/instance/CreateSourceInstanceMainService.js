

import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../primitive/instance/ObjectInstanceCollectionService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "./RecordSourceInstanceMainService.js";

function create(state) {
  var record = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */8]);
  var index = match[0];
  state[/* sourceInstanceRecord */6] = /* record */[
    /* index */match[1],
    /* objectInstanceTransformIndexMap */ObjectInstanceCollectionService$Wonderjs.setDefaultObjectInstanceTransformIndex(index, record[/* objectInstanceTransformIndexMap */1]),
    /* buffer */record[/* buffer */2],
    /* isTransformStatics */record[/* isTransformStatics */3],
    /* objectInstanceTransformCollections */record[/* objectInstanceTransformCollections */4],
    /* matrixInstanceBufferCapacityMap */record[/* matrixInstanceBufferCapacityMap */5],
    /* matrixFloat32ArrayMap */record[/* matrixFloat32ArrayMap */6],
    /* isSendTransformMatrixDataMap */record[/* isSendTransformMatrixDataMap */7],
    /* disposedIndexArray */match[2],
    /* gameObjectMap */record[/* gameObjectMap */9]
  ];
  return /* tuple */[
          state,
          index
        ];
}

export {
  create ,
  
}
/* ObjectInstanceCollectionService-Wonderjs Not a pure module */
