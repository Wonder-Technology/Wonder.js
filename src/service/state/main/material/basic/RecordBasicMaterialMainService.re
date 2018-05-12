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
      (shaderIndices, colors, textureIndices, mapUnits)
    ) => {
  let defaultUnit = MapUnitService.getDefaultUnit();
  WonderCommonlib.ArrayService.range(0, basicMaterialCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((shaderIndices, colors, textureIndices, mapUnits), index) => (
           [@bs] ShaderIndicesService.setShaderIndex(index, defaultShaderIndex, shaderIndices),
           setColor(index, defaultColor, colors),
           textureIndices,
           setMapUnit(index, defaultUnit, mapUnits)
         )
       ),
       (shaderIndices, colors, textureIndices, mapUnits)
     )
};

let _setDefaultTypeArrData =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (buffer, shaderIndices, colors, textureIndices, mapUnits)
    ) => (
  buffer,
  setDefaultTypeArrData(
    basicMaterialCount,
    defaultShaderIndex,
    defaultColor,
    (shaderIndices, colors, textureIndices, mapUnits)
  )
);

let _initBufferData =
    (basicMaterialCount, textureCountPerMaterial, defaultShaderIndex, defaultColor) => {
  let buffer = createBuffer(basicMaterialCount, textureCountPerMaterial);
  let (shaderIndices, colors, textureIndices, mapUnits) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
      textureCountPerMaterial
    );
  (buffer, shaderIndices, colors, textureIndices, mapUnits)
  |> _setDefaultTypeArrData(basicMaterialCount, defaultShaderIndex, defaultColor)
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex = DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultColor = [|1., 1., 1.|];
  let (buffer, (shaderIndices, colors, textureIndices, mapUnits)) =
    _initBufferData(
      BufferSettingService.getBasicMaterialCount(settingRecord),
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
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
      mapUnits,
      defaultColor,
      textureCountMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      materialArrayForWorkerInit: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        buffer,
        shaderIndices,
        colors,
        textureIndices,
        mapUnits,
        defaultColor,
        textureCountMap,
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
                   BufferSettingService.getTextureCountPerMaterial(settingRecord)
                 )
             ),
        mapUnits:
          mapUnits |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getMapUnitsSize()),
        defaultColor,
        /* TODO test */
        textureCountMap: textureCountMap |> SparseMapService.copy,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit: materialArrayForWorkerInit |> Js.Array.copy
      })
  }
};