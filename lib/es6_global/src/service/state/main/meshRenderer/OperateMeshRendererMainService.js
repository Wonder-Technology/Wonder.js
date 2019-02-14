

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BufferMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/BufferMeshRendererService.js";
import * as GameObjectMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/GameObjectMeshRendererService.js";
import * as RecordMeshRendererMainService$Wonderjs from "./RecordMeshRendererMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/RenderArrayMeshRendererService.js";
import * as RenderArrayMeshRendererMainService$Wonderjs from "./RenderArrayMeshRendererMainService.js";
import * as OperateTypeArrayMeshRendererService$Wonderjs from "../../../record/all/meshRenderer/OperateTypeArrayMeshRendererService.js";

function getDrawMode(meshRenderer, state) {
  return OperateTypeArrayMeshRendererService$Wonderjs.getDrawMode(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state)[/* drawModes */2]);
}

function setDrawMode(meshRenderer, drawMode, state) {
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */23] = /* record */[
    /* index */meshRendererRecord[/* index */0],
    /* buffer */meshRendererRecord[/* buffer */1],
    /* drawModes */OperateTypeArrayMeshRendererService$Wonderjs.setDrawMode(meshRenderer, drawMode, meshRendererRecord[/* drawModes */2]),
    /* isRenders */meshRendererRecord[/* isRenders */3],
    /* basicMaterialRenderGameObjectMap */meshRendererRecord[/* basicMaterialRenderGameObjectMap */4],
    /* lightMaterialRenderGameObjectMap */meshRendererRecord[/* lightMaterialRenderGameObjectMap */5],
    /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
    /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */7]
  ];
  return newrecord;
}

function getIsRender(meshRenderer, state) {
  return OperateTypeArrayMeshRendererService$Wonderjs.getIsRender(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state)[/* isRenders */3]) === BufferMeshRendererService$Wonderjs.getRender(/* () */0);
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

function setIsRender(meshRenderer, isRender, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = isRender === getIsRender(meshRenderer, state);
  if (match) {
    return state;
  } else {
    var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
    var meshRendererRecord$1 = isRender ? RenderArrayMeshRendererMainService$Wonderjs.addToRenderGameObjectMap(meshRenderer, GameObjectMeshRendererService$Wonderjs.unsafeGetGameObject(meshRenderer, meshRendererRecord), meshRendererRecord, gameObjectRecord) : RenderArrayMeshRendererService$Wonderjs.removeFromRenderGameObjectMap(meshRenderer, meshRendererRecord);
    var newrecord = Caml_array.caml_array_dup(state);
    var match$1 = isRender === true;
    newrecord[/* meshRendererRecord */23] = /* record */[
      /* index */meshRendererRecord$1[/* index */0],
      /* buffer */meshRendererRecord$1[/* buffer */1],
      /* drawModes */meshRendererRecord$1[/* drawModes */2],
      /* isRenders */OperateTypeArrayMeshRendererService$Wonderjs.setIsRender(meshRenderer, match$1 ? BufferMeshRendererService$Wonderjs.getRender(/* () */0) : BufferMeshRendererService$Wonderjs.getNotRender(/* () */0), meshRendererRecord$1[/* isRenders */3]),
      /* basicMaterialRenderGameObjectMap */meshRendererRecord$1[/* basicMaterialRenderGameObjectMap */4],
      /* lightMaterialRenderGameObjectMap */meshRendererRecord$1[/* lightMaterialRenderGameObjectMap */5],
      /* gameObjectMap */meshRendererRecord$1[/* gameObjectMap */6],
      /* disposedIndexArray */meshRendererRecord$1[/* disposedIndexArray */7]
    ];
    return newrecord;
  }
}

export {
  getDrawMode ,
  setDrawMode ,
  getIsRender ,
  _removeFromRenderGameObjectMap ,
  setIsRender ,
  
}
/* BufferMeshRendererService-Wonderjs Not a pure module */
