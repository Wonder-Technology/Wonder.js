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
      (shaderIndices, colors, textureIndices, mapUnits, isDepthTests, alphas),
    ) => {
  let defaultUnit = MapUnitService.getDefaultUnit();
  let defaultIsDepthTest = BufferMaterialService.getDefaultIsDepthTest();
  let defaultAlpha = BufferBasicMaterialService.getDefaultAlpha();

  let (shaderIndices, colors, mapUnits, isDepthTests, alphas) =
    WonderCommonlib.ArrayService.range(0, basicMaterialCount - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (shaderIndices, colors, mapUnits, isDepthTests, alphas), index) => (
           ShaderIndicesService.setShaderIndex(.
             index,
             defaultShaderIndex,
             shaderIndices,
           ),
           setColor(index, defaultColor, colors),
           setMapUnit(. index, defaultUnit, mapUnits),
           setIsDepthTest(index, defaultIsDepthTest, isDepthTests),
           setAlpha(index, defaultAlpha, alphas),
         ),
         (shaderIndices, colors, mapUnits, isDepthTests, alphas),
       );
  (
    shaderIndices,
    colors,
    textureIndices |> Js.Typed_array.Uint32Array.fillInPlace(0),
    mapUnits,
    isDepthTests,
    alphas,
  );
};

let _setAllTypeArrDataToDefault =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (
        buffer,
        shaderIndices,
        colors,
        textureIndices,
        mapUnits,
        isDepthTests,
        alphas,
      ),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    basicMaterialCount,
    defaultShaderIndex,
    defaultColor,
    (shaderIndices, colors, textureIndices, mapUnits, isDepthTests, alphas),
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
  let (shaderIndices, colors, textureIndices, mapUnits, isDepthTests, alphas) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
      textureCountPerMaterial,
    );
  (
    buffer,
    shaderIndices,
    colors,
    textureIndices,
    mapUnits,
    isDepthTests,
    alphas,
  )
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
  let (
    buffer,
    (shaderIndices, colors, textureIndices, mapUnits, isDepthTests, alphas),
  ) =
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
      isDepthTests,
      alphas,
      defaultColor,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      emptyMapUnitArrayMap:
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      gameObjectsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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
        isDepthTests,
        alphas,
        defaultColor,
        nameMap,
        emptyMapUnitArrayMap,
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
        isDepthTests:
          isDepthTests
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getIsDepthTestsSize(),
             ),
        alphas:
          alphas
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getAlphasSize(),
             ),
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        defaultColor,
        emptyMapUnitArrayMap:
          emptyMapUnitArrayMap
          |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        gameObjectsMap:
          gameObjectsMap
          |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit |> Js.Array.copy,
      }),
  };
};