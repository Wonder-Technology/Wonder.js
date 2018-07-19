let _checkGameObjectAndComponentIndicesCountShouldEqual =
    (
      (
        {gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData
      ) as componentGameObjectIndexData,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|gameObjectIndices' count === componentIndices' count|j},
                ~actual={j|not|j},
              ),
              () =>
              gameObjectIndices
              |> Js.Array.length == (componentIndices |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  componentGameObjectIndexData;
};

let convertToTransformGameObjectIndexData = nodes => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. (gameObjectIndices, componentIndices), _, index) => (
           gameObjectIndices |> ArrayService.push(index),
           componentIndices |> ArrayService.push(index),
         ),
         ([||], [||]),
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual
  |> WonderLog.Contract.ensureCheck(
       (
         {gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData,
       ) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|every node should has one transform component|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 gameObjectIndices
                 |> Js.Array.length == (nodes |> Js.Array.length)
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};

let _checkEveryComponentShouldHasGameObject =
    (nodes, componentGameObjectIndexData) =>
  componentGameObjectIndexData
  |> WonderLog.Contract.ensureCheck(
       componentGameObjectIndexData =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|every component should has gameObject|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 componentGameObjectIndexData
                 |> WonderCommonlib.ArrayService.forEach((. index) => {
                      index >= 0;
                      index <= ConvertCommon.getCount(nodes);
                    })
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let convertToBasicCameraViewGameObjectIndexData = nodes => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {camera}: GLTFType.node,
           index,
         ) =>
           switch (camera) {
           | None => (gameObjectIndices, componentIndices)
           | Some(camera) => (
               gameObjectIndices |> ArrayService.push(index),
               componentIndices |> ArrayService.push(camera),
             )
           },
         ([||], [||]),
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

let _buildPerspectiveCameraActualIndexMap = cameras =>
  cameras
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (perspectiveCameraActualIndexMap, perspectiveCameraActualIndex),
         {type_}: GLTFType.camera,
         perspectiveCameraIndex,
       ) =>
         switch (type_) {
         | "perspective" => (
             perspectiveCameraActualIndexMap
             |> WonderCommonlib.SparseMapService.set(
                  perspectiveCameraIndex,
                  perspectiveCameraActualIndex,
                ),
             perspectiveCameraActualIndex |> succ,
           )
         | _ => (
             perspectiveCameraActualIndexMap,
             perspectiveCameraActualIndex,
           )
         },
       (WonderCommonlib.SparseMapService.createEmpty(), 0),
     );

let _buildPerspectiveCameraProjectionGameObjectIndexData =
    (nodes, cameras, perspectiveCameraActualIndexMap) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (gameObjectIndices, componentIndices),
         {camera}: GLTFType.node,
         index,
       ) =>
         switch (camera) {
         | None => (gameObjectIndices, componentIndices)
         | Some(camera) =>
           let {type_}: GLTFType.camera = Array.unsafe_get(cameras, camera);
           switch (type_) {
           | "perspective" => (
               gameObjectIndices |> ArrayService.push(index),
               componentIndices
               |> ArrayService.push(
                    perspectiveCameraActualIndexMap
                    |> WonderCommonlib.SparseMapService.unsafeGet(camera),
                  ),
             )
           | _ => (gameObjectIndices, componentIndices)
           };
         },
       ([||], [||]),
     );

let buildEmptyGameObjectIndexData = () : WDType.componentGameObjectIndexData => {
  gameObjectIndices: [||],
  componentIndices: [||],
};

let convertToPerspectiveCameraProjectionGameObjectIndexData =
    (nodes, cameras)
    : WDType.componentGameObjectIndexData =>
  switch (cameras) {
  | None => buildEmptyGameObjectIndexData()
  | Some(cameras) =>
    let (perspectiveCameraActualIndexMap, _) =
      _buildPerspectiveCameraActualIndexMap(cameras);

    let (gameObjectIndices, componentIndices) =
      _buildPerspectiveCameraProjectionGameObjectIndexData(
        nodes,
        cameras,
        perspectiveCameraActualIndexMap,
      );

    (
      {gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData
    )
    |> _checkGameObjectAndComponentIndicesCountShouldEqual;
  };

let convertToArcballCameraControllerGameObjectIndexData =
    nodes
    : WDType.componentGameObjectIndexData => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {extras}: GLTFType.node,
           index,
         ) =>
           switch (extras) {
           | None => (gameObjectIndices, componentIndices)
           | Some(({cameraController}: GLTFType.nodeExtras)) =>
             switch (cameraController) {
             | None => (gameObjectIndices, componentIndices)
             | Some(cameraController) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices |> ArrayService.push(cameraController),
               )
             }
           },
         ([||], [||]),
       );

  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

let _convertToLightMaterialGameObjectIndexDataFromExtras =
    (material, (gameObjectIndices, componentIndices), index) =>
  switch (material) {
  | None => (gameObjectIndices, componentIndices)
  | Some(material) => (
      gameObjectIndices |> ArrayService.push(index),
      componentIndices |> ArrayService.push(material),
    )
  };

let _convertToLightMaterialGameObjectIndexDataFromMesh =
    (mesh, meshes, (gameObjectIndices, componentIndices), index) =>
  switch (mesh) {
  | None => (gameObjectIndices, componentIndices)
  | Some(mesh) =>
    let {primitives}: GLTFType.mesh = Array.unsafe_get(meshes, mesh);
    let {material}: GLTFType.primitive =
      ConvertCommon.getPrimitiveData(primitives);
    switch (material) {
    | None => (gameObjectIndices, componentIndices)
    | Some(material) => (
        gameObjectIndices |> ArrayService.push(index),
        componentIndices |> ArrayService.push(material),
      )
    };
  };

let convertToLightMaterialGameObjectIndexData = (nodes, meshes, materials) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {mesh, extras}: GLTFType.node,
           index,
         ) =>
           switch (extras) {
           | None =>
             _convertToLightMaterialGameObjectIndexDataFromMesh(
               mesh,
               meshes,
               (gameObjectIndices, componentIndices),
               index,
             )
           | Some({material}) =>
             _convertToLightMaterialGameObjectIndexDataFromExtras(
               material,
               (gameObjectIndices, componentIndices),
               index,
             )
           },
         ([||], [||]),
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

let convertToGeometryGameObjectIndexData = nodes => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {mesh}: GLTFType.node,
           index,
         ) =>
           switch (mesh) {
           | None => (gameObjectIndices, componentIndices)
           | Some(mesh) => (
               gameObjectIndices |> ArrayService.push(index),
               componentIndices |> ArrayService.push(mesh),
             )
           },
         ([||], [||]),
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

let _getLightActualIndexMap = (lightType, lights) =>
  lights
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (lightActualIndexMap, lightActualIndex),
         {type_}: GLTFType.light,
         lightIndex,
       ) =>
         switch (type_) {
         | type_ when type_ === lightType => (
             lightActualIndexMap
             |> WonderCommonlib.SparseMapService.set(
                  lightIndex,
                  lightActualIndex,
                ),
             lightActualIndex |> succ,
           )
         | _ => (lightActualIndexMap, lightActualIndex)
         },
       (WonderCommonlib.SparseMapService.createEmpty(), 0),
     );

let _buildLightGameObjectIndexData =
    (nodes, lights, lightType, lightActualIndexMap) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         (gameObjectIndices, componentIndices),
         {extensions}: GLTFType.node,
         index,
       ) =>
         switch (extensions) {
         | None => (gameObjectIndices, componentIndices)
         | Some(({khr_lights}: GLTFType.nodeExtensions)) =>
           switch (khr_lights) {
           | None => (gameObjectIndices, componentIndices)
           | Some({light}) =>
             let {type_}: GLTFType.light = Array.unsafe_get(lights, light);
             switch (type_) {
             | type_ when type_ === lightType => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices
                 |> ArrayService.push(
                      lightActualIndexMap
                      |> WonderCommonlib.SparseMapService.unsafeGet(light),
                    ),
               )
             | _ => (gameObjectIndices, componentIndices)
             };
           }
         },
       ([||], [||]),
     );

let convertToLightGameObjectIndexData =
    (lightType, nodes, extensions)
    : WDType.componentGameObjectIndexData =>
  switch (extensions) {
  | None => buildEmptyGameObjectIndexData()
  | Some(({khr_lights}: GLTFType.extensions)) =>
    switch (khr_lights) {
    | None => buildEmptyGameObjectIndexData()
    | Some({lights}) =>
      let (lightActualIndexMap, _) =
        _getLightActualIndexMap(lightType, lights);
      let (gameObjectIndices, componentIndices) =
        _buildLightGameObjectIndexData(
          nodes,
          lights,
          lightType,
          lightActualIndexMap,
        );
      (
        {gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData
      )
      |> _checkGameObjectAndComponentIndicesCountShouldEqual;
    }
  };