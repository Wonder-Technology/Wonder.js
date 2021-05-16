

import * as CountLightService$Wonderjs from "../../../../primitive/light/CountLightService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as BufferDirectionLightService$Wonderjs from "./BufferDirectionLightService.js";
import * as OperateDirectionLightService$Wonderjs from "./OperateDirectionLightService.js";

function create(isRenderLight, record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */6]);
  var index = match[0];
  var record_000 = /* index */match[1];
  var record_001 = /* buffer */record[/* buffer */1];
  var record_002 = /* colors */record[/* colors */2];
  var record_003 = /* intensities */record[/* intensities */3];
  var record_004 = /* renderLightArr */record[/* renderLightArr */4];
  var record_005 = /* gameObjectMap */record[/* gameObjectMap */5];
  var record_006 = /* disposedIndexArray */record[/* disposedIndexArray */6];
  var record$1 = /* record */[
    record_000,
    record_001,
    record_002,
    record_003,
    record_004,
    record_005,
    record_006
  ];
  var record$2 = isRenderLight ? OperateDirectionLightService$Wonderjs.setIsRender(index, true, record$1) : record$1;
  var __x = CountLightService$Wonderjs.getLightCount(record$2[/* renderLightArr */4]);
  CountLightService$Wonderjs.checkNotExceedMaxCount(__x, BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0));
  return /* tuple */[
          record$2,
          index
        ];
}

export {
  create ,
  
}
/* CountLightService-Wonderjs Not a pure module */
