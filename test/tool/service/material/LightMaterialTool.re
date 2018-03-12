open StateDataType;

let getMaterialData = (state) => state.lightMaterialRecord;

let createGameObject = (state) => {
  open LightMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createLightMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let initMaterials = InitLightMaterialService.init;

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  ShaderIndexLightMaterialService.unsafeGetShaderIndex(materialIndex, state);

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  ShaderIndexLightMaterialService.hasShaderIndex(materialIndex, state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  [@bs] ShaderIndexLightMaterialService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataType.state) => {
  ...state,
  lightMaterialRecord:
    DisposeLightMaterialService.handleDisposeComponent(material, state.lightMaterialRecord)
};

let initMaterial = (materialIndex, state) =>
  [@bs]
  InitLightMaterialService.initMaterial(
    [@bs] DeviceManagerSystem.unsafeGetGl(state),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open LightMaterialType;
  let {disposedIndexArray} = state.lightMaterialRecord;
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupLightMaterialService.getGroupCount(material, state.lightMaterialRecord);