open StateDataMainType;

open RenderType;

open RenderCameraType;

let _buildMaterialData = (materialArrayForWorkerInit, gameObjectMap, gameObjectRecord) =>
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
                gameObjectRecord
              )
            )),
       [||]
     );

let _buildData = (operateType, stateData) => {
  let {settingRecord, gameObjectRecord, directionLightRecord, pointLightRecord} as state =
    StateDataMainService.unsafeGetState(stateData);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let basicRenderObjectRecord = OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
  let lightRenderObjectRecord = OperateRenderMainService.unsafeGetLightRenderObjectRecord(state);
  let sourceInstanceRecord = RecordSourceInstanceMainService.getRecord(state);
  let cameraData = OperateRenderMainService.getCameraRecord(state);
  let isRender = cameraData |> Js.Option.isSome;
  let (isRender, cameraData) =
    switch (OperateRenderMainService.getCameraRecord(state)) {
    | None => (Js.false_, Js.Nullable.empty)
    | Some({vMatrix, pMatrix, position}) => (
        Js.true_,
        Js.Nullable.return({"vMatrix": vMatrix, "pMatrix": pMatrix, "position": position})
      )
    };
  /* WonderLog.Log.print("send render data") |> ignore; */
  {
    "operateType": operateType,
    "directionLightData": {
      "index": directionLightRecord.index,
      "positionMap":
        PositionLightMainService.buildPositionMap(
          directionLightRecord.index,
          PositionDirectionLightMainService.getPosition,
          state
        )
    },
    "pointLightData": {
      "index": pointLightRecord.index,
      "positionMap":
        PositionLightMainService.buildPositionMap(
          pointLightRecord.index,
          PositionPointLightMainService.getPosition,
          state
        )
    },
    "initData": {
      "materialData": {
        "basicMaterialData": {
          "materialDataForWorkerInit":
            _buildMaterialData(
              basicMaterialRecord.materialArrayForWorkerInit,
              basicMaterialRecord.gameObjectMap,
              gameObjectRecord
            )
        },
        "lightMaterialData": {
          "materialDataForWorkerInit":
            _buildMaterialData(
              lightMaterialRecord.materialArrayForWorkerInit,
              lightMaterialRecord.gameObjectMap,
              gameObjectRecord
            )
        }
      }
    },
    "renderData": {
      "isRender": isRender,
      "camera": cameraData,
      "basic": {
        "buffer": basicRenderObjectRecord.buffer,
        "count": basicRenderObjectRecord.count,
        "bufferCount": BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
      },
      "light": {
        "buffer": lightRenderObjectRecord.buffer,
        "count": lightRenderObjectRecord.count,
        "bufferCount": BufferSettingService.getLightMaterialDataBufferCount(settingRecord)
      },
      "sourceInstance": {
        "objectInstanceTransformIndexMap": sourceInstanceRecord.objectInstanceTransformIndexMap
      }
    }
  }
};

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {workerInstanceRecord} as state = StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage(_buildData(operateType, stateData));
      InitBasicMaterialService.clearDataForWorkerInit(
        RecordBasicMaterialMainService.getRecord(state)
      )
      |> ignore;
      InitLightMaterialService.clearDataForWorkerInit(
        RecordLightMaterialMainService.getRecord(state)
      )
      |> ignore;
      StateDataMainService.setState(stateData, state);
      Some(operateType)
    }
  );