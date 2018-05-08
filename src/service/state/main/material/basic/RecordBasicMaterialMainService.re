open StateDataMainType;

open MaterialType;

open BasicMaterialType;

open Js.Typed_array;

open BufferBasicMaterialService;

open OperateTypeArrayBasicMaterialService;

let getRecord = ({basicMaterialRecord}) => basicMaterialRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (shaderIndices, colors, textureIndices, textureCounts)
    ) => {
  let defaultTextureCount = getDefaultTextureCount();
  WonderCommonlib.ArrayService.range(0, basicMaterialCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((shaderIndices, colors, textureIndices, textureCounts), index) => (
           [@bs] ShaderIndicesService.setShaderIndex(index, defaultShaderIndex, shaderIndices),
           setColor(index, defaultColor, colors),
           textureIndices,
           setTextureCount(index, defaultTextureCount, textureCounts)
         )
       ),
       (shaderIndices, colors, textureIndices, textureCounts)
     )
};

let _setDefaultTypeArrData =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (buffer, shaderIndices, colors, textureIndices, textureCounts)
    ) => (
  buffer,
  setDefaultTypeArrData(
    basicMaterialCount,
    defaultShaderIndex,
    defaultColor,
    (shaderIndices, colors)
  )
);

let _initBufferData =
    (basicMaterialCount, textureCountPerBasicMaterial, defaultShaderIndex, defaultColor) => {
  let buffer = createBuffer(basicMaterialCount);
  let (shaderIndices, colors, textureIndices, textureCounts) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
      textureCountPerBasicMaterial
    );
  (buffer, shaderIndices, colors, textureIndices, textureCounts)
  |> _setDefaultTypeArrData(basicMaterialCount, defaultShaderIndex, defaultColor)
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex = DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultColor = [|1., 1., 1.|];
  let (buffer, (shaderIndices, colors, textureIndices, textureCounts)) =
    _initBufferData(
      BufferSettingService.getBasicMaterialDataBufferCount(settingRecord),
      BufferSettingService.getTextureCountPerBasicMaterial(settingRecord),
      defaultShaderIndex,
      defaultColor
    );
  state.basicMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      colors,
      textureIndices,
      textureCounts,
      defaultShaderIndex,
      defaultColor,
      mapTextureIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
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
        buffer,
        shaderIndices,
        colors,
        textureIndices,
        textureCounts,
        defaultShaderIndex,
        defaultColor,
        groupCountMap,
        gameObjectMap,
        disposedIndexArray,
        materialArrayForWorkerInit
      } as record =
    state |> getRecord;
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...record,
        index,
        shaderIndices:
          shaderIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(index * getShaderIndicesSize()),
          /* TODO test */
        colors:
          colors |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getColorsSize()),
        textureIndices:
          textureIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index
               * getTextureIndicesSize(
                   BufferSettingService.getTextureCountPerBasicMaterial(settingRecord)
                 )
             ),
        textureCounts:
          textureCounts
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getTextureCountsSize()),
        defaultShaderIndex,
        defaultColor,
          /* TODO test */
        mapTextureIndexMap: mapTextureIndexMap |> SparseMapService.copy,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit: materialArrayForWorkerInit |> Js.Array.copy
      })
  }
};