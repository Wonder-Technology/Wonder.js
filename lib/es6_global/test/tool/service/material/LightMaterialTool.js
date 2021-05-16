

import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as GameObjectTool$Wonderjs from "../gameObject/GameObjectTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../src/api/material/LightMaterialAPI.js";
import * as TextureIndexService$Wonderjs from "../../../../src/service/primitive/material/TextureIndexService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../src/service/primitive/material/ShaderIndicesService.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../texture/BasicSourceTextureTool.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../../src/service/state/main/instance/JudgeInstanceMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../src/service/primitive/buffer/DefaultTypeArrayValueService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../../src/service/state/init_shader/init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as InitLightMaterialMainService$Wonderjs from "../../../../src/service/state/main/material/light/InitLightMaterialMainService.js";
import * as BufferAllLightMaterialService$Wonderjs from "../../../../src/service/record/all/material/light/BufferAllLightMaterialService.js";
import * as GameObjectLightMaterialService$Wonderjs from "../../../../src/service/record/main/material/light/GameObjectLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../../src/service/state/main/material/light/RecordLightMaterialMainService.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../texture/ArrayBufferViewSourceTextureTool.js";
import * as ShaderIndexLightMaterialMainService$Wonderjs from "../../../../src/service/state/main/material/light/ShaderIndexLightMaterialMainService.js";
import * as CreateInitLightMaterialStateMainService$Wonderjs from "../../../../src/service/state/main/material/light/CreateInitLightMaterialStateMainService.js";

var getRecord = RecordLightMaterialMainService$Wonderjs.getRecord;

function createGameObject(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function createGameObjectWithShareMaterial(material, state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function setMaps(material, diffuseMap, specularMap, state) {
  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, diffuseMap, state);
  var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, specularMap, state$1);
  return /* tuple */[
          state$2,
          /* tuple */[
            diffuseMap,
            specularMap
          ]
        ];
}

function createAndSetMaps(material, state) {
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  return setMaps(material, match[1], match$1[1], match$1[0]);
}

function createAndSetArrayBufferViewMaps(material, state) {
  var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
  var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
  return setMaps(material, match[1], match$1[1], match$1[0]);
}

function createMaterialWithDiffuseMap(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  var diffuseMap = match$1[1];
  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, diffuseMap, match$1[0]);
  var source1 = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(diffuseMap, source1, state$1);
  return /* tuple */[
          state$2,
          material,
          /* tuple */[
            diffuseMap,
            source1
          ]
        ];
}

function createMaterialWithMap(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = createAndSetMaps(material, match[0]);
  var match$2 = match$1[1];
  var specularMap = match$2[1];
  var diffuseMap = match$2[0];
  var source1 = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
  var source2 = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(diffuseMap, source1, match$1[0]);
  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(specularMap, source2, state$1);
  return /* tuple */[
          state$2,
          material,
          /* tuple */[
            diffuseMap,
            specularMap,
            source1,
            source2
          ]
        ];
}

function createMaterialWithArrayBufferViewDiffuseMap(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
  var texture = match$1[1];
  var source = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
  var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(texture, source, match$1[0]);
  var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, state$1);
  return /* tuple */[
          state$2,
          material,
          /* tuple */[
            texture,
            source
          ]
        ];
}

function createMaterialWithArrayBufferViewMap(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = createAndSetArrayBufferViewMaps(material, match[0]);
  var match$2 = match$1[1];
  var specularMap = match$2[1];
  var diffuseMap = match$2[0];
  var source1 = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
  var source2 = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource2(/* () */0);
  var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(diffuseMap, source1, match$1[0]);
  var state$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(specularMap, source2, state$1);
  return /* tuple */[
          state$2,
          material,
          /* tuple */[
            diffuseMap,
            specularMap,
            source1,
            source2
          ]
        ];
}

function createGameObjectWithDiffuseMap(state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var match$1 = createMaterialWithDiffuseMap(match[0]);
  var match$2 = match$1[2];
  var material = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1),
          /* tuple */[
            material,
            /* tuple */[
              match$2[0],
              match$2[1]
            ]
          ]
        ];
}

function createGameObjectWithMap(state) {
  var match = createGameObject(state);
  var material = match[2];
  var match$1 = createAndSetMaps(material, match[0]);
  var match$2 = match$1[1];
  return /* tuple */[
          match$1[0],
          match[1],
          /* tuple */[
            material,
            /* tuple */[
              match$2[0],
              match$2[1]
            ]
          ]
        ];
}

function createGameObjectWithMaterial(material, state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function getDefaultShaderIndex(state) {
  return DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
}

function getDefaultDiffuseColor(state) {
  return RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* defaultDiffuseColor */8];
}

function getDefaultSpecularColor(state) {
  return RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* defaultSpecularColor */9];
}

function getDefaultShininess(state) {
  return RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* defaultShininess */10];
}

function initMaterials(gl, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitLightMaterialService$Wonderjs.init(gl, /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */11], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */12]
          ], state));
  return state;
}

function getShaderIndex(materialIndex, state) {
  return ShaderIndicesService$Wonderjs.getShaderIndex(materialIndex, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* shaderIndices */2]);
}

function setShaderIndex(materialIndex, shaderIndex, state) {
  return ShaderIndexLightMaterialMainService$Wonderjs.setShaderIndex(materialIndex, shaderIndex, state);
}

function dispose(material, state) {
  return GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(-1, material, state);
}

var initMaterial = InitLightMaterialMainService$Wonderjs.handleInitComponent;

function isMaterialDisposed(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return match[/* disposedIndexArray */12].includes(material);
}

function getDiffuseTextureIndicesIndex(material, state) {
  return BufferAllLightMaterialService$Wonderjs.getDiffuseTextureIndicesIndex(material);
}

function getSpecularTextureIndicesIndex(material, state) {
  return BufferAllLightMaterialService$Wonderjs.getSpecularTextureIndicesIndex(material);
}

function getDefaultTextureIndex(param) {
  return TextureIndexService$Wonderjs.getDefaultTextureIndex(/* () */0);
}

function hasGameObject(material, state) {
  var match = GameObjectLightMaterialService$Wonderjs.getGameObjects(material, RecordLightMaterialMainService$Wonderjs.getRecord(state));
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function isNeedInitMaterial(material, state) {
  return InitInitLightMaterialService$Wonderjs.isNeedInitMaterial(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* shaderIndices */2]);
}

function disposeLightMaterial(material, state) {
  return LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[material], state);
}

export {
  getRecord ,
  createGameObject ,
  createGameObjectWithShareMaterial ,
  setMaps ,
  createAndSetMaps ,
  createAndSetArrayBufferViewMaps ,
  createMaterialWithDiffuseMap ,
  createMaterialWithMap ,
  createMaterialWithArrayBufferViewDiffuseMap ,
  createMaterialWithArrayBufferViewMap ,
  createGameObjectWithDiffuseMap ,
  createGameObjectWithMap ,
  createGameObjectWithMaterial ,
  getDefaultShaderIndex ,
  getDefaultDiffuseColor ,
  getDefaultSpecularColor ,
  getDefaultShininess ,
  initMaterials ,
  getShaderIndex ,
  setShaderIndex ,
  dispose ,
  initMaterial ,
  isMaterialDisposed ,
  getDiffuseTextureIndicesIndex ,
  getSpecularTextureIndicesIndex ,
  getDefaultTextureIndex ,
  hasGameObject ,
  isNeedInitMaterial ,
  disposeLightMaterial ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
