open MainStateDataType;

let getMaterialRecord = (state) => state.basicMaterialRecord;

let createGameObject = (state) => {
  open BasicMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let initMaterials = InitBasicMaterialMainService.init;

let unsafeGetShaderIndex = (materialIndex: int, state: MainStateDataType.state) =>
  ShaderIndexBasicMaterialMainService.unsafeGetShaderIndex(materialIndex, state);

let hasShaderIndex = (materialIndex: int, state: MainStateDataType.state) =>
  ShaderIndexBasicMaterialMainService.hasShaderIndex(materialIndex, state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: MainStateDataType.state) =>
  [@bs] ShaderIndexBasicMaterialMainService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: MainStateDataType.state) => {
  ...state,
  basicMaterialRecord:
    DisposeBasicMaterialService.handleDisposeComponent(material, state.basicMaterialRecord)
};

let initMaterial = (materialIndex, state) =>
  [@bs]
  InitBasicMaterialMainService.initMaterial(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open BasicMaterialType;
  let {disposedIndexArray} = state.basicMaterialRecord;
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupBasicMaterialService.getGroupCount(material, state.basicMaterialRecord);