open StateDataMainType;

open MeshRendererType;

open DrawModeType;

open Js.Typed_array;

open BufferMeshRendererService;

open OperateTypeArrayMeshRendererService;

let getRecord = ({meshRendererRecord}) =>
  meshRendererRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      meshRendererCount: int,
      defaultDrawMode,
      defaultIsRender,
      drawModes,
      isRenders,
    ) =>
  WonderCommonlib.ArrayService.range(0, meshRendererCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (drawModes, isRenders), index) => (
         setDrawMode(index, defaultDrawMode, drawModes),
         setIsRender(index, defaultIsRender, isRenders),
       ),
       (drawModes, isRenders),
     );

let _setAllTypeArrDataToDefault =
    (
      meshRendererCount: int,
      defaultDrawMode,
      defaultIsRender,
      (buffer, drawModes, isRenders),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    meshRendererCount,
    defaultDrawMode,
    defaultIsRender,
    drawModes,
    isRenders,
  ),
);

let _initBufferData = (meshRendererCount, defaultDrawMode, defaultIsRender) => {
  let buffer = createBuffer(meshRendererCount);
  let (drawModes, isRenders) =
    CreateTypeArrayMeshRendererService.createTypeArrays(
      buffer,
      meshRendererCount,
    );
  (buffer, drawModes, isRenders)
  |> _setAllTypeArrDataToDefault(
       meshRendererCount,
       defaultDrawMode,
       defaultIsRender,
     );
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex =
    DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDrawMode = getDefaultDrawMode() |> drawModeToUint8;
  let defaultIsRender = getDefaultIsRender();
  let (buffer, (drawModes, isRenders)) =
    _initBufferData(
      BufferSettingService.getMeshRendererCount(settingRecord),
      defaultDrawMode,
      defaultIsRender,
    );
  state.meshRendererRecord =
    Some({
      index: 0,
      buffer,
      drawModes,
      isRenders,
      basicMaterialRenderGameObjectMap:
        WonderCommonlib.SparseMapService.createEmpty(),
      lightMaterialRenderGameObjectMap:
        WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        drawModes,
        isRenders,
        basicMaterialRenderGameObjectMap,
        lightMaterialRenderGameObjectMap,
        gameObjectMap,
        disposedIndexArray,
      } as record =
    state |> getRecord;

  {
    ...state,
    meshRendererRecord:
      Some({
        ...record,
        index,
        drawModes:
          drawModes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getDrawModesSize(),
             ),
        isRenders:
          isRenders
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getIsRendersSize(),
             ),
        basicMaterialRenderGameObjectMap:
          basicMaterialRenderGameObjectMap |> SparseMapService.copy,
        lightMaterialRenderGameObjectMap:
          lightMaterialRenderGameObjectMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
      }),
  };
};