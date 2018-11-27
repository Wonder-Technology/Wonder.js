

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BufferService$Wonderjs from "../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";

function create(state) {
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = geometryRecord[/* disposedIndexArray */19];
  var match = IndexComponentService$Wonderjs.generateIndex(geometryRecord[/* index */0], disposedIndexArray);
  var newrecord = Caml_array.caml_array_dup(geometryRecord);
  state[/* geometryRecord */22] = (newrecord[/* index */0] = match[1], newrecord[/* disposedIndexArray */19] = match[2], newrecord);
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getGeometryCount(state[/* settingRecord */0]), /* tuple */[
              state,
              match[0]
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
