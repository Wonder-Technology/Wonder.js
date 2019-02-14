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
  ) =
    CreateTypeArrayLightMaterialService.createTypeArrays(
      buffer,
      lightMaterialCount,
      textureCountPerMaterial,
    );
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
     );
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex =
    DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDiffuseColor = [|1., 1., 1.|];
  let defaultSpecularColor = [|1., 1., 1.|];
  let defaultShininess = 32.0;
  let (
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
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      emptyMapUnitArrayMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      gameObjectsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      materialArrayForWorkerInit: WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

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
        shaderIndices:
          shaderIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index * getShaderIndicesSize(),
             ),
        diffuseColors:
          diffuseColors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getDiffuseColorsSize(),
             ),
        specularColors:
          specularColors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getSpecularColorsSize(),
             ),
        shininess:
          shininess
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getShininessSize(),
             ),
        textureIndices:
          textureIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index
               * BufferMaterialService.getTextureIndicesSize(
                   BufferSettingService.getTextureCountPerMaterial(
                     settingRecord,
                   ),
                 ),
             ),
        diffuseMapUnits:
          diffuseMapUnits
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMapUnitsSize(),
             ),
        specularMapUnits:
          specularMapUnits
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMapUnitsSize(),
             ),
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        emptyMapUnitArrayMap:
          emptyMapUnitArrayMap |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        gameObjectsMap:
          gameObjectsMap |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit |> Js.Array.copy,
      }),
  };
};