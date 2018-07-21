open StateDataMainType;

open RenderType;

open RenderCameraType;

let _buildMaterialData =
    (materialArrayForWorkerInit, gameObjectMap, gameObjectRecord) =>
  materialArrayForWorkerInit
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> Js.Array.reduce(
       (arr, materialIndex) =>
         arr
         |> ArrayService.push((
              materialIndex,
              JudgeInstanceMainService.isSourceInstance(
                materialIndex,
                gameObjectMap,
                gameObjectRecord,
              ),
            )),
       [||],
     );

let _removeAddedSourceDataDuplicateItems = needAddedSourceDataArray =>
  needAddedSourceDataArray
  |> ArrayService.removeDuplicateItems((. (texture, source)) =>
       Js.Int.toString(texture)
     );

let _buildIMGUIData = ({viewRecord} as state) => {
  let wonderImguiIMGUIRecord =
    RecordIMGUIMainService.getWonderIMGUIRecord(state);

  let ioData = RecordIMGUIMainService.getIOData(state);

  {
    "ioData": ioData,
    "customData":
      switch (
        WonderImgui.ManageIMGUIAPI.getCustomData(wonderImguiIMGUIRecord)
      ) {
      | None => None
      | Some(customData) => customData |. Some
      },
    "imguiFunc":
      switch (WonderImgui.ManageIMGUIAPI.getIMGUIFunc(wonderImguiIMGUIRecord)) {
      | None => None
      | Some(func) => func |> SerializeService.serializeFunction |. Some
      },
  };
};

let _buildData = (operateType, stateData) => {
  let {
        settingRecord,
        gameObjectRecord,
        directionLightRecord,
        pointLightRecord,
      } as state =
    StateDataMainService.unsafeGetState(stateData);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let basicRenderObjectRecord =
    OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
  let lightRenderObjectRecord =
    OperateRenderMainService.unsafeGetLightRenderObjectRecord(state);
  let sourceInstanceRecord = RecordSourceInstanceMainService.getRecord(state);
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  let cameraData = OperateRenderMainService.getCameraRecord(state);
  let isRender = cameraData |> Js.Option.isSome;
  let (isRender, cameraData) =
    switch (OperateRenderMainService.getCameraRecord(state)) {
    | None => (false, Js.Nullable.null)
    | Some({vMatrix, pMatrix, position}) => (
        true,
        Js.Nullable.return({
          "vMatrix": vMatrix,
          "pMatrix": pMatrix,
          "position": position,
        }),
      )
    };
  /* WonderLog.Log.print("send render data") |> ignore; */
  {
    "operateType": operateType,
    "ambientLightData": {
      "color": AmbientLightSceneMainService.getAmbientLightColor(state),
    },
    "directionLightData": {
      "index": directionLightRecord.index,
      "positionMap":
        PositionLightMainService.buildPositionMap(
          directionLightRecord.index,
          PositionDirectionLightMainService.getPosition,
          state,
        ),
    },
    "pointLightData": {
      "index": pointLightRecord.index,
      "positionMap":
        PositionLightMainService.buildPositionMap(
          pointLightRecord.index,
          PositionPointLightMainService.getPosition,
          state,
        ),
    },
    "initData": {
      "materialData": {
        "basicMaterialData": {
          "materialDataForWorkerInit":
            _buildMaterialData(
              basicMaterialRecord.materialArrayForWorkerInit,
              basicMaterialRecord.gameObjectMap,
              gameObjectRecord,
            ),
        },
        "lightMaterialData": {
          "materialDataForWorkerInit":
            _buildMaterialData(
              lightMaterialRecord.materialArrayForWorkerInit,
              lightMaterialRecord.gameObjectMap,
              gameObjectRecord,
            ),
        },
      },
      "textureData": {
        "basicSourceTextureData": {
          "needAddedImageDataArray":
            OperateBasicSourceTextureMainService.convertNeedAddedSourceArrayToImageDataArr(
              basicSourceTextureRecord.needAddedSourceArray
              |> _removeAddedSourceDataDuplicateItems,
            ),
          "needInitedTextureIndexArray":
            basicSourceTextureRecord.needInitedTextureIndexArray
            |> WonderCommonlib.ArrayService.removeDuplicateItems,
        },
        "arrayBufferViewSourceTextureData": {
          "needAddedSourceArray":
            arrayBufferViewSourceTextureRecord.needAddedSourceArray
            |> _removeAddedSourceDataDuplicateItems,
          "needInitedTextureIndexArray":
            arrayBufferViewSourceTextureRecord.needInitedTextureIndexArray
            |> WonderCommonlib.ArrayService.removeDuplicateItems,
        },
      },
    },
    "renderData": {
      "isRender": isRender,
      "camera": cameraData,
      "basic": {
        "buffer": basicRenderObjectRecord.buffer,
        "count": basicRenderObjectRecord.count,
        "bufferCount":
          BufferSettingService.getBasicMaterialCount(settingRecord),
      },
      "light": {
        "buffer": lightRenderObjectRecord.buffer,
        "count": lightRenderObjectRecord.count,
        "bufferCount":
          BufferSettingService.getLightMaterialCount(settingRecord),
      },
      "sourceInstance": {
        "objectInstanceTransformIndexMap":
          sourceInstanceRecord.objectInstanceTransformIndexMap,
      },
    },
    "imguiData": _buildIMGUIData(state),
  };
};

let _clearData = state => {
  InitBasicMaterialService.clearDataForWorkerInit(
    RecordBasicMaterialMainService.getRecord(state),
  )
  |> ignore;
  InitLightMaterialService.clearDataForWorkerInit(
    RecordLightMaterialMainService.getRecord(state),
  )
  |> ignore;
  state
  |> OperateSourceTextureMainService.clearNeedAddedSourceArr
  |> InitSourceTextureMainService.clearNeedInitedTextureIndexArray
  |> IOIMGUIMainService.resetPointEventStateWhenPointUp;
};

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let {workerInstanceRecord} as state =
      StateDataMainService.unsafeGetState(stateData);
    let operateType = JobConfigUtils.getOperateType(flags);
    WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
    |> WorkerService.postMessage(_buildData(operateType, stateData));
    let state = state |> _clearData;
    StateDataMainService.setState(stateData, state);
    Some(operateType);
  });