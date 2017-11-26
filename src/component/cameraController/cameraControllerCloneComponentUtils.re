open CameraControllerType;

let handleCloneComponent =
    (sourceComponent: cameraController, countRangeArr: array(int), state: StateDataType.state) => {
  /* todo judge is perspective camera or other camera */
  open PerspectiveCameraOperateDataUtils;
  let cameraData = CameraControllerStateUtils.getPerspectiveCameraData(state);
  let near = getNear(sourceComponent, cameraData) |> Js.Option.getExn;
  let far = getFar(sourceComponent, cameraData) |> Js.Option.getExn;
  let fovy = getFovy(sourceComponent, cameraData) |> Js.Option.getExn;
  let aspect = getAspect(sourceComponent, cameraData) |> Js.Option.getExn;
  let componentArr = [||];
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = CameraControllerCreateUtils.create(state);
             let state =
               state
               |> setNear(index, near)
               |> setFar(index, far)
               |> setFovy(index, fovy)
               |> setAspect(index, aspect);
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  (state, componentArr)
};