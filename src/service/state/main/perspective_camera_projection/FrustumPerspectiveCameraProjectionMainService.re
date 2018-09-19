open StateDataMainType;

let computeAspect = state => {
  let canvas = ViewService.getCanvas(state.viewRecord);

  switch (canvas) {
  | None => None
  | Some(canvas) =>
    let canvas = canvas |> WonderWebgl.DomExtendType.htmlElementToJsObj;

    canvas##width /. canvas##height |. Some;
  };
};

let getAspect = (cameraProjection, state) =>
  FrustumPerspectiveCameraProjectionService.getAspect(
    cameraProjection,
    state.perspectiveCameraProjectionRecord,
  );

let setAspect = (cameraProjection, aspect: float, state) => {
  FrustumPerspectiveCameraProjectionService.setAspect(
    cameraProjection,
    aspect,
    state.perspectiveCameraProjectionRecord,
  )
  |> ignore;

  state;
};

let removeAspect = (cameraProjection, state) => {
  FrustumPerspectiveCameraProjectionService.removeAspect(
    cameraProjection,
    state.perspectiveCameraProjectionRecord,
  )
  |> ignore;

  state;
};