

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../../record/main/render/RenderObjectBufferTypeArrayService.js";
import * as CreateTypeArrayAllRenderObjectService$Wonderjs from "../../../record/all/renderObject/CreateTypeArrayAllRenderObjectService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicRenderObjectRecord */0]);
}

function _initBufferData(count) {
  var buffer = Worker$Wonderjs.newSharedArrayBuffer(Caml_int32.imul(count, Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, Caml_int32.imul(RenderObjectBufferTypeArrayService$Wonderjs.getComponentSize(/* () */0), 5))));
  return /* tuple */[
          buffer,
          CreateTypeArrayAllRenderObjectService$Wonderjs.setAllTypeArrDataToDefault(count, CreateTypeArrayAllRenderObjectService$Wonderjs.createTypeArrays(buffer, count))
        ];
}

function create(state) {
  var basicMaterialCount = BufferSettingService$Wonderjs.getBasicMaterialCount(state[/* settingRecord */0]);
  var match = _initBufferData(basicMaterialCount);
  var match$1 = match[1];
  return /* record */[
          /* buffer */match[0],
          /* renderIndexArray : array */[],
          /* transformIndices */match$1[0],
          /* materialIndices */match$1[1],
          /* meshRendererIndices */match$1[2],
          /* geometryIndices */match$1[3],
          /* sourceInstanceIndices */match$1[4]
        ];
}

export {
  getRecord ,
  _initBufferData ,
  create ,
  
}
/* Worker-Wonderjs Not a pure module */
