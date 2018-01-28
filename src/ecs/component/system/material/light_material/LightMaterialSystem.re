open MaterialType;

open LightMaterialType;

let create = (state: StateDataType.state) => [@bs] LightMaterialCreateCommon.create(state);

let unsafeGetDiffuseColor = (material, state: StateDataType.state) =>
  LightMaterialOperateCommon.unsafeGetDiffuseColor(material, state);

let setDiffuseColor = (material, color, state: StateDataType.state) =>
  LightMaterialOperateCommon.setDiffuseColor(material, color, state);

let unsafeGetSpecularColor = (material, state: StateDataType.state) =>
  LightMaterialOperateCommon.unsafeGetSpecularColor(material, state);

let setSpecularColor = (material, color, state: StateDataType.state) =>
  LightMaterialOperateCommon.setSpecularColor(material, color, state);

let init = (gl, state: StateDataType.state) => {
  let {index, disposedIndexArray} = LightMaterialStateCommon.getMaterialData(state);
  MaterialSystem.init(
    gl,
    (index, disposedIndexArray),
    LightMaterialInitComponentCommon.initMaterial,
    state
  )
};

let initMaterial = (material, gl, state: StateDataType.state) =>
  MaterialSystem.initMaterial(material, gl, LightMaterialInitComponentCommon.initMaterial, state);

let handleInitComponent = (gl, material, state: StateDataType.state) =>
  LightMaterialInitComponentCommon.handleInitComponent(gl, material, state);

let getGameObject = LightMaterialGameObjectCommon.getGameObject;

let getMaterialData = LightMaterialStateCommon.getMaterialData;

let deepCopyStateForRestore = LightMaterialStateCommon.deepCopyStateForRestore;

let restore = LightMaterialStateCommon.restore;

let isAlive = LightMaterialDisposeComponentCommon.isAlive;

let unsafeGetShaderIndex = LightMaterialShaderIndexCommon.unsafeGetShaderIndex;