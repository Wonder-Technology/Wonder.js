open StateDataMainType;

open LightMaterialType;

let getDiffuseMap = (material, {settingRecord} as state) => {
  let {textureIndices, diffuseMapUnits} =
    RecordLightMaterialMainService.getRecord(state);
  ManagerMapMaterialMainService.getMap(
    material,
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    (
      OperateTypeArrayLightMaterialService.getDiffuseMapUnit,
      OperateTypeArrayLightMaterialService.getTextureIndex,
    ),
    (textureIndices, diffuseMapUnits),
  );
};

let unsafeGetDiffuseMap = (material, {settingRecord} as state) =>
  getDiffuseMap(material, state) |> OptionService.unsafeGet;

let setDiffuseMap = (material, texture, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.addMaterial(
         (material, MaterialType.LightMaterial),
         texture,
       );

  let {textureIndices, diffuseMapUnits, emptyMapUnitArrayMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, diffuseMapUnits, emptyMapUnitArrayMap) =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      (
        OperateTypeArrayLightMaterialService.getDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        diffuseMapUnits,
        emptyMapUnitArrayMap,
        /* (basicSourceTextureRecord, arrayBufferViewSourceTextureRecord), */
      ),
    );
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        textureIndices,
        diffuseMapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};

let hasDiffuseMap = (material, {settingRecord} as state) =>
  getDiffuseMap(material, state) |> Js.Option.isSome;

let removeDiffuseMap = (material, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.removeMaterial(
         (material, MaterialType.LightMaterial),
         unsafeGetDiffuseMap(material, state),
       );

  let {textureIndices, diffuseMapUnits, emptyMapUnitArrayMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, diffuseMapUnits, emptyMapUnitArrayMap) =
    ManagerMapMaterialMainService.removeMap(
      material,
      (
        OperateTypeArrayLightMaterialService.getDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        diffuseMapUnits,
        emptyMapUnitArrayMap,
      ),
    );
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        textureIndices,
        diffuseMapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};

let getSpecularMap = (material, {settingRecord} as state) => {
  let {textureIndices, specularMapUnits} =
    RecordLightMaterialMainService.getRecord(state);
  ManagerMapMaterialMainService.getMap(
    material,
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    (
      OperateTypeArrayLightMaterialService.getSpecularMapUnit,
      OperateTypeArrayLightMaterialService.getTextureIndex,
    ),
    (textureIndices, specularMapUnits),
  );
};

let unsafeGetSpecularMap = (material, {settingRecord} as state) =>
  getSpecularMap(material, state) |> OptionService.unsafeGet;

let setSpecularMap = (material, texture, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.addMaterial(
         (material, MaterialType.LightMaterial),
         texture,
       );

  let {textureIndices, specularMapUnits, emptyMapUnitArrayMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, specularMapUnits, emptyMapUnitArrayMap) =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      (
        OperateTypeArrayLightMaterialService.getSpecularMapUnit,
        OperateTypeArrayLightMaterialService.setSpecularMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        specularMapUnits,
        emptyMapUnitArrayMap,
      ),
    );

  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        textureIndices,
        specularMapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};

let hasSpecularMap = (material, {settingRecord} as state) =>
  getSpecularMap(material, state) |> Js.Option.isSome;

let removeSpecularMap = (material, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.removeMaterial(
         (material, MaterialType.LightMaterial),
         unsafeGetDiffuseMap(material, state),
       );

  let {textureIndices, specularMapUnits, emptyMapUnitArrayMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, specularMapUnits, emptyMapUnitArrayMap) =
    ManagerMapMaterialMainService.removeMap(
      material,
      (
        OperateTypeArrayLightMaterialService.getSpecularMapUnit,
        OperateTypeArrayLightMaterialService.setSpecularMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        specularMapUnits,
        emptyMapUnitArrayMap,
      ),
    );
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        textureIndices,
        specularMapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};