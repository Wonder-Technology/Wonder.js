open StateDataMainType;

open MaterialType;

open BasicMaterialType;

open Js.Typed_array;

open BufferBasicMaterialService;

open OperateTypeArrayBasicMaterialService;

let getRecord = ({basicMaterialRecord}) => basicMaterialRecord |> OptionService.unsafeGet;

let _setDefaultTypeArrData =
    (count: int, defaultShaderIndex, defaultColor, (buffer, shaderIndices, colors)) => (
  buffer,
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((shaderIndices, colors), index) => (
           [@bs] ShaderIndicesService.setShaderIndex(index, defaultShaderIndex, shaderIndices),
           setColor(index, defaultColor, colors)
         )
       ),
       (shaderIndices, colors)
     )
);

let _initBufferData = (count, defaultShaderIndex, defaultColor) => {
  let buffer =
    ArrayBuffer.make(
      count
      * Uint32Array._BYTES_PER_ELEMENT
      * ShaderIndicesService.getShaderIndicesSize()
      + count
      * Float32Array._BYTES_PER_ELEMENT
      * getColorsSize()
    );
  let (shaderIndices, colors) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(buffer, count);
  (buffer, shaderIndices, colors)
  |> _setDefaultTypeArrData(count, defaultShaderIndex, defaultColor)
};

let create = ({settingRecord} as state) => {
  let basicMaterialDataBufferCount =
    BufferSettingService.getBasicMaterialDataBufferCount(settingRecord);
  let defaultShaderIndex = DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultColor = [|1., 1., 1.|];
  let (buffer, (shaderIndices, colors)) =
    _initBufferData(basicMaterialDataBufferCount, defaultShaderIndex, defaultColor);
  state.basicMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      colors,
      defaultShaderIndex,
      defaultColor,
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
    colors,
    defaultShaderIndex,
    defaultColor,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getRecord;
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  let basicMaterialDataBufferCount =
    BufferSettingService.getBasicMaterialDataBufferCount(settingRecord);
  {
    ...state,
    basicMaterialRecord:
      Some({
        index,
        buffer: copiedBuffer,
        shaderIndices,
        colors:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getColorsOffset(basicMaterialDataBufferCount),
            getColorsLength(basicMaterialDataBufferCount)
          ),
        defaultShaderIndex,
        defaultColor,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};