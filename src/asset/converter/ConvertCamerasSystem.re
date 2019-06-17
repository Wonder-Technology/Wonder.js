let _convertToBasicCameraViewsByCameras = cameras =>
  switch (cameras) {
  | Some(cameras) when Js.Array.length(cameras) > 0 =>
    cameras
    |> Js.Array.sliceFrom(1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, _) =>
           arr
           |> ArrayService.push({isActive: false}: WDType.basicCameraView),
         [|{isActive: true}|],
       )
  | _ => [||]
  };

let convertToBasicCameraViews = ({cameras, extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => _convertToBasicCameraViewsByCameras(cameras)
  | Some({basicCameraViews}) =>
    switch (basicCameraViews) {
    | Some(basicCameraViews) when Js.Array.length(basicCameraViews) > 0 =>
      basicCameraViews
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. arr, {isActive}: GLTFType.basicCameraView) =>
             arr
             |> ArrayService.push(
                  {isActive: isActive}: WDType.basicCameraView,
                ),
           [||],
         )
    | _ => _convertToBasicCameraViewsByCameras(cameras)
    }
  };

let _getFirstNodeIndexWhichUseFirstCamera = nodes => {
  let firstCameraIndex = 0;

  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. index, {camera}: GLTFType.node, i) =>
         switch (camera) {
         | Some(camera) when camera === firstCameraIndex => Some(i)
         | _ => index
         },
       None,
     );
};

let _getFirstNodeIndexWhichUseBasicCameraView = (nodes, basicCameraViewIndex) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. index, {extras}: GLTFType.node, i) =>
         switch (extras) {
         | Some({basicCameraView}) =>
           switch (basicCameraView) {
           | Some(basicCameraView)
               when basicCameraView === basicCameraViewIndex =>
             Some(i)
           | _ => index
           }
         | _ => index
         },
       None,
     );

let _getActiveBasicCameraViewIndex = basicCameraViews =>
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|should has one active basicCameraView|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 basicCameraViews
                 |> Js.Array.filter(({isActive}: GLTFType.basicCameraView) =>
                      isActive === true
                    )
                 |> Js.Array.length == 1
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
  basicCameraViews
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. index, {isActive}: GLTFType.basicCameraView, i) =>
         isActive === true ? Some(i) : index,
       None,
     );

let getActiveCameraNodeIndex = ({nodes, cameras, extras}: GLTFType.gltf) =>
  switch (extras) {
  | None =>
    switch (cameras) {
    | Some(cameras) when Js.Array.length(cameras) > 0 =>
      _getFirstNodeIndexWhichUseFirstCamera(nodes)
    | _ => None
    }
  | Some({basicCameraViews}) =>
    switch (basicCameraViews) {
    | Some(basicCameraViews) when Js.Array.length(basicCameraViews) > 0 =>
      switch (_getActiveBasicCameraViewIndex(basicCameraViews)) {
      | None => None
      | Some(basicCameraViewIndex) =>
        basicCameraViewIndex
        |> _getFirstNodeIndexWhichUseBasicCameraView(nodes)
      }
    | _ => _getFirstNodeIndexWhichUseFirstCamera(nodes)
    }
  };

let _convertRadiansToDegree = angle => angle *. 180. /. Js.Math._PI;

let convertToPerspectiveCameraProjections = ({cameras}: GLTFType.gltf) =>
  switch (cameras) {
  | None => [||]
  | Some(cameras) =>
    cameras
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {type_, perspective}: GLTFType.camera) =>
           switch (type_) {
           | "perspective" =>
             let {aspectRatio, yfov, zfar, znear}: GLTFType.perspective =
               perspective |> OptionService.unsafeGet;
             arr
             |> ArrayService.push(
                  {
                    near: znear,
                    far: zfar,
                    fovy: yfov |> _convertRadiansToDegree,
                    aspect: aspectRatio,
                  }: WDType.perspectiveCameraProjection,
                );
           | _ => arr
           },
         [||],
       )
  };

let convertToFlyCameraControllers = ({extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => [||]
  | Some({flyCameraControllers}) =>
    switch (flyCameraControllers) {
    | None => [||]
    | Some(flyCameraControllers) => flyCameraControllers
    /* |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, data) => arr |> ArrayService.push(data),
         [||],
       ) */
    }
  };
let convertToArcballCameraControllers = ({extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => [||]
  | Some({arcballCameraControllers}) =>
    switch (arcballCameraControllers) {
    | None => [||]
    | Some(arcballCameraControllers) => arcballCameraControllers
    /* |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, data) => arr |> ArrayService.push(data),
         [||],
       ) */
    }
  };