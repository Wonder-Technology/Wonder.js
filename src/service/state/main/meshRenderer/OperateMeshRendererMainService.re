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