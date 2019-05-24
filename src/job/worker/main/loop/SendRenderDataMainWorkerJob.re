open StateDataMainType;

open RenderType;

open RenderCameraType;

let _buildMaterialData =
    (materialArrayForWorkerInit, gameObjectsMap, gameObjectRecord) =>
  materialArrayForWorkerInit
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> Js.Array.reduce(
       (arr, materialIndex) =>
         arr
         |> ArrayService.push((
              materialIndex,
              JudgeInstanceMainService.isSourceInstance(
                materialIndex,
                gameObjectsMap,
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

  ManageIMGUIMainService.isSetIMGUIFuncInRenderWorkerForWorker(state) ?
    (state, {"ioData": ioData, "customData": None, "imguiFunc": None}) :
    (
      ManageIMGUIMainService.markSetIMGUIFuncInRenderWorkerForWorker(state),
      {
        "ioData": ioData,
        "customData":
          switch (
            WonderImgui.ManageIMGUIAPI.getCustomData(wonderImguiIMGUIRecord)
          ) {
          | None => None
          | Some(customData) =>
            (customData |> SerializeService.serializeValueWithFunction)->Some
          },
        "imguiFunc":
          switch (
            WonderImgui.ManageIMGUIAPI.getIMGUIFunc(wonderImguiIMGUIRecord)
          ) {
          | None => None
          | Some(func) => (func |> SerializeService.serializeFunction)->Some
          },
      },
    );
};

let _buildData = (operateType, {settingRecord, gameObjectRecord} as state) => {
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let geometryRecord = RecordGeometryMainService.getRecord(state);
  let basicRenderObjectRecord =
    OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
  let lightRenderObjectRecord =
    OperateRenderMainService.unsafeGetLightRenderObjectRecord(state);
  let directionLightRecord = RecordDirectionLightMainService.getRecord(state);
  let pointLightRecord = RecordPointLightMainService.getRecord(state);
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

  let (state, imguiData) = _buildIMGUIData(state);

  (
    state,
    {
      "operateType": operateType,
      "ambientLightData": {
        "color": AmbientLightSceneMainService.getAmbientLightColor(state),
      },
      "directionLightData": {
        "index": directionLightRecord.index,
        "directionMap":
          DirectionDirectionLightMainService.buildDirectionMap(
            DirectionDirectionLightMainService.getDirection,
            state,
          ),
        "renderLightArr":
          RenderArrayDirectionLightServivce.getRenderLightArr(
            directionLightRecord,
          ),
      },
      "pointLightData": {
        "index": pointLightRecord.index,
        "positionMap":
          PositionLightMainService.buildPositionMap(
            PositionPointLightMainService.getPosition,
            state,
          ),
        "renderLightArr":
          RenderArrayPointLightServivce.getRenderLightArr(pointLightRecord),
      },
      "initData": {
        "materialData": {
          "basicMaterialData": {
            "materialDataForWorkerInit":
              _buildMaterialData(
                basicMaterialRecord.materialArrayForWorkerInit,
                basicMaterialRecord.gameObjectsMap,
                gameObjectRecord,
              ),
          },
          "lightMaterialData": {
            "materialDataForWorkerInit":
              _buildMaterialData(
                lightMaterialRecord.materialArrayForWorkerInit,
                lightMaterialRecord.gameObjectsMap,
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
        "geometryData": {
          "indicesTypeMap": geometryRecord.indicesTypeMap,
        },
        "basic": {
          "buffer": basicRenderObjectRecord.buffer,
          "renderIndexArray": basicRenderObjectRecord.renderIndexArray,
          "bufferCount":
            BufferSettingService.getBasicMaterialCount(settingRecord),
        },
        "light": {
          "buffer": lightRenderObjectRecord.buffer,
          "renderIndexArray": lightRenderObjectRecord.renderIndexArray,
          "bufferCount":
            BufferSettingService.getLightMaterialCount(settingRecord),
        },
        "sourceInstance": {
          "objectInstanceTransformIndexMap":
            sourceInstanceRecord.objectInstanceTransformIndexMap,
        },
      },
      "imguiData": imguiData,
      "customData":
        OperateWorkerDataMainService.getMainWorkerCustomData(state),
    },
  );
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

    let (state, data) = _buildData(operateType, state);

    WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
    |> WorkerService.postMessage(data);

    let state = state |> _clearData;
    StateDataMainService.setState(stateData, state);
    Some(operateType);
  });