open StateDataMainType;

open MaterialType;

open LightMaterialType;

open Js.Typed_array;

open BufferLightMaterialService;

open OperateTypeArrayLightMaterialService;

let getRecord = ({lightMaterialRecord}) =>
  lightMaterialRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      lightMaterialCount: int,
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
      ),
      (
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        textureIndices,
        diffuseMapUnits,
        specularMapUnits,
      ),
    ) => {
  let defaultUnit = MapUnitService.getDefaultUnit();
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    diffuseMapUnits,
    specularMapUnits,
  ) =
    WonderCommonlib.ArrayService.range(0, lightMaterialCount - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             shaderIndices,
             diffuseColors,
             specularColors,
             shininess,
             diffuseMapUnits,
             specularMapUnits,
           ),
           index,
         ) => (
           ShaderIndicesService.setShaderIndex(.
             index,
             defaultShaderIndex,
             shaderIndices,
           ),
           setDiffuseColor(index, defaultDiffuseColor, diffuseColors),
           setSpecularColor(index, defaultSpecularColor, specularColors),
           setShininess(index, defaultShininess, shininess),
           setDiffuseMapUnit(. index, defaultUnit, diffuseMapUnits),
           setSpecularMapUnit(. index, defaultUnit, specularMapUnits),
         ),
         (
           shaderIndices,
           diffuseColors,
           specularColors,
           shininess,
           diffuseMapUnits,
           specularMapUnits,
         ),
       );
  (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    textureIndices |> Js.Typed_array.Uint32Array.fillInPlace(0),
    diffuseMapUnits,
    specularMapUnits,
  );
};

let _setAllTypeArrDataToDefault =
    (
      lightMaterialCount: int,
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
      ),
      (
        buffer,
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        textureIndices,
        diffuseMapUnits,
        specularMapUnits,
      ),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    lightMaterialCount,
    (
      defaultShaderIndex,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
    ),
    (
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      textureIndices,
      diffuseMapUnits,
      specularMapUnits,
    ),
  ),
);

let _initBufferData =
    (
      lightMaterialCount,
      textureCountPerMaterial,
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShiness,
      ),
    ) => {
  let buffer = createBuffer(lightMaterialCount, textureCountPerMaterial);
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    textureIndices,
    diffuseMapUnits,
    specularMapUnits,
    copiedShaderIndices,
    copiedDiffuseColors,
    copiedSpecularColors,
    copiedShininess,
    copiedTextureIndices,
    copiedDiffuseMapUnits,
    copiedSpecularMapUnits,
  ) =
    CreateTypeArrayLightMaterialService.createTypeArrays(
      buffer,
      lightMaterialCount,
      textureCountPerMaterial,
    );

  (
    (
      buffer,
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      textureIndices,
      diffuseMapUnits,
      specularMapUnits,
    )
    |> _setAllTypeArrDataToDefault(
         lightMaterialCount,
         (
           defaultShaderIndex,
           defaultDiffuseColor,
           defaultSpecularColor,
           defaultShiness,
         ),
       ),
    copiedShaderIndices,
    copiedDiffuseColors,
    copiedSpecularColors,
    copiedShininess,
    copiedTextureIndices,
    copiedDiffuseMapUnits,
    copiedSpecularMapUnits,
  );
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex =
    DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDiffuseColor = [|1., 1., 1.|];
  let defaultSpecularColor = [|1., 1., 1.|];
  let defaultShininess = 32.0;
  let (
    (
      buffer,
      (
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        textureIndices,
        diffuseMapUnits,
        specularMapUnits,
      ),
    ),
    copiedShaderIndices,
    copiedDiffuseColors,
    copiedSpecularColors,
    copiedShininess,
    copiedTextureIndices,
    copiedDiffuseMapUnits,
    copiedSpecularMapUnits,
  ) =
    _initBufferData(
      BufferSettingService.getLightMaterialCount(settingRecord),
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
      ),
    );
  state.lightMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      textureIndices,
      diffuseMapUnits,
      specularMapUnits,
      copiedShaderIndices,
      copiedDiffuseColors,
      copiedSpecularColors,
      copiedShininess,
      copiedTextureIndices,
      copiedDiffuseMapUnits,
      copiedSpecularMapUnits,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      nameMap: WonderCommonlib.SparseMapService.createEmpty(),
      emptyMapUnitArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectsMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      materialArrayForWorkerInit: WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

let _fillToCopiedIndices = (sourceData, copiedData, endIndex) => {
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (copiedData, 0),
    (sourceData, 0),
    endIndex,
  )
  |> ignore;

  copiedData;
};

let _fillToCopiedColors = (sourceData, copiedData, endIndex) => {
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (copiedData, 0),
    (sourceData, 0),
    endIndex,
  )
  |> ignore;

  copiedData;
};

let _fillToMapUnits = (sourceData, copiedData, endIndex) => {
  TypeArrayService.fillUint8ArrayWithUint8Array(
    (copiedData, 0),
    (sourceData, 0),
    endIndex,
  )
  |> ignore;

  copiedData;
};

let _fillToFloat32Values = (sourceData, copiedData, endIndex) => {
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (copiedData, 0),
    (sourceData, 0),
    endIndex,
  )
  |> ignore;

  copiedData;
};

let getShaderIndicesEndIndex = index => index * getShaderIndicesSize();

let getDiffuseColorsEndIndex = index => index * getDiffuseColorsSize();

let getSpecularColorsEndIndex = index => index * getSpecularColorsSize();

let getShininessEndIndex = index => index * getShininessSize();

let getMapUnitsEndIndex = index => index * getMapUnitsSize();

let getTextureIndicesEndIndex = (settingRecord, index) =>
  index
  * BufferMaterialService.getTextureIndicesSize(
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
    );

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        textureIndices,
        diffuseMapUnits,
        specularMapUnits,
        copiedShaderIndices,
        copiedDiffuseColors,
        copiedSpecularColors,
        copiedShininess,
        copiedTextureIndices,
        copiedDiffuseMapUnits,
        copiedSpecularMapUnits,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap,
        emptyMapUnitArrayMap,
        gameObjectsMap,
        disposedIndexArray,
        materialArrayForWorkerInit,
      } as record =
    state |> getRecord;
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...record,
        index,
        copiedShaderIndices:
          _fillToCopiedIndices(
            shaderIndices,
            copiedShaderIndices,
            getShaderIndicesEndIndex(index),
          ),
        copiedDiffuseColors:
          _fillToCopiedColors(
            diffuseColors,
            copiedDiffuseColors,
            getDiffuseColorsEndIndex(index),
          ),
        copiedSpecularColors:
          _fillToCopiedColors(
            specularColors,
            copiedSpecularColors,
            getSpecularColorsEndIndex(index),
          ),
        copiedShininess:
          _fillToFloat32Values(
            shininess,
            copiedShininess,
            getShininessEndIndex(index),
          ),
        copiedTextureIndices:
          _fillToCopiedIndices(
            textureIndices,
            copiedTextureIndices,
            getTextureIndicesEndIndex(settingRecord, index),
          ),
        copiedDiffuseMapUnits:
          _fillToMapUnits(
            diffuseMapUnits,
            copiedDiffuseMapUnits,
            getMapUnitsEndIndex(index),
          ),
        copiedSpecularMapUnits:
          _fillToMapUnits(
            specularMapUnits,
            copiedSpecularMapUnits,
            getMapUnitsEndIndex(index),
          ),
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap: nameMap |> SparseMapService.copy,
        emptyMapUnitArrayMap:
          emptyMapUnitArrayMap |> CopyTypeArrayService.deepCopyArrayArray,
        gameObjectsMap:
          gameObjectsMap |> CopyTypeArrayService.deepCopyArrayArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit |> Js.Array.copy,
      }),
  };
};