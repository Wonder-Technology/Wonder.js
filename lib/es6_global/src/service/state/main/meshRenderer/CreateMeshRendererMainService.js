

import * as BufferService$Wonderjs from "../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";
import * as RecordMeshRendererMainService$Wonderjs from "./RecordMeshRendererMainService.js";

function create(state) {
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(meshRendererRecord[/* index */0], meshRendererRecord[/* disposedIndexArray */7]);
  state[/* meshRendererRecord */24] = /* record */[
    /* index */match[1],
    /* buffer */meshRendererRecord[/* buffer */1],
    /* drawModes */meshRendererRecord[/* drawModes */2],
    /* isRenders */meshRendererRecord[/* isRenders */3],
    /* basicMaterialRenderGameObjectMap */meshRendererRecord[/* basicMaterialRenderGameObjectMap */4],
    /* lightMaterialRenderGameObjectMap */meshRendererRecord[/* lightMaterialRenderGameObjectMap */5],
    /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
    /* disposedIndexArray */match[2]
  ];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getMeshRendererCount(state[/* settingRecord */0]), /* tuple */[
              state,
              match[0]
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
