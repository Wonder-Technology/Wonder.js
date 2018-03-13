open StateDataType;

let getMaterialRecord = (state) => state.basicMaterialRecord;

let createGameObject = (state) => {
  open BasicMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let initMaterials = InitBasicMaterialService.init;

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  ShaderIndexBasicMaterialService.unsafeGetShaderIndex(materialIndex, state);

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  ShaderIndexBasicMaterialService.hasShaderIndex(materialIndex, state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  [@bs] ShaderIndexBasicMaterialService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataType.state) => {
  ...state,
  basicMaterialRecord:
    DisposeBasicMaterialService.handleDisposeComponent(material, state.basicMaterialRecord)
};

let initMaterial = (materialIndex, state) =>
  [@bs]
  InitBasicMaterialService.initMaterial(
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