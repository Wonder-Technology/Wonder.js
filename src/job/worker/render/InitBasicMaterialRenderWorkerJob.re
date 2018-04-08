open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _createTypeArrays = (buffer, count, state) => {
  let (shaderIndices, colors) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(buffer, count);
  state.basicMaterialRecord = Some({shaderIndices, colors});
  state
};

let _initMaterials = (basicMaterialData, data, state) => {
  let directionLightData = data##directionLightData;
  let pointLightData = data##pointLightData;
  let {shaderIndices} = RecordBasicMaterialRenderWorkerService.getRecord(state);
  let isSourceInstanceMap = basicMaterialData##isSourceInstanceMap;
  InitBasicMaterialInitMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (
      isSourceInstanceMap,
      /* TODO get isSupportInstance by JudgeInstanceAllService.isSupportInstance */
      false
    ),
    CreateInitMaterialStateRenderWorkerService.createInitMaterialState(
      (basicMaterialData##index, basicMaterialData##disposedIndexArray, shaderIndices),
      (directionLightData, pointLightData),
      state
    )
  )
  |> ignore;
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.getState(stateData);
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