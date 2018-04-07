open StateDataMainType;

open MaterialType;

open LightMaterialType;

open Js.Typed_array;

open BufferLightMaterialService;

open OperateTypeArrayLightMaterialService;

let getRecord = ({lightMaterialRecord}) => lightMaterialRecord |> OptionService.unsafeGet;

let _setDefaultTypeArrData =
    (
      count: int,
      defaultShaderIndex,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      (buffer, shaderIndices, diffuseColors, specularColors, shininess)
    ) => (
  buffer,
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
     )
);

let _initBufferData =
    (count, defaultShaderIndex, defaultDiffuseColor, defaultSpecularColor, defaultShiness) => {
  let buffer =
    ArrayBuffer.make(
      count
      * Uint32Array._BYTES_PER_ELEMENT
      * ShaderIndicesService.getShaderIndicesSize()
      + count
      * Float32Array._BYTES_PER_ELEMENT
      * (getDiffuseColorsSize() + getSpecularColorsSize() + getShininessSize())
    );
  let shaderIndices =
    Uint32Array.fromBufferRange(
      buffer,
      ~offset=ShaderIndicesService.getShaderIndicesOffset(count),
      ~length=ShaderIndicesService.getShaderIndicesLength(count)
    );
  let diffuseColors =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getDiffuseColorsOffset(count),
      ~length=getDiffuseColorsLength(count)
    );
  let specularColors =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getSpecularColorsOffset(count),
      ~length=getSpecularColorsLength(count)
    );
  let shininess =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getShininessOffset(count),
      ~length=getShininessLength(count)
    );
  (buffer, shaderIndices, diffuseColors, specularColors, shininess)
  |> _setDefaultTypeArrData(
       count,
       defaultShaderIndex,
       defaultDiffuseColor,
       defaultSpecularColor,
       defaultShiness
     )
};

let create = ({settingRecord} as state) => {
  let lightMaterialDataBufferCount =
    BufferSettingService.getLightMaterialDataBufferCount(settingRecord);
  /* let defaultShaderIndex = 0; */
  let defaultShaderIndex = DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDiffuseColor = [|1., 1., 1.|];
  let defaultSpecularColor = [|1., 1., 1.|];
  let defaultShininess = 32.0;
  let (buffer, (shaderIndices, diffuseColors, specularColors, shininess)) =
    _initBufferData(
      lightMaterialDataBufferCount,
      defaultShaderIndex,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess
    );
  state.lightMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      defaultShaderIndex,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
    index,
    buffer,
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    defaultShaderIndex,
    defaultDiffuseColor,
    defaultSpecularColor,
    defaultShininess,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getRecord;
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  let lightMaterialDataBufferCount =
    BufferSettingService.getLightMaterialDataBufferCount(settingRecord);
  {
    ...state,
    lightMaterialRecord:
      Some({
        index,
        buffer: copiedBuffer,
        shaderIndices,
        diffuseColors:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getDiffuseColorsOffset(lightMaterialDataBufferCount),
            getDiffuseColorsLength(lightMaterialDataBufferCount)
          ),
        specularColors:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getSpecularColorsOffset(lightMaterialDataBufferCount),
            getSpecularColorsLength(lightMaterialDataBufferCount)
          ),
        shininess:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getShininessOffset(lightMaterialDataBufferCount),
            getShininessLength(lightMaterialDataBufferCount)
          ),
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};