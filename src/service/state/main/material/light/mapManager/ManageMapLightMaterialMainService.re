open StateDataMainType;

open LightMaterialType;

/* TODO duplicate:
   1.diffuse, specular map
   2.with basic material
   */
let getDiffuseMap = (material, {settingRecord} as state) => {
  let {textureIndices, diffuseMapUnits} = RecordLightMaterialMainService.getRecord(state);
  let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
  let mapUnit = OperateTypeArrayLightMaterialService.getDiffuseMapUnit(material, diffuseMapUnits);
  MapUnitService.hasMap(mapUnit) ?
    Some(
      OperateTypeArrayLightMaterialService.getTextureIndex(
        (material, mapUnit, textureCountPerMaterial),
        textureIndices
      )
    ) :
    None
};

let unsafeGetDiffuseMap = (material, {settingRecord} as state) =>
  getDiffuseMap(material, state) |> OptionService.unsafeGet;

let setDiffuseMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, diffuseMapUnits, textureCountMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
  let mapUnit = OperateTypeArrayLightMaterialService.getDiffuseMapUnit(material, diffuseMapUnits);
  MapUnitService.hasMap(mapUnit) ?
    {
      ...state,
      lightMaterialRecord:
        Some({
          ...lightMaterialRecord,
          textureIndices:
            OperateTypeArrayLightMaterialService.setTextureIndex(
              (material, mapUnit, textureCountPerMaterial),
              texture,
              textureIndices
            )
        })
    } :
    {
      let mapCount = TextureCountMapMaterialService.unsafeGetCount(material, textureCountMap);
      {
        ...state,
        lightMaterialRecord:
          Some({
            ...lightMaterialRecord,
            textureIndices:
              OperateTypeArrayLightMaterialService.setTextureIndex(
                (material, mapCount, textureCountPerMaterial),
                texture,
                textureIndices
              ),
            diffuseMapUnits:
              OperateTypeArrayLightMaterialService.setDiffuseMapUnit(
                material,
                mapCount,
                diffuseMapUnits
              ),
            textureCountMap:
              textureCountMap
              |> TextureCountMapMaterialService.setCount(material, mapCount |> succ)
          })
      }
    }
};

let getSpecularMap = (material, {settingRecord} as state) => {
  let {textureIndices, specularMapUnits} = RecordLightMaterialMainService.getRecord(state);
  let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
  let mapUnit =
    OperateTypeArrayLightMaterialService.getSpecularMapUnit(material, specularMapUnits);
  MapUnitService.hasMap(mapUnit) ?
    Some(
      OperateTypeArrayLightMaterialService.getTextureIndex(
        (material, mapUnit, textureCountPerMaterial),
        textureIndices
      )
    ) :
    None
};

let unsafeGetSpecularMap = (material, {settingRecord} as state) =>
  getSpecularMap(material, state) |> OptionService.unsafeGet;

let setSpecularMap = (material, texture, {settingRecord} as state) => {
  let {textureIndices, specularMapUnits, textureCountMap} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
  let mapUnit =
    OperateTypeArrayLightMaterialService.getSpecularMapUnit(material, specularMapUnits);
  MapUnitService.hasMap(mapUnit) ?
    {
      ...state,
      lightMaterialRecord:
        Some({
          ...lightMaterialRecord,
          textureIndices:
            OperateTypeArrayLightMaterialService.setTextureIndex(
              (material, mapUnit, textureCountPerMaterial),
              texture,
              textureIndices
            )
        })
    } :
    {
      let mapCount = TextureCountMapMaterialService.unsafeGetCount(material, textureCountMap);
      {
        ...state,
        lightMaterialRecord:
          Some({
            ...lightMaterialRecord,
            textureIndices:
              OperateTypeArrayLightMaterialService.setTextureIndex(
                (material, mapCount, textureCountPerMaterial),
                texture,
                textureIndices
              ),
            specularMapUnits:
              OperateTypeArrayLightMaterialService.setSpecularMapUnit(
                material,
                mapCount,
                specularMapUnits
              ),
            textureCountMap:
              textureCountMap
              |> TextureCountMapMaterialService.setCount(material, mapCount |> succ)
          })
      }
    }
};