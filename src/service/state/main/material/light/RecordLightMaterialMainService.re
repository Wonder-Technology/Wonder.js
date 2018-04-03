open MainStateDataType;

open MaterialType;

open LightMaterialType;

open Js.Typed_array;

let getRecord = ({lightMaterialRecord}) => lightMaterialRecord |> OptionService.unsafeGet;

let getDiffuseColorsSize = () => 3;

let getDiffuseColorsLength = (count) => count * getDiffuseColorsSize();

let getDiffuseColorsOffset = (count) =>
  ShaderIndicesService.getShaderIndicesLength(count) * Uint32Array._BYTES_PER_ELEMENT;

let getSpecularColorsSize = () => 3;

let getSpecularColorsLength = (count) => count * getSpecularColorsSize();

let getSpecularColorsOffset = (count) =>
  /* ShaderIndicesService.getShaderIndicesLength(count)
   * Uint32Array._BYTES_PER_ELEMENT */
  getDiffuseColorsOffset(count) + getDiffuseColorsLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getShininessSize = () => 1;

let getShininessLength = (count) => count * getShininessSize();

let getShininessOffset = (count) =>
  /* ShaderIndicesService.getShaderIndicesLength(count)
   * Uint32Array._BYTES_PER_ELEMENT
   + getDiffuseColorsLength(count)
   * Float32Array._BYTES_PER_ELEMENT */
  getSpecularColorsOffset(count) + getSpecularColorsLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getDiffuseColorIndex = (index) => index * getDiffuseColorsSize();

let getSpecularColorIndex = (index) => index * getSpecularColorsSize();

let getShininessIndex = (index) => index * getShininessSize();

let getDiffuseColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getDiffuseColorIndex(index), typeArr);

let setDiffuseColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getDiffuseColorIndex(index), data, typeArr);

let getSpecularColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getSpecularColorIndex(index), typeArr);

let setSpecularColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getSpecularColorIndex(index), data, typeArr);

let getShininess = (index, typeArr) =>
  TypeArrayService.getFloat1(getShininessIndex(index), typeArr);

let setShininess = (index, data, typeArr) =>
  TypeArrayService.setFloat1(getShininessIndex(index), data, typeArr);

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
           ShaderIndicesService.setShaderIndex(index, defaultShaderIndex, shaderIndices),
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