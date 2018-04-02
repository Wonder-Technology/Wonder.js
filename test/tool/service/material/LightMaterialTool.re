open MainStateDataType;

let getMaterialRecord = (state) => RecordLightMaterialMainService.getRecord(state);

let createGameObject = (state) => {
  open LightMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createLightMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let getDefaultShaderIndex = (state) => getMaterialRecord(state).defaultShaderIndex;

let getDefaultDiffuseColor = (state) => getMaterialRecord(state).defaultDiffuseColor;

let getDefaultSpecularColor = (state) => getMaterialRecord(state).defaultSpecularColor;

let getDefaultShininess = (state) => getMaterialRecord(state).defaultShininess;

let initMaterials = InitLightMaterialMainService.init;

let getShaderIndex = (materialIndex: int, state: MainStateDataType.state) =>
  ShaderIndexLightMaterialMainService.getShaderIndex(materialIndex, state);

/* let hasShaderIndex = (materialIndex: int, state: MainStateDataType.state) =>
   ShaderIndexLightMaterialMainService.hasShaderIndex(materialIndex, state); */
let setShaderIndex = (materialIndex: int, shaderIndex, state: MainStateDataType.state) =>
  [@bs] ShaderIndexLightMaterialMainService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: MainStateDataType.state) => {
  ...state,
  lightMaterialRecord:
    Some(DisposeLightMaterialService.handleDisposeComponent(material, getMaterialRecord(state)))
};

let initMaterial = (materialIndex, state) =>
  [@bs]
  InitLightMaterialMainService.initMaterial(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open LightMaterialType;
  let {disposedIndexArray} = getMaterialRecord(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupLightMaterialService.getGroupCount(material, getMaterialRecord(state));