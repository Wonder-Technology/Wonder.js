

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "./RecordCubemapTextureMainService.js";

function create(state) {
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(cubemapTextureRecord[/* index */0], cubemapTextureRecord[/* disposedIndexArray */27]);
  var newrecord = Caml_array.caml_array_dup(cubemapTextureRecord);
  state[/* cubemapTextureRecord */20] = (newrecord[/* index */0] = match[1], newrecord);
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getCubemapTextureCount(state[/* settingRecord */0]), /* tuple */[
              state,
              match[0]
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
