

import * as List from "../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../../tool/service/texture/BasicSourceTextureTool.js";

function setSource(mapList, state) {
  return List.fold_left((function (state, map) {
                var source = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
                return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map, source, state);
              }), state, mapList);
}

export {
  setSource ,
  
}
/* BasicSourceTextureAPI-Wonderjs Not a pure module */
