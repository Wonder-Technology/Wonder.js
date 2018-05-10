open StateDataMainType;

open MaterialType;

open LightMaterialType;

open Js.Typed_array;

open BufferLightMaterialService;

open OperateTypeArrayLightMaterialService;

let getRecord = ({lightMaterialRecord}) => lightMaterialRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData =
    (
      count: int,
      (defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShininess),
      (shaderIndices, diffuseColors, specularColors, shininess)
    ) =>
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((shaderIndices, diffuseColors, specularColors, shininess), index) => (
           [@bs] ShaderIndicesService.setShaderIndex(index, defaultShaderIndex, shaderIndices),
           setDiffuseColor(index, defaultDiffuseColor, diffuseColors),
           setSpecularColor(index, defaultSpecularColor, specularColors),
           setShininess(index, defaultShininess, shininess)
         )
       ),
       (shaderIndices, diffuseColors, specularColors, shininess)
     );

let _setDefaultTypeArrData =
    (
      count: int,
      (defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShininess),
      (buffer, shaderIndices, diffuseColors, specularColors, shininess)
    ) => (
  buffer,
  setDefaultTypeArrData(
    count,
    (defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShininess),
    (shaderIndices, diffuseColors, specularColors, shininess)
  )
);

let _initBufferData =
    (count, (defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShiness)) => {
  let buffer = createBuffer(count);
  let (shaderIndices, diffuseColors, specularColors, shininess) =
    CreateTypeArrayLightMaterialService.createTypeArrays(buffer, count);
  (buffer, shaderIndices, diffuseColors, specularColors, shininess)
  |> _setDefaultTypeArrData(
       count,
       (defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShiness)
     )
};

let create = ({settingRecord} as state) => {
  let lightMaterialDataBufferCount =
    BufferSettingService.getLightMaterialDataBufferCount(settingRecord);
  let defaultShaderIndex = DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDiffuseColor = [|1., 1., 1.|];
  let defaultSpecularColor = [|1., 1., 1.|];
  let defaultShininess = 32.0;
  let (buffer, (shaderIndices, diffuseColors, specularColors, shininess)) =
    _initBufferData(
      lightMaterialDataBufferCount,
      (defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShininess)
    );
  state.lightMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      materialArrayForWorkerInit: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};

let deepCopyForRestore = (state) => {
  let {
        index,
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        groupCountMap,
        gameObjectMap,
        disposedIndexArray,
        materialArrayForWorkerInit
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
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(index * getShaderIndicesSize()),
        diffuseColors:
          diffuseColors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getDiffuseColorsSize()),
        specularColors:
          specularColors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getSpecularColorsSize()),
        shininess:
          shininess
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getShininessSize()),
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit: materialArrayForWorkerInit |> Js.Array.copy
      })
  }
};