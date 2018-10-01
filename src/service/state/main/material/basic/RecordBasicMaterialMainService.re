open StateDataMainType;

open MaterialType;

open BasicMaterialType;

open Js.Typed_array;

open BufferBasicMaterialService;

open OperateTypeArrayBasicMaterialService;

let getRecord = ({basicMaterialRecord}) =>
  basicMaterialRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (shaderIndices, colors, textureIndices, mapUnits),
    ) => {
  let defaultUnit = MapUnitService.getDefaultUnit();
  let (shaderIndices, colors, mapUnits) =
    WonderCommonlib.ArrayService.range(0, basicMaterialCount - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (shaderIndices, colors, mapUnits), index) => (
           ShaderIndicesService.setShaderIndex(.
             index,
             defaultShaderIndex,
             shaderIndices,
           ),
           setColor(index, defaultColor, colors),
           setMapUnit(. index, defaultUnit, mapUnits),
         ),
         (shaderIndices, colors, mapUnits),
       );
  (
    shaderIndices,
    colors,
    textureIndices |> Js.Typed_array.Uint32Array.fillInPlace(0),
    mapUnits,
  );
};

let _setAllTypeArrDataToDefault =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (buffer, shaderIndices, colors, textureIndices, mapUnits),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    basicMaterialCount,
    defaultShaderIndex,
    defaultColor,
    (shaderIndices, colors, textureIndices, mapUnits),
  ),
);

let _initBufferData =
    (
      basicMaterialCount,
      textureCountPerMaterial,
      defaultShaderIndex,
      defaultColor,
    ) => {
  let buffer = createBuffer(basicMaterialCount, textureCountPerMaterial);
  let (shaderIndices, colors, textureIndices, mapUnits) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
      textureCountPerMaterial,
    );
  (buffer, shaderIndices, colors, textureIndices, mapUnits)
  |> _setAllTypeArrDataToDefault(
       basicMaterialCount,
       defaultShaderIndex,
       defaultColor,
     );
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex =
    DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultColor = [|1., 1., 1.|];
  let (buffer, (shaderIndices, colors, textureIndices, mapUnits)) =
    _initBufferData(
      BufferSettingService.getBasicMaterialCount(settingRecord),
      BufferSettingService.getTextureCountPerMaterial(settingRecord),
      defaultShaderIndex,
      defaultColor,
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
      nameMap: WonderCommonlib.SparseMapService.createEmpty(),
      emptyMapUnitArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectsMap: WonderCommonlib.SparseMapService.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      materialArrayForWorkerInit: WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
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
        nameMap,
        emptyMapUnitArrayMap,
        groupCountMap,
        gameObjectsMap,
        disposedIndexArray,
        materialArrayForWorkerInit,
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
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index * getShaderIndicesSize(),
             ),
        colors:
          colors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getColorsSize(),
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
        mapUnits:
          mapUnits
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMapUnitsSize(),
             ),
        nameMap: nameMap |> SparseMapService.copy,
        defaultColor,
        emptyMapUnitArrayMap:
          emptyMapUnitArrayMap |> CopyTypeArrayService.deepCopyArrayArray,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectsMap:
          gameObjectsMap |> CopyTypeArrayService.deepCopyArrayArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit |> Js.Array.copy,
      }),
  };
};