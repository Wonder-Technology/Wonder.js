open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _createTypeArrays = (buffer, count, state) => {
  let (shaderIndices, colors) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(buffer, count);
  state.basicMaterialRecord = Some({shaderIndices, colors});
  state
};

let _initMaterials = (basicMaterialData, data, state) => {
  let {shaderIndices} = RecordBasicMaterialRenderWorkerService.getRecord(state);
  let isSourceInstanceMap = basicMaterialData##isSourceInstanceMap;
  InitInitBasicMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (isSourceInstanceMap, JudgeInstanceRenderWorkerService.isSupportInstance(state)),
    CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState(
      (basicMaterialData##index, basicMaterialData##disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let basicMaterialData = data##basicMaterialData;
      let buffer = basicMaterialData##buffer;
      let count = data##bufferData##basicMaterialDataBufferCount;
      state
      |> _createTypeArrays(buffer, count)
      |> _initMaterials(basicMaterialData, data)
      |> ignore;
      e
    }
  );