

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as IndexSourceTextureMainService$Wonderjs from "./IndexSourceTextureMainService.js";
import * as GroupBasicSourceTextureService$Wonderjs from "../../../record/main/texture/GroupBasicSourceTextureService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./basic_source/RecordBasicSourceTextureMainService.js";
import * as GroupArrayBufferViewSourceTextureService$Wonderjs from "../../../record/main/texture/GroupArrayBufferViewSourceTextureService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function addMaterial(materialData, texture, state) {
  var match = IndexSourceTextureMainService$Wonderjs.isBasicSourceTextureIndex(texture, state);
  if (match) {
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* basicSourceTextureRecord */18] = GroupBasicSourceTextureService$Wonderjs.addMaterial(materialData, texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state));
    return newrecord;
  } else {
    var match$1 = IndexSourceTextureMainService$Wonderjs.isArrayBufferViewSourceTextureIndex(texture, state);
    if (match$1) {
      var newrecord$1 = Caml_array.caml_array_dup(state);
      newrecord$1[/* arrayBufferViewSourceTextureRecord */19] = GroupArrayBufferViewSourceTextureService$Wonderjs.addMaterial(materialData, texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state));
      return newrecord$1;
    } else {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addMaterial", "unknown texture: " + (String(texture) + ""), "", "", ""));
    }
  }
}

function removeMaterial(materialData, texture, state) {
  var match = IndexSourceTextureMainService$Wonderjs.isBasicSourceTextureIndex(texture, state);
  if (match) {
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* basicSourceTextureRecord */18] = GroupBasicSourceTextureService$Wonderjs.removeMaterial(materialData, texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state));
    return newrecord;
  } else {
    var match$1 = IndexSourceTextureMainService$Wonderjs.isArrayBufferViewSourceTextureIndex(texture, state);
    if (match$1) {
      var newrecord$1 = Caml_array.caml_array_dup(state);
      newrecord$1[/* arrayBufferViewSourceTextureRecord */19] = GroupArrayBufferViewSourceTextureService$Wonderjs.removeMaterial(materialData, texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state));
      return newrecord$1;
    } else {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeMaterial", "unknown texture: " + (String(texture) + ""), "", "", ""));
    }
  }
}

export {
  addMaterial ,
  removeMaterial ,
  
}
/* Log-WonderLog Not a pure module */
