

import * as CountLightService$Wonderjs from "../../../all/light/CountLightService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as BufferPointLightService$Wonderjs from "./BufferPointLightService.js";
import * as OperatePointLightService$Wonderjs from "./OperatePointLightService.js";

function create(isRenderLight, record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */9]);
  var index = match[0];
  var record_000 = /* index */match[1];
  var record_001 = /* buffer */record[/* buffer */1];
  var record_002 = /* colors */record[/* colors */2];
  var record_003 = /* intensities */record[/* intensities */3];
  var record_004 = /* constants */record[/* constants */4];
  var record_005 = /* linears */record[/* linears */5];
  var record_006 = /* quadratics */record[/* quadratics */6];
  var record_007 = /* ranges */record[/* ranges */7];
  var record_008 = /* renderLightArr */record[/* renderLightArr */8];
  var record_009 = /* disposedIndexArray */record[/* disposedIndexArray */9];
  var record_010 = /* gameObjectMap */record[/* gameObjectMap */10];
  var record$1 = /* record */[
    record_000,
    record_001,
    record_002,
    record_003,
    record_004,
    record_005,
    record_006,
    record_007,
    record_008,
    record_009,
    record_010
  ];
  var record$2 = isRenderLight ? OperatePointLightService$Wonderjs.setIsRender(index, true, record$1) : record$1;
  var __x = CountLightService$Wonderjs.getLightCount(record$2[/* renderLightArr */8]);
  CountLightService$Wonderjs.checkNotExceedMaxCount(__x, BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0));
  return /* tuple */[
          record$2,
          index
        ];
}

export {
  create ,
  
}
/* CountLightService-Wonderjs Not a pure module */
