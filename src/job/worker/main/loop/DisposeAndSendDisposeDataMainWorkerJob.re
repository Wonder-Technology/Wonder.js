open StateDataMainType;

open GameObjectType;

/* let _disposeComponents = ({settingRecord, gameObjectRecord} as state) => {
     let {
       disposedBasicCameraViewArray,
       disposedTransformArray,
       disposedTransformArrayForKeepOrder,
       disposedPerspectiveCameraProjectionArray,
       disposedBasicMaterialArray,
       disposedLightMaterialArray,
       disposedBoxGeometryArray,
       disposedCustomGeometryArray,
       disposedSourceInstanceArray,
       disposedObjectInstanceArray,
       disposedAmbientLightArray,
       disposedDirectionLightArray,
       disposedPointLightArray,
       disposedMeshRendererComponentArray,
       disposedMeshRendererUidArray
     } = gameObjectRecord;
     let state =
       disposedBasicCameraViewArray
       |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(state);
     let state =
       disposedPerspectiveCameraProjectionArray
       |> DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
            state
          );
     let state =
       disposedTransformArray
       |> DisposeComponentGameObjectMainService.batchDisposeTransformComponent(state, false);
     let state =
       disposedTransformArrayForKeepOrder
       |> DisposeComponentGameObjectMainService.batchDisposeTransformComponent(state, true);
     let state =
       disposedBasicMaterialArray
       |> DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(state);
     let state =
       disposedLightMaterialArray
       |> DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state);
     let (state, boxGeometryNeedDisposeVboBufferArrFromGeometry) =
       disposedBoxGeometryArray
       |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(state);
     let state =
       disposedCustomGeometryArray
       |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(state);
     let (state, boxGeometryNeedDisposeVboBufferArrFromSourceInstance) =
       disposedSourceInstanceArray
       |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
            state,
            false,
            DisposeGameObjectMainService.batchDispose
          );
     let state =
       disposedObjectInstanceArray
       |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(state);
     let state =
       disposedAmbientLightArray
       |> DisposeComponentGameObjectMainService.batchDisposeAmbientLightComponent(state);
     let state =
       disposedDirectionLightArray
       |> DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(state);
     let state =
       disposedPointLightArray
       |> DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state);
     let state =
       disposedMeshRendererComponentArray
       |> DisposeComponentGameObjectMainService.batchDisposeMeshRendererComponent(
            DisposeECSService.buildMapFromArray(
              disposedMeshRendererUidArray,
              WonderCommonlib.SparseMapService.createEmpty()
            ),
            state
          );
     (
       state,
       boxGeometryNeedDisposeVboBufferArrFromGeometry
       |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrFromSourceInstance)
     )
   };

   let _disposeGameObjects = ({gameObjectRecord} as state) => {
     let {disposedUidArray, disposedUidArrayForKeepOrder} = gameObjectRecord;
     let (state, boxGeometryNeedDisposeVboBufferArr) =
       state |> DisposeGameObjectMainService.batchDispose(disposedUidArray, false);
     let (state, boxGeometryNeedDisposeVboBufferArr) =
       state |> DisposeGameObjectMainService.batchDispose(disposedUidArrayForKeepOrder, true);
     let state = state |> DisposeGameObjectMainService.clearDeferDisposeData;
     (state, boxGeometryNeedDisposeVboBufferArr)
   }; */
let _sendDisposeData =
    (operateType, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr, state) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
  |> WorkerService.postMessage({
       "operateType": operateType,
       "boxGeometryNeedDisposeVboBufferArr": boxGeometryNeedDisposeVboBufferArr,
       "customGeometryNeedDisposeVboBufferArr": customGeometryNeedDisposeVboBufferArr
     });

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      /* let (state, boxGeometryNeedDisposeVboBufferArrFromComponent) = state |> _disposeComponents;
         let (state, boxGeometryNeedDisposeVboBufferArrFromGameObject) = state |> _disposeGameObjects;
         let boxGeometryNeedDisposeVboBufferArr =
           boxGeometryNeedDisposeVboBufferArrFromComponent
           |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrFromGameObject); */
      let (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr) =
        DisposeJobUtils.execJob(state);
      _sendDisposeData(
        operateType,
        boxGeometryNeedDisposeVboBufferArr,
        customGeometryNeedDisposeVboBufferArr,
        state
      );
      /*! only sync job can set state */
      state |> StateDataMainService.setState(stateData);
      Some(operateType)
    }
  );