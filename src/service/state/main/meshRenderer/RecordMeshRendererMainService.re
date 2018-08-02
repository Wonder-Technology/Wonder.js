open StateDataMainType;

open MeshRendererType;

open DrawModeType;

open Js.Typed_array;

open BufferMeshRendererService;

open OperateTypeArrayMeshRendererService;

let getRecord = ({meshRendererRecord}) =>
  meshRendererRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (meshRendererCount, defaultDrawMode, drawModes) =>
  WonderCommonlib.ArrayService.range(0, meshRendererCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. drawModes, index) =>
         setDrawMode(index, defaultDrawMode, drawModes),
       drawModes,
     );

let _setAllTypeArrDataToDefault =
    (meshRendererCount: int, defaultDrawMode, (buffer, drawModes)) => (
  buffer,
  setAllTypeArrDataToDefault(meshRendererCount, defaultDrawMode, drawModes),
);

let _initBufferData = (meshRendererCount, defaultDrawMode) => {
  let buffer = createBuffer(meshRendererCount);
  let drawModes =
    CreateTypeArrayMeshRendererService.createTypeArrays(
      buffer,
      meshRendererCount,
    );
  (buffer, drawModes)
  |> _setAllTypeArrDataToDefault(meshRendererCount, defaultDrawMode);
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex =
    DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDrawMode = getDefaultDrawMode() |> drawModeToUint8;
  let (buffer, drawModes) =
    _initBufferData(
      BufferSettingService.getMeshRendererCount(settingRecord),
      defaultDrawMode,
    );
  state.meshRendererRecord =
    Some({
      index: 0,
      buffer,
      drawModes,
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
        /* TODO test */
        drawModes:
          drawModes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getDrawModesSize(),
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