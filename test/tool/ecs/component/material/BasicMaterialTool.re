let createGameObject = (state) => {
  open BasicMaterial;
  open GameObject; open GameObjectAPI;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let initMaterials = BasicMaterialSystem.init;

let getMaterialData = (state: StateDataType.state) =>
  BasicMaterialStateCommon.getMaterialData(state);

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  BasicMaterialSystem.unsafeGetShaderIndex(materialIndex, state);

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  BasicMaterialShaderIndexCommon.hasShaderIndex(materialIndex, state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  [@bs] BasicMaterialShaderIndexCommon.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataType.state) =>
  BasicMaterialDisposeComponentCommon.handleDisposeComponent(material, state);

let initMaterial = (materialIndex, state) =>
  [@bs]
  BasicMaterialInitComponentCommon.initMaterial(
    [@bs] DeviceManagerSystem.unsafeGetGl(state),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open BasicMaterialType;
  let {disposedIndexArray} = BasicMaterialSystem.getMaterialData(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) => BasicMaterialGroupCommon.getGroupCount(material, state);