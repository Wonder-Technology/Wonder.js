open StateDataRenderWorkerType;

let initMaterials = ((createInitMaterialStateFunc, initFunc), isSourceInstanceMap, state) => {
  initFunc(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (isSourceInstanceMap, JudgeInstanceRenderWorkerService.isSupportInstance(state)),
    createInitMaterialStateFunc(state)
  )
  |> ignore;
  state
};