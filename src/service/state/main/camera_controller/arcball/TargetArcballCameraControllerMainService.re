open StateDataMainType;

open TransformType;

open EventType;

open ArcballCameraControllerType;

let _computeTarget =
    (
      cameraController,
      (dx, dy),
      {arcballCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let target =
    OperateArcballCameraControllerService.unsafeGetTarget(
      cameraController,
      arcballCameraControllerRecord,
    );

  let transform =
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectArcballCameraControllerService.unsafeGetGameObject(
        cameraController,
        arcballCameraControllerRecord,
      ),
      gameObjectRecord,
    );

  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);

  let localToWorldMatrixTypeArray =
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
      transform,
      localToWorldMatrices,
      localToWorldMatrixCacheMap,
    );

  let (x1, x2, x3) =
    Matrix4Service.getX(localToWorldMatrixTypeArray)
    |> Vector3Service.normalize;

  let (y1, y2, y3) =
    Matrix4Service.getY(localToWorldMatrixTypeArray)
    |> Vector3Service.normalize;

  target
  |> Vector3Service.add(Vector3Type.Float, _, (x1 *. dx, 0., x3 *. dx))
  |> Vector3Service.add(Vector3Type.Float, _, (y1 *. dy, y2 *. dy, 0.));
};

let setAndGetTranslationTarget =
    (
      cameraController,
      {arcballCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let moveSpeedX =
    OperateArcballCameraControllerService.unsafeGetMoveSpeedX(
      cameraController,
      arcballCameraControllerRecord,
    );
  let moveSpeedY =
    OperateArcballCameraControllerService.unsafeGetMoveSpeedY(
      cameraController,
      arcballCameraControllerRecord,
    );
  let initPosition = (0., 0.);

  let (dx, dy) =
    OperateArcballCameraControllerService.hasDirection(
      cameraController,
      arcballCameraControllerRecord,
    ) ?
      OperateArcballCameraControllerService.unsafeGetDirectionArray(
        cameraController,
        arcballCameraControllerRecord,
      )
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. (dx, dy), direction) =>
             switch (direction) {
             | Left => (-. moveSpeedX, dy)
             | Right => (moveSpeedX, dy)
             | Up => (dx, moveSpeedY)
             | Down => (dx, -. moveSpeedY)
             },
           initPosition,
         ) :
      initPosition;

  let newTargetValue = _computeTarget(cameraController, (dx, dy), state);

  (
    newTargetValue,
    {
      ...state,
      arcballCameraControllerRecord:
        OperateArcballCameraControllerService.setTarget(
          cameraController,
          newTargetValue,
          arcballCameraControllerRecord,
        ),
    },
  );
};
/* let setTargetByKeyboardEvent =
       (
         cameraController,
         keyboardEvent: keyboardEvent,
         {arcballCameraControllerRecord, gameObjectRecord} as state,
       ) => {
     let moveSpeedX =
       OperateArcballCameraControllerService.unsafeGetMoveSpeedX(
         cameraController,
         arcballCameraControllerRecord,
       );
     let moveSpeedY =
       OperateArcballCameraControllerService.unsafeGetMoveSpeedY(
         cameraController,
         arcballCameraControllerRecord,
       );

     let (dx, dy) =
       switch (keyboardEvent.key) {
       | "a"
       | "left" => (-. moveSpeedX, 0.)
       | "d"
       | "right" => (moveSpeedX, 0.)
       | "w"
       | "up" => (0., moveSpeedY)
       | "s"
       | "down" => (0., -. moveSpeedY)
       | _ => (0., 0.)
       };

     switch (dx, dy) {
     | (0., 0.) => state
     | (dx, dy) => {
         ...state,
         arcballCameraControllerRecord:
           OperateArcballCameraControllerService.setTarget(
             cameraController,
             _computeTarget(cameraController, (dx, dy), state),
             arcballCameraControllerRecord,
           ),
       }
     };
   }; */