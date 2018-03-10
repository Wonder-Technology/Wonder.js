let createGameObject = (state) => {
  open LightMaterial;
  open GameObject; open GameObjectAPI;
  let (state, material) = createLightMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let initMaterials = LightMaterialSystem.init;

let getMaterialData = (state: StateDataType.state) =>
  LightMaterialStateCommon.getMaterialData(state);

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  LightMaterialSystem.unsafeGetShaderIndex(materialIndex, state);

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  LightMaterialShaderIndexCommon.hasShaderIndex(materialIndex, state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  [@bs] LightMaterialShaderIndexCommon.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataType.state) =>
  LightMaterialDisposeComponentCommon.handleDisposeComponent(material, state);

let initMaterial = (materialIndex, state) =>
  [@bs]
  LightMaterialInitComponentCommon.initMaterial(
    [@bs] DeviceManagerSystem.unsafeGetGl(state),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open LightMaterialType;
  let {disposedIndexArray} = LightMaterialSystem.getMaterialData(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) => LightMaterialGroupCommon.getGroupCount(material, state);