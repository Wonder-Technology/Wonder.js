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
      (shaderIndices, colors, isDepthTests, alphas),
    ) => {
  let defaultIsDepthTest = BufferMaterialService.getDefaultIsDepthTest();
  let defaultAlpha = BufferBasicMaterialService.getDefaultAlpha();

  let (shaderIndices, colors, isDepthTests, alphas) =
    WonderCommonlib.ArrayService.range(0, basicMaterialCount - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (shaderIndices, colors, isDepthTests, alphas), index) => (
           ShaderIndicesService.setShaderIndex(.
             index,
             defaultShaderIndex,
             shaderIndices,
           ),
           setColor(index, defaultColor, colors),
           setIsDepthTest(index, defaultIsDepthTest, isDepthTests),
           setAlpha(index, defaultAlpha, alphas),
         ),
         (shaderIndices, colors, isDepthTests, alphas),
       );
  (shaderIndices, colors, isDepthTests, alphas);
};

let _setAllTypeArrDataToDefault =
    (
      basicMaterialCount: int,
      defaultShaderIndex,
      defaultColor,
      (buffer, shaderIndices, colors, isDepthTests, alphas),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    basicMaterialCount,
    defaultShaderIndex,
    defaultColor,
    (shaderIndices, colors, isDepthTests, alphas),
  ),
);

let _initBufferData = (basicMaterialCount, defaultShaderIndex, defaultColor) => {
  let buffer = createBuffer(basicMaterialCount);
  let (shaderIndices, colors, isDepthTests, alphas) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
    );

  (buffer, shaderIndices, colors, isDepthTests, alphas)
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
  let (buffer, (shaderIndices, colors, isDepthTests, alphas)) =
    _initBufferData(
      BufferSettingService.getBasicMaterialCount(settingRecord),
      defaultShaderIndex,
      defaultColor,
    );
  state.basicMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      colors,
      isDepthTests,
      alphas,
      defaultColor,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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
        isDepthTests,
        alphas,
        defaultColor,
        nameMap,
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
        gameObjectsMap:
          gameObjectsMap
          |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit |> Js.Array.copy,
      }),
  };
};