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

let setAspect = (cameraProjection, aspect: float, state) => {
  FrustumPerspectiveCameraProjectionService.setAspect(
    cameraProjection,
    aspect,
    state.perspectiveCameraProjectionRecord,
  )
  |> ignore;

  state;
};