open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

open RenderWorkerArrayBufferViewSourceTextureType;

open Js.Promise;

let _buildAddArrayBufferViewSourceStream = (e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let initData = data##initData;
      let textureData = initData##textureData;
      SourceMapArrayBufferViewSourceTextureRenderWorkerService.addSourceArray(
        textureData##arrayBufferViewSourceTextureData##needAddedSourceArray,
        state
      )
      |> StateRenderWorkerService.setState(stateData)
    }
  );

let _buildInitTextureStream = (e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let initData = data##initData;
      let textureData = initData##textureData;
      let basicSourceTextureRecord = RecordBasicSourceTextureRenderWorkerService.getRecord(state);
      let arrayBufferViewSourceTextureRecord =
        RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
      state.basicSourceTextureRecord =
        Some({
          ...basicSourceTextureRecord,
          glTextureMap:
            InitTextureService.initTexturesWithIndexArray(
              [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
              textureData##basicSourceTextureData##needInitedTextureIndexArray,
              basicSourceTextureRecord.glTextureMap
            )
        });
      state.arrayBufferViewSourceTextureRecord =
        Some({
          ...arrayBufferViewSourceTextureRecord,
          glTextureMap:
            InitTextureService.initTexturesWithIndexArray(
              [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
              textureData##arrayBufferViewSourceTextureData##needInitedTextureIndexArray,
              arrayBufferViewSourceTextureRecord.glTextureMap
            )
        });
      state
    }
  );

let execJob = (flags, e, stateData) => {
  let state = StateRenderWorkerService.unsafeGetState(stateData);
  let data = MessageService.getRecord(e);
  let initData = data##initData;
  let textureData = initData##textureData;
  [|
    SourceMapBasicSourceTextureRenderWorkerService.addSourceFromImageDataStream(
      textureData##basicSourceTextureData##needAddedImageDataArray,
      state
    ),
    _buildAddArrayBufferViewSourceStream(e, stateData),
    _buildInitTextureStream(e, stateData)
  |]
  |> MostUtils.concatArray
  |> WonderBsMost.Most.forEach((state) => state |> StateRenderWorkerService.setState(stateData) |> ignore)
  |> then_(() => e |> resolve)
  |> WonderBsMost.Most.fromPromise
};