open StateDataMainType;

open LightMaterialType;

let getDiffuseMap = (material, state) => {
  let {diffuseTextureIndices} =
    RecordLightMaterialMainService.getRecord(state);

  ManagerMapMaterialMainService.getMap(
    material,
    OperateTypeArrayLightMaterialService.getTextureIndex,
    diffuseTextureIndices,
  );
};

let unsafeGetDiffuseMap = (material, state) =>
  getDiffuseMap(material, state) |> OptionService.unsafeGet;

let setDiffuseMap = (material, texture, state) => {
  let state =
    state
    |> GroupTextureMainService.addMaterial(
         (material, MaterialType.LightMaterial),
         texture,
       );

  let {diffuseTextureIndices} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  let diffuseTextureIndices =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      OperateTypeArrayLightMaterialService.setTextureIndex,
      diffuseTextureIndices,
    );

  {
    ...state,
    lightMaterialRecord:
      Some({...lightMaterialRecord, diffuseTextureIndices}),
  };
};

let hasDiffuseMap = (material, state) =>
  getDiffuseMap(material, state) |> Js.Option.isSome;

let removeDiffuseMap = (material, state) => {
  let state =
    state
    |> GroupTextureMainService.removeMaterial(
         (material, MaterialType.LightMaterial),
         unsafeGetDiffuseMap(material, state),
       );

  let {diffuseTextureIndices} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  let diffuseTextureIndices =
    ManagerMapMaterialMainService.removeMap(
      material,
      OperateTypeArrayLightMaterialService.setTextureIndex,
      diffuseTextureIndices,
    );

  {
    ...state,
    lightMaterialRecord:
      Some({...lightMaterialRecord, diffuseTextureIndices}),
  };
};

let getSpecularMap = (material, state) => {
  let {specularTextureIndices} =
    RecordLightMaterialMainService.getRecord(state);

  ManagerMapMaterialMainService.getMap(
    material,
    OperateTypeArrayLightMaterialService.getTextureIndex,
    specularTextureIndices,
  );
};

let unsafeGetSpecularMap = (material, state) =>
  getSpecularMap(material, state) |> OptionService.unsafeGet;

let setSpecularMap = (material, texture, state) => {
  let state =
    state
    |> GroupTextureMainService.addMaterial(
         (material, MaterialType.LightMaterial),
         texture,
       );

  let {specularTextureIndices} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  let specularTextureIndices =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      OperateTypeArrayLightMaterialService.setTextureIndex,
      specularTextureIndices,
    );

  {
    ...state,
    lightMaterialRecord:
      Some({...lightMaterialRecord, specularTextureIndices}),
  };
};

let hasSpecularMap = (material, state) =>
  getSpecularMap(material, state) |> Js.Option.isSome;

let removeSpecularMap = (material, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.removeMaterial(
         (material, MaterialType.LightMaterial),
         unsafeGetSpecularMap(material, state),
       );

  let {specularTextureIndices} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  let specularTextureIndices =
    ManagerMapMaterialMainService.removeMap(
      material,
      OperateTypeArrayLightMaterialService.setTextureIndex,
      specularTextureIndices,
    );

  {
    ...state,
    lightMaterialRecord:
      Some({...lightMaterialRecord, specularTextureIndices}),
  };
};