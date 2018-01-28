open MaterialType;

open BasicMaterialType;

let create = (state: StateDataType.state) => [@bs] BasicMaterialCreateCommon.create(state);

let unsafeGetColor = (material, state: StateDataType.state) =>
  BasicMaterialOperateCommon.unsafeGetColor(material, state);

let setColor = (material, color, state: StateDataType.state) =>
  BasicMaterialOperateCommon.setColor(material, color, state);

let init = (gl, state: StateDataType.state) => {
  let {index, disposedIndexArray} = BasicMaterialStateCommon.getMaterialData(state);
  MaterialSystem.init(
    gl,
    (index, disposedIndexArray),
    BasicMaterialInitComponentCommon.initMaterial,
    state
  )
};

let initMaterial = (material, gl, state: StateDataType.state) =>
  MaterialSystem.initMaterial(material, gl, BasicMaterialInitComponentCommon.initMaterial, state);

let handleInitComponent = (gl, material, state: StateDataType.state) =>
  BasicMaterialInitComponentCommon.handleInitComponent(gl, material, state);

let getGameObject = BasicMaterialGameObjectCommon.getGameObject;

let getMaterialData = BasicMaterialStateCommon.getMaterialData;

let deepCopyStateForRestore = BasicMaterialStateCommon.deepCopyStateForRestore;

let restore = BasicMaterialStateCommon.restore;

let isAlive = BasicMaterialDisposeComponentCommon.isAlive;

let unsafeGetShaderIndex = BasicMaterialShaderIndexCommon.unsafeGetShaderIndex;