open StateDataMainType;

open FlyCameraControllerType;

let _updateTransform =
    (
      cameraController,
      {flyCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let transformRecord = RecordTransformMainService.getRecord(state);

  let transform =
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectFlyCameraControllerService.unsafeGetGameObject(
        cameraController,
        flyCameraControllerRecord,
      ),
      gameObjectRecord,
    );

  let {rotationX, rotationY} =
    OperateFlyCameraControllerService.unsafeGetRotation(
      cameraController,
      flyCameraControllerRecord,
    );

  let (cameraRotationX, cameraRotationY, _) =
    ModelMatrixTransformService.getLocalEulerAnglesTuple(
      transform,
      RecordTransformMainService.getRecord(state).localRotations,
    );

  {
    ...state,
    transformRecord:
      Some(
        ModelMatrixTransformService.setLocalEulerAnglesByTuple(
          transform,
          (cameraRotationX -. rotationX, cameraRotationY -. rotationY, 0.),
          transformRecord,
        ),
      ),
  };
};

let _clearDirtyArray = ({flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord: {
    ...flyCameraControllerRecord,
    dirtyArray: DirtyArrayService.create(),
  },
};

let update = ({flyCameraControllerRecord} as state) =>
  flyCameraControllerRecord.dirtyArray
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, dirtyIndex) => _updateTransform(dirtyIndex, state),
       state,
     )
  |> _clearDirtyArray;

let _getAllFlyCameraControllers = ({flyCameraControllerRecord} as state) => {
  let {index, disposedIndexArray}: flyCameraControllerRecord = flyCameraControllerRecord;

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let updateAll = ({flyCameraControllerRecord} as state) =>
  _getAllFlyCameraControllers(state)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, cameraController) =>
         _updateTransform(cameraController, state),
       state,
     )
  |> _clearDirtyArray;