

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "./RecordCustomGeometryMainService.js";

function create(state) {
  var customGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = customGeometryRecord[/* disposedIndexArray */17];
  var match = IndexComponentService$Wonderjs.generateIndex(customGeometryRecord[/* index */0], disposedIndexArray);
  var index = match[0];
  state[/* customGeometryRecord */23] = /* record */[
    /* index */match[1],
    /* buffer */customGeometryRecord[/* buffer */1],
    /* vertices */customGeometryRecord[/* vertices */2],
    /* texCoords */customGeometryRecord[/* texCoords */3],
    /* normals */customGeometryRecord[/* normals */4],
    /* indices */customGeometryRecord[/* indices */5],
    /* verticesInfos */customGeometryRecord[/* verticesInfos */6],
    /* texCoordsInfos */customGeometryRecord[/* texCoordsInfos */7],
    /* normalsInfos */customGeometryRecord[/* normalsInfos */8],
    /* indicesInfos */customGeometryRecord[/* indicesInfos */9],
    /* verticesOffset */customGeometryRecord[/* verticesOffset */10],
    /* texCoordsOffset */customGeometryRecord[/* texCoordsOffset */11],
    /* normalsOffset */customGeometryRecord[/* normalsOffset */12],
    /* indicesOffset */customGeometryRecord[/* indicesOffset */13],
    /* disposeCount */customGeometryRecord[/* disposeCount */14],
    /* gameObjectMap */customGeometryRecord[/* gameObjectMap */15],
    /* groupCountMap */customGeometryRecord[/* groupCountMap */16],
    /* disposedIndexArray */match[2],
    /* disposedIndexMap */customGeometryRecord[/* disposedIndexMap */18],
    /* aliveIndexArray */ArrayService$Wonderjs.push(index, customGeometryRecord[/* aliveIndexArray */19])
  ];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getCustomGeometryCount(state[/* settingRecord */0]), /* tuple */[
              state,
              index
            ]);
}

export {
  create ,
  
}
/* ArrayService-Wonderjs Not a pure module */
