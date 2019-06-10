open StateDataMainType;

open FlyCameraControllerType;

let _getTranslationPosition = (cameraController, flyCameraControllerRecord) => {
  let moveSpeed =
    OperateFlyCameraControllerService.unsafeGetMoveSpeed(
      cameraController,
      flyCameraControllerRecord,
    );

  OperateFlyCameraControllerService.hasDirection(flyCameraControllerRecord) ?
    OperateFlyCameraControllerService.getDirectionArray(
      flyCameraControllerRecord,
    )
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (dx, dy, dz), direction) =>
           switch (direction) {
           | Left => (-. moveSpeed, dy, dz)
           | Right => (moveSpeed, dy, dz)
           | Up => (dx, moveSpeed, dz)
           | Down => (dx, -. moveSpeed, dz)
           | Front => (dx, dy, -. moveSpeed)
           | Back => (dx, dy, moveSpeed)
           },
         (0., 0., 0.),
       ) :
    OperateFlyCameraControllerService.unsafeGetTranslationDiff(
      cameraController,
      flyCameraControllerRecord,
    );
};

let _resetFlyCameraDiffValue = (cameraController, flyCameraControllerRecord) =>
  flyCameraControllerRecord
  |> OperateFlyCameraControllerService.setEulerAngleDiff(
       cameraController,
       {diffX: 0., diffY: 0.},
     )
  |> OperateFlyCameraControllerService.setTranslationDiff(
       cameraController,
       (0., 0., 0.),
     );

let _updateTransform =
    (
      cameraController,
      {flyCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let transformRecord = RecordTransformMainService.getRecord(state);

  let cameraTransform =
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectFlyCameraControllerService.unsafeGetGameObject(
        cameraController,
        flyCameraControllerRecord,
      ),
      gameObjectRecord,
    );

  let {diffX, diffY} =
    OperateFlyCameraControllerService.unsafeGetEulerAngleDiff(
      cameraController,
      flyCameraControllerRecord,
    );

  let (cameraRotationX, cameraRotationY, _) =
    ModelMatrixTransformService.getLocalEulerAnglesTuple(
      cameraTransform,
      RecordTransformMainService.getRecord(state).localRotations,
    );

  let cameraLocalPositionTuple =
    ModelMatrixTransformService.getLocalRotationTuple(
      cameraTransform,
      RecordTransformMainService.getRecord(state).localRotations,
    )
    |> Vector3Service.transformQuat(
         _getTranslationPosition(cameraController, flyCameraControllerRecord)
         |> WonderLog.Log.print,
       )
    |> Vector3Service.add(
         Vector3Type.Float,
         ModelMatrixTransformService.getLocalPositionTuple(
           cameraTransform,
           RecordTransformMainService.getRecord(state).localPositions,
         ),
       );

  {
    ...state,
    transformRecord:
      Some(
        transformRecord
        |> ModelMatrixTransformService.setLocalPositionByTuple(
             cameraTransform,
             cameraLocalPositionTuple,
           )
        |> ModelMatrixTransformService.setLocalEulerAnglesByTuple(
             cameraTransform,
             (cameraRotationX -. diffX, cameraRotationY -. diffY, 0.),
           ),
      ),
    flyCameraControllerRecord:
      _resetFlyCameraDiffValue(cameraController, flyCameraControllerRecord),
  };
  state;
};

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
     );