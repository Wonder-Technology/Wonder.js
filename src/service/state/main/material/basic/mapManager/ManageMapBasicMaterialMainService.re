open StateDataMainType;

open BasicMaterialType;

let getMap = (material, {settingRecord} as state) => {
  let {textureIndices, mapUnits} =
    RecordBasicMaterialMainService.getRecord(state);
  ManagerMapMaterialMainService.getMap(
    material,
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    (
      OperateTypeArrayBasicMaterialService.getMapUnit,
      OperateTypeArrayBasicMaterialService.getTextureIndex,
    ),
    (textureIndices, mapUnits),
  );
};

let unsafeGetMap = (material, state) =>
  getMap(material, state) |> OptionService.unsafeGet;

let setMap = (material, texture, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.addMaterial(
         (material, MaterialType.BasicMaterial),
         texture,
       );

  let {textureIndices, mapUnits, emptyMapUnitArrayMap} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  let (textureIndices, mapUnits, emptyMapUnitArrayMap) =
    ManagerMapMaterialMainService.setMap(
      material,
      texture,
      (
        OperateTypeArrayBasicMaterialService.getMapUnit,
        OperateTypeArrayBasicMaterialService.setMapUnit,
        OperateTypeArrayBasicMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      ),
    );
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};

let hasMap = (material, state) =>
  getMap(material, state) |> Js.Option.isSome;

let removeMap = (material, {settingRecord} as state) => {
  let state =
    state
    |> GroupTextureMainService.removeMaterial(
         (material, MaterialType.BasicMaterial),
         unsafeGetMap(material, state),
       );

  let {textureIndices, mapUnits, emptyMapUnitArrayMap} as basicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(state);
  let (textureIndices, mapUnits, emptyMapUnitArrayMap) =
    ManagerMapMaterialMainService.removeMap(
      material,
      (
        OperateTypeArrayBasicMaterialService.getMapUnit,
        OperateTypeArrayBasicMaterialService.setMapUnit,
        OperateTypeArrayBasicMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      ),
    );
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};