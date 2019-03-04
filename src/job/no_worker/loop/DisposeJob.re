open StateDataMainType;

open GameObjectType;

let execJob = (flags, state) => {
  let (
    state,
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    DisposeJobUtils.execJob(
      DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponentData,
      DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponentData,
      state,
    );
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeGeometryVboBuffer(
           geometryNeedDisposeVboBufferArr,
         )
      |> DisposeVboBufferService.disposeSourceInstanceVboBuffer(
           sourceInstanceNeedDisposeVboBufferArr,
         ),
  };
};