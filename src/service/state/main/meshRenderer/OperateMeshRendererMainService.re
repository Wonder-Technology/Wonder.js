open MeshRendererType;

open StateDataMainType;

let getDrawMode = (meshRenderer, state) =>
  OperateTypeArrayMeshRendererService.getDrawMode(
    meshRenderer,
    RecordMeshRendererMainService.getRecord(state).drawModes,
  );

let setDrawMode = (meshRenderer, drawMode, state) => {
  let {drawModes} as meshRendererRecord =
    RecordMeshRendererMainService.getRecord(state);

  {
    ...state,
    meshRendererRecord:
      Some({
        ...meshRendererRecord,
        drawModes:
          OperateTypeArrayMeshRendererService.setDrawMode(
            meshRenderer,
            drawMode,
            drawModes,
          ),
      }),
  };
};

let getIsRender = (meshRenderer, state) =>
  OperateTypeArrayMeshRendererService.getIsRender(
    meshRenderer,
    RecordMeshRendererMainService.getRecord(state).isRenders,
  )
  === BufferMeshRendererService.getRender();

let _removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
    ) => {
  ...meshRendererRecord,
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer),
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer),
};

let setIsRender = (meshRenderer, isRender: bool, {gameObjectRecord} as state) =>
  isRender === getIsRender(meshRenderer, state) ?
    state :
    {
      let meshRendererRecord = RecordMeshRendererMainService.getRecord(state);

      let {isRenders} as meshRendererRecord =
        isRender ?
          RenderArrayMeshRendererMainService.addToRenderGameObjectMap(
            meshRenderer,
            GameObjectMeshRendererService.unsafeGetGameObject(
              meshRenderer,
              meshRendererRecord,
            ),
            meshRendererRecord,
            gameObjectRecord,
          ) :
          RenderArrayMeshRendererService.removeFromRenderGameObjectMap(
            meshRenderer,
            meshRendererRecord,
          );

      {
        ...state,
        meshRendererRecord:
          Some({
            ...meshRendererRecord,
            isRenders:
              OperateTypeArrayMeshRendererService.setIsRender(
                meshRenderer,
                isRender === true ?
                  BufferMeshRendererService.getRender() :
                  BufferMeshRendererService.getNotRender(),
                isRenders,
              ),
          }),
      };
    };