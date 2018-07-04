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

let _convertToTransformGameObjectIndexData = nodes => {
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

let _convertToChildrenTransformIndexData =
    (transformGameObjectIndexData: WDType.componentGameObjectIndexData, nodes) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|every node should has one transform component|j},
                ~actual={j|not|j},
              ),
              () =>
              transformGameObjectIndexData.gameObjectIndices
              |> Js.Array.length == (nodes |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let (parentTransformIndices, childrenTransformIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (parentTransformIndices, childrenTransformIndices),
           {children}: GLTFType.node,
           index,
         ) =>
           switch (children) {
           | None => (parentTransformIndices, childrenTransformIndices)
           | Some(children) => (
               parentTransformIndices |> ArrayService.push(index),
               childrenTransformIndices |> ArrayService.push(children),
             )
           },
         ([||], [||]),
       );
  (
    {parentTransformIndices, childrenTransformIndices}: WDType.childrenTransformIndexData
  )
  |> WonderLog.Contract.ensureCheck(
       (
         {parentTransformIndices, childrenTransformIndices}: WDType.childrenTransformIndexData,
       ) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect=
                     {j|parentTransformIndices' count === childrenTransformIndices' count|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 parentTransformIndices
                 |>
                 Js.Array.length == (
                                      childrenTransformIndices
                                      |> Js.Array.length
                                    )
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

let _convertToBasicCameraViewGameObjectIndexData = (nodes, cameras) => {
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

let _convertToPerspectiveCameraProjectionGameObjectIndexData =
    (nodes, cameras)
    : WDType.componentGameObjectIndexData =>
  switch (cameras) {
  | None => {gameObjectIndices: [||], componentIndices: [||]}
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

let _convertToLightMaterialGameObjectIndexData = (nodes, meshes, materials) => {
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

let _convertToGeometryGameObjectIndexData = nodes => {
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

let _convertToLightGameObjectIndexData =
    (lightType, nodes, extensions)
    : WDType.componentGameObjectIndexData =>
  switch (extensions) {
  | None => {gameObjectIndices: [||], componentIndices: [||]}
  | Some(({khr_lights}: GLTFType.extensions)) =>
    switch (khr_lights) {
    | None => {gameObjectIndices: [||], componentIndices: [||]}
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

let convertToGameObjectIndexData =
    ({scenes, nodes, meshes, cameras, materials, extensions}: GLTFType.gltf)
    : WDType.gameObjectIndices => {
  let transformGameObjectIndexData =
    _convertToTransformGameObjectIndexData(nodes);
  {
    transformGameObjectIndexData,
    childrenTransformIndexData:
      _convertToChildrenTransformIndexData(
        transformGameObjectIndexData,
        nodes,
      ),
    basicCameraViewGameObjectIndexData:
      _convertToBasicCameraViewGameObjectIndexData(nodes, cameras),
    perspectiveCameraProjectionGameObjectIndexData:
      _convertToPerspectiveCameraProjectionGameObjectIndexData(
        nodes,
        cameras,
      ),
    lightMaterialGameObjectIndexData:
      _convertToLightMaterialGameObjectIndexData(nodes, meshes, materials),
    customGeometryGameObjectIndexData:
      _convertToGeometryGameObjectIndexData(nodes),
    directionLightGameObjectIndexData:
      _convertToLightGameObjectIndexData("directional", nodes, extensions),
    pointLightGameObjectIndexData:
      _convertToLightGameObjectIndexData("point", nodes, extensions),
  };
};