open StateDataMainType;

open BasicMaterialType;

open SettingType;

open SettingGPUType;

open BrowserDetectType;

let _buildMaterialData =
    (buffer, index, disposedIndexArray, isSourceInstanceMap) => {
  "buffer": buffer,
  "index": index,
  "disposedIndexArray": disposedIndexArray,
  "isSourceInstanceMap": isSourceInstanceMap,
};

let _buildTextureData = state => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let basicSourceTextureRecord =
        RecordBasicSourceTextureMainService.getRecord(state);
      let needInitedTextureIndexArray =
        basicSourceTextureRecord.needInitedTextureIndexArray;
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|basicSourceTextureRecord->needInitedTextureIndexArray should be empty|j},
          ~actual={j|is $needInitedTextureIndexArray|j},
        ),
        () =>
        needInitedTextureIndexArray |> Js.Array.length == 0
      );
      let arrayBufferViewSourceTextureRecord =
        RecordArrayBufferViewSourceTextureMainService.getRecord(state);
      let needInitedTextureIndexArray =
        arrayBufferViewSourceTextureRecord.needInitedTextureIndexArray;
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty|j},
          ~actual={j|is $needInitedTextureIndexArray|j},
        ),
        () =>
        needInitedTextureIndexArray |> Js.Array.length == 0
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let sourceTextureRecord = RecordSourceTextureMainService.getRecord(state);
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  {
    "buffer": sourceTextureRecord.buffer,
    "basicSourceTextureData": {
      "index": basicSourceTextureRecord.index,
      /* TODO perf: add needAddedImageDataArray->arrayBuffer to transfer list */
      "needAddedImageDataArray":
        OperateBasicSourceTextureMainService.convertNeedAddedSourceArrayToImageDataArr(
          basicSourceTextureRecord.needAddedSourceArray,
        ),
    },
    "arrayBufferViewSourceTextureData": {
      "index": arrayBufferViewSourceTextureRecord.index,
      "sourceMap": arrayBufferViewSourceTextureRecord.sourceMap,
    },
  };
};

let _getFntData = imguiRecord =>
  switch (WonderImgui.AssetIMGUIAPI.getFntData(imguiRecord)) {
  | None => None
  | Some(fntData) => (fntData |> Obj.magic |> Js.Json.stringify)->Some
  };

let _buildIMGUIData = state => {
  let (canvasWidth, canvasHeight) =
    ManageIMGUIMainService.getCanvasSize(state);

  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state);

  {
    "canvasWidth": canvasWidth,
    "canvasHeight": canvasHeight,
    "setting":
      WonderImgui.ManageIMGUIAPI.getSetting(wonderImguiIMGUIRecord)
      |> Obj.magic
      |> Js.Json.stringify,
    "fntData": _getFntData(wonderImguiIMGUIRecord),
    "bitmapImageData": AssetIMGUIMainServiice.convertBitmapToImageData(state),
    "customTextureSourceDataArr":
      AssetIMGUIMainServiice.convertCustomTextureSourcesToImageDataArr(state),
  };
};

let _buildData = (operateType, canvas, stateData) => {
  let {
        settingRecord,
        workerInstanceRecord,
        gameObjectRecord,
        browserDetectRecord,
      } as state =
    StateDataMainService.unsafeGetState(stateData);
  let {useHardwareInstance} =
    OperateSettingService.unsafeGetGPU(settingRecord);
  let {maxBigTypeArrayPoolSize} =
    OperateSettingService.unsafeGetMemory(settingRecord);
  let buffer = BufferSettingService.unsafeGetBuffer(settingRecord);
  let renderConfigRecord = RecordRenderConfigMainService.getRecord(state);
  let transformRecord = RecordTransformMainService.getRecord(state);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let directionLightRecord = RecordDirectionLightMainService.getRecord(state);
  let pointLightRecord = RecordPointLightMainService.getRecord(state);
  let geometryRecord = RecordGeometryMainService.getRecord(state);
  let meshRendererRecord = RecordMeshRendererMainService.getRecord(state);
  let sourceInstanceRecord = RecordSourceInstanceMainService.getRecord(state);
  let (x, y, width, height, _, _) = ScreenService.queryFullScreenData();

  {
    "operateType": operateType,
    "canvas": canvas,
    "contextConfig": OperateSettingService.unsafeGetContext(settingRecord),
    "isDebug": IsDebugMainService.getIsDebug(stateData),
    "viewportData": [|x, y, width, height|],
    "bufferData": {
      "geometryPointCount": buffer.geometryPointCount,
      "geometryCount": buffer.geometryCount,
      "transformCount": buffer.transformCount,
      "basicMaterialCount": buffer.basicMaterialCount,
      "lightMaterialCount": buffer.lightMaterialCount,
      "meshRendererCount": buffer.meshRendererCount,
      "basicSourceTextureCount": buffer.basicSourceTextureCount,
      "arrayBufferViewSourceTextureCount":
        buffer.arrayBufferViewSourceTextureCount,
      "directionLightCount": buffer.directionLightCount,
      "pointLightCount": buffer.pointLightCount,
    },
    "gpuData": {
      "useHardwareInstance": useHardwareInstance,
    },
    "memoryData": {
      "maxBigTypeArrayPoolSize": maxBigTypeArrayPoolSize,
    },
    "instanceBufferData": {
      "sourceInstanceCount":
        BufferSettingService.getSourceInstanceCount(settingRecord),
      "objectInstanceCountPerSourceInstance":
        BufferSettingService.getObjectInstanceCountPerSourceInstance(
          settingRecord,
        ),
    },
    "workerDetectData": {
      "isUseWorker": WorkerDetectMainService.isUseWorker(state),
    },
    "browserDetectData": {
      "browser": browserDetectRecord.browser,
    },
    "renderConfigData": {
      "shaders":
        GetDataRenderConfigService.getShaders(renderConfigRecord)
        |> Obj.magic
        |> Js.Json.stringify,
      "shaderLibs":
        GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
        |> Obj.magic
        |> Js.Json.stringify,
    },
    "transformData": {
      "buffer": transformRecord |> CopyTransformService.unsafeGetCopiedBuffer,
    },
    "basicMaterialData":
      _buildMaterialData(
        basicMaterialRecord.buffer,
        basicMaterialRecord.index,
        basicMaterialRecord.disposedIndexArray,
        JudgeInstanceMainService.buildMap(
          basicMaterialRecord.index,
          RecordBasicMaterialMainService.getRecord(state).gameObjectsMap,
          gameObjectRecord,
        ),
      ),
    "lightMaterialData":
      _buildMaterialData(
        lightMaterialRecord.buffer,
        lightMaterialRecord.index,
        lightMaterialRecord.disposedIndexArray,
        JudgeInstanceMainService.buildMap(
          lightMaterialRecord.index,
          RecordLightMaterialMainService.getRecord(state).gameObjectsMap,
          gameObjectRecord,
        ),
      ),
    "geometryData": {
      "buffer": geometryRecord.buffer,
      "indicesTypeMap": geometryRecord.indicesTypeMap,
    },
    "meshRendererData": {
      "buffer": meshRendererRecord.buffer,
    },
    "directionLightData": {
      "buffer": directionLightRecord.buffer,
      "index": directionLightRecord.index,
      "renderLightArr":
        RenderArrayDirectionLightServivce.getRenderLightArr(
          directionLightRecord,
        ),
    },
    "pointLightData": {
      "buffer": pointLightRecord.buffer,
      "index": pointLightRecord.index,
      "renderLightArr":
        RenderArrayPointLightServivce.getRenderLightArr(pointLightRecord),
    },
    "sourceInstanceData": {
      "buffer": sourceInstanceRecord.buffer,
      "objectInstanceTransformIndexMap":
        sourceInstanceRecord.objectInstanceTransformIndexMap,
    },
    "textureData": _buildTextureData(state),
    "imguiData": _buildIMGUIData(state),
  };
};

let _clearData = state =>
  state
  |> OperateSourceTextureMainService.clearNeedAddedSourceArr
  |> InitSourceTextureMainService.clearNeedInitedTextureIndexArray;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let {
          settingRecord,
          viewRecord,
          workerInstanceRecord,
          gameObjectRecord,
          directionLightRecord,
          pointLightRecord,
        } as state =
      StateDataMainService.unsafeGetState(stateData);
    let operateType = JobConfigUtils.getOperateType(flags);
    let offscreen =
      ViewService.unsafeGetCanvas(viewRecord)
      |> Worker.transferControlToOffscreen;
    WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
    |> WorkerService.postMessageWithTransferData(
         _buildData(operateType, offscreen, stateData),
         [|offscreen|],
       );
    let state = state |> _clearData;
    StateDataMainService.setState(stateData, state);
    Some(operateType);
  });