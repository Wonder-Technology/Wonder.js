open CameraControllerType;

let handleCloneComponent =
    (sourceComponent: cameraController, countRangeArr: array(int), state: StateDataType.state) => {
  /* TODO judge is perspective camera or other camera */
  open PerspectiveCameraOperateCommon;
  let cameraData = CameraControllerStateCommon.getPerspectiveCameraData(state);
  let near = getNear(sourceComponent, cameraData) |> Js.Option.getExn;
  let far = getFar(sourceComponent, cameraData) |> Js.Option.getExn;
  let fovy = getFovy(sourceComponent, cameraData) |> Js.Option.getExn;
  let aspect = getAspect(sourceComponent, cameraData) |> Js.Option.getExn;
  countRangeArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((state, componentArr), _) => {
           let (state, index) = CameraControllerCreateCommon.create(state);
           (
             state
             |> setNear(index, near)
             |> setFar(index, far)
             |> setFovy(index, fovy)
             |> setAspect(index, aspect),
             componentArr |> ArraySystem.push(index)
           )
         }
       ),
       (state, [||])
     )
};