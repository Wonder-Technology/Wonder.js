open MainStateDataType;

let getMaterialRecord = (state) => RecordBasicMaterialMainService.getRecord(state);

let createGameObject = (state) => {
  open BasicMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let getDefaultShaderIndex = (state) => getMaterialRecord(state).defaultShaderIndex;

let getDefaultColor = (state) => getMaterialRecord(state).defaultColor;

let initMaterials = InitBasicMaterialMainService.init;

let getShaderIndex = (materialIndex: int, state: MainStateDataType.state) =>
  ShaderIndexBasicMaterialMainService.getShaderIndex(materialIndex, state);

/* let hasShaderIndex = (materialIndex: int, state: MainStateDataType.state) =>
   ShaderIndexBasicMaterialMainService.hasShaderIndex(materialIndex, state); */
let setShaderIndex = (materialIndex: int, shaderIndex, state: MainStateDataType.state) =>
  [@bs] ShaderIndexBasicMaterialMainService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: MainStateDataType.state) => {
  ...state,
  basicMaterialRecord:
    Some(DisposeBasicMaterialService.handleDisposeComponent(material, getMaterialRecord(state)))
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
  let {disposedIndexArray} = getMaterialRecord(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupBasicMaterialService.getGroupCount(material, getMaterialRecord(state));