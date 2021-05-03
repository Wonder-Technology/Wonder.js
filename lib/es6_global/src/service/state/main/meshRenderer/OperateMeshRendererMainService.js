

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as BufferMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/BufferMeshRendererService.js";
import * as GameObjectMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/GameObjectMeshRendererService.js";
import * as RecordMeshRendererMainService$Wonderjs from "./RecordMeshRendererMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/RenderArrayMeshRendererService.js";
import * as GetIsActiveGameObjectMainService$Wonderjs from "../gameObject/GetIsActiveGameObjectMainService.js";
import * as RenderArrayMeshRendererMainService$Wonderjs from "./RenderArrayMeshRendererMainService.js";
import * as OperateTypeArrayAllMeshRendererService$Wonderjs from "../../../record/all/meshRenderer/OperateTypeArrayAllMeshRendererService.js";

function getDrawMode(meshRenderer, state) {
  return OperateTypeArrayAllMeshRendererService$Wonderjs.getDrawMode(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state)[/* drawModes */2]);
}

function setDrawMode(meshRenderer, drawMode, state) {
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */24] = /* record */[
    /* index */meshRendererRecord[/* index */0],
    /* buffer */meshRendererRecord[/* buffer */1],
    /* drawModes */OperateTypeArrayAllMeshRendererService$Wonderjs.setDrawMode(meshRenderer, drawMode, meshRendererRecord[/* drawModes */2]),
    /* isRenders */meshRendererRecord[/* isRenders */3],
    /* basicMaterialRenderGameObjectMap */meshRendererRecord[/* basicMaterialRenderGameObjectMap */4],
    /* lightMaterialRenderGameObjectMap */meshRendererRecord[/* lightMaterialRenderGameObjectMap */5],
    /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
    /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */7]
  ];
  return newrecord;
}

function getIsRender(meshRenderer, state) {
  return OperateTypeArrayAllMeshRendererService$Wonderjs.getIsRender(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state)[/* isRenders */3]) === BufferMeshRendererService$Wonderjs.getRender(/* () */0);
}

function _removeFromRenderGameObjectMap(meshRenderer, meshRendererRecord) {
  return /* record */[
          /* index */meshRendererRecord[/* index */0],
          /* buffer */meshRendererRecord[/* buffer */1],
          /* drawModes */meshRendererRecord[/* drawModes */2],
          /* isRenders */meshRendererRecord[/* isRenders */3],
          /* basicMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.deleteVal(meshRenderer, meshRendererRecord[/* basicMaterialRenderGameObjectMap */4]),
          /* lightMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.deleteVal(meshRenderer, meshRendererRecord[/* lightMaterialRenderGameObjectMap */5]),
          /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
          /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */7]
        ];
}

function _setIsRender(meshRenderer, isRender, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var meshRendererRecord$1 = isRender ? RenderArrayMeshRendererMainService$Wonderjs.addToRenderGameObjectMap(meshRenderer, GameObjectMeshRendererService$Wonderjs.unsafeGetGameObject(meshRenderer, meshRendererRecord), meshRendererRecord, gameObjectRecord) : RenderArrayMeshRendererService$Wonderjs.removeFromRenderGameObjectMap(meshRenderer, meshRendererRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  var match = isRender === true;
  newrecord[/* meshRendererRecord */24] = /* record */[
    /* index */meshRendererRecord$1[/* index */0],
    /* buffer */meshRendererRecord$1[/* buffer */1],
    /* drawModes */meshRendererRecord$1[/* drawModes */2],
    /* isRenders */OperateTypeArrayAllMeshRendererService$Wonderjs.setIsRender(meshRenderer, match ? BufferMeshRendererService$Wonderjs.getRender(/* () */0) : BufferMeshRendererService$Wonderjs.getNotRender(/* () */0), meshRendererRecord$1[/* isRenders */3]),
    /* basicMaterialRenderGameObjectMap */meshRendererRecord$1[/* basicMaterialRenderGameObjectMap */4],
    /* lightMaterialRenderGameObjectMap */meshRendererRecord$1[/* lightMaterialRenderGameObjectMap */5],
    /* gameObjectMap */meshRendererRecord$1[/* gameObjectMap */6],
    /* disposedIndexArray */meshRendererRecord$1[/* disposedIndexArray */7]
  ];
  return newrecord;
}

function setIsRender(meshRenderer, isRender, state) {
  var match = isRender === getIsRender(meshRenderer, state);
  if (match) {
    return state;
  } else {
    var match$1 = GameObjectMeshRendererService$Wonderjs.getGameObject(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state));
    if (match$1 !== undefined) {
      var gameObject = match$1;
      var match$2 = !GetIsActiveGameObjectMainService$Wonderjs.unsafeGetIsActive(gameObject, state) && isRender;
      if (match$2) {
        Log$WonderLog.warn("meshRenderer:" + (String(meshRenderer) + (" -> gameObject:" + (String(gameObject) + " isn\'t active, can\'t set meshRenderer->isRender to true"))));
        return state;
      } else {
        return _setIsRender(meshRenderer, isRender, state);
      }
    } else {
      return _setIsRender(meshRenderer, isRender, state);
    }
  }
}

export {
  getDrawMode ,
  setDrawMode ,
  getIsRender ,
  _removeFromRenderGameObjectMap ,
  _setIsRender ,
  setIsRender ,
  
}
/* Log-WonderLog Not a pure module */
