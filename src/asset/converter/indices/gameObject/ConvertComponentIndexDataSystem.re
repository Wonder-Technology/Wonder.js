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

let _convertToGameObjectIndexDataFromExtras =
    (component, (gameObjectIndices, componentIndices), index) => (
  gameObjectIndices |> ArrayService.push(index),
  componentIndices |> ArrayService.push(component),
);

let convertToBasicCameraViewGameObjectIndexData = nodes => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {camera, extras}: GLTFType.node,
           index,
         ) =>
           switch (extras) {
           | Some({basicCameraView}) when basicCameraView |> Js.Option.isSome =>
             _convertToGameObjectIndexDataFromExtras(
               basicCameraView |> OptionService.unsafeGet,
               (gameObjectIndices, componentIndices),
               index,
             )
           | _ =>
             switch (camera) {
             | None => (gameObjectIndices, componentIndices)
             | Some(camera) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices |> ArrayService.push(camera),
               )
             }
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
             |> WonderCommonlib.MutableSparseMapService.set(
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
       (WonderCommonlib.MutableSparseMapService.createEmpty(), 0),
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
                    |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                         camera,
                       ),
                  ),
             )
           | _ => (gameObjectIndices, componentIndices)
           };
         },
       ([||], [||]),
     );

let buildEmptyGameObjectIndexData = (): WDType.componentGameObjectIndexData => {
  gameObjectIndices: [||],
  componentIndices: [||],
};

let convertToPerspectiveCameraProjectionGameObjectIndexData =
    (nodes, cameras): WDType.componentGameObjectIndexData =>
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

let convertToFlyCameraControllerGameObjectIndexData =
    nodes: WDType.componentGameObjectIndexData => {
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
           | Some(({flyCameraController}: GLTFType.nodeExtras)) =>
             switch (flyCameraController) {
             | None => (gameObjectIndices, componentIndices)
             | Some(flyCameraController) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices |> ArrayService.push(flyCameraController),
               )
             }
           },
         ([||], [||]),
       );

  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

let convertToArcballCameraControllerGameObjectIndexData =
    nodes: WDType.componentGameObjectIndexData => {
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
           | Some(({arcballCameraController}: GLTFType.nodeExtras)) =>
             switch (arcballCameraController) {
             | None => (gameObjectIndices, componentIndices)
             | Some(arcballCameraController) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices
                 |> ArrayService.push(arcballCameraController),
               )
             }
           },
         ([||], [||]),
       );

  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

let convertToScriptGameObjectIndexData =
    nodes: WDType.componentGameObjectIndexData => {
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
           | Some(({script}: GLTFType.nodeExtras)) =>
             switch (script) {
             | None => (gameObjectIndices, componentIndices)
             | Some(script) => (
                 gameObjectIndices |> ArrayService.push(index),
                 componentIndices |> ArrayService.push(script),
               )
             }
           },
         ([||], [||]),
       );

  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
};

/* let _isLines = mode => mode === 1;

   let _isTriangles = mode => mode === 4; */

/* let _convertToBasicMaterialGameObjectIndexDataFromMesh =
     (mesh, meshes, (gameObjectIndices, componentIndices), index) =>
   switch (mesh) {
   | None => (gameObjectIndices, componentIndices)
   | Some(mesh) =>
     let {primitives}: GLTFType.mesh = Array.unsafe_get(meshes, mesh);
     let {material, mode}: GLTFType.primitive =
       ConvertCommon.getPrimitiveData(primitives);
     switch (material, mode) {
     | (Some(material), Some(mode)) when _isLines(mode) => (
         gameObjectIndices |> ArrayService.push(index),
         componentIndices |> ArrayService.push(material),
       )
     | (None, _) => (gameObjectIndices, componentIndices)
     };
   }; */

let convertToBasicMaterialGameObjectIndexData = (nodes, meshes, materials) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {mesh, extras}: GLTFType.node,
           index,
         ) =>
           switch (extras) {
           | Some({basicMaterial}) when basicMaterial |> Js.Option.isSome =>
             _convertToGameObjectIndexDataFromExtras(
               basicMaterial |> OptionService.unsafeGet,
               (gameObjectIndices, componentIndices),
               index,
             )
           | _ => (gameObjectIndices, componentIndices)
           },
         ([||], [||]),
       );
  ({gameObjectIndices, componentIndices}: WDType.componentGameObjectIndexData)
  |> _checkGameObjectAndComponentIndicesCountShouldEqual;
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
    /* | (Some(material), Some(mode)) when ! _isLines(mode) => ( */
    | Some(material) => (
        gameObjectIndices |> ArrayService.push(index),
        componentIndices |> ArrayService.push(material),
      )
    | None => (gameObjectIndices, componentIndices)
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
           | Some({lightMaterial}) when lightMaterial |> Js.Option.isSome =>
             _convertToGameObjectIndexDataFromExtras(
               lightMaterial |> OptionService.unsafeGet,
               (gameObjectIndices, componentIndices),
               index,
             )
           | _ =>
             _convertToLightMaterialGameObjectIndexDataFromMesh(
               mesh,
               meshes,
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

let _convertToMeshRendererGameObjectIndexDataFromMesh =
    (meshes, mesh, index, (gameObjectIndices, componentIndices)) =>
  switch (mesh) {
  | None => (gameObjectIndices, componentIndices)
  | Some(mesh) =>
    Array.unsafe_get(meshes, mesh) |> ConvertMeshUtils.doesMeshHasMaterial ?
      (
        gameObjectIndices |> ArrayService.push(index),
        componentIndices
        |> ArrayService.push((gameObjectIndices |> Js.Array.length) - 1),
      ) :
      (gameObjectIndices, componentIndices)
  };

let convertToMeshRendererGameObjectIndexData = (nodes, meshes) => {
  let (gameObjectIndices, componentIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (gameObjectIndices, componentIndices),
           {mesh, extras}: GLTFType.node,
           index,
         ) =>
           switch (extras) {
           | Some({meshRenderer}) when meshRenderer |> Js.Option.isSome =>
             _convertToGameObjectIndexDataFromExtras(
               meshRenderer |> OptionService.unsafeGet,
               (gameObjectIndices, componentIndices),
               index,
             )
           | _ =>
             _convertToMeshRendererGameObjectIndexDataFromMesh(
               meshes,
               mesh,
               index,
               (gameObjectIndices, componentIndices),
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
             |> WonderCommonlib.MutableSparseMapService.set(
                  lightIndex,
                  lightActualIndex,
                ),
             lightActualIndex |> succ,
           )
         | _ => (lightActualIndexMap, lightActualIndex)
         },
       (WonderCommonlib.MutableSparseMapService.createEmpty(), 0),
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
                      |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                           light,
                         ),
                    ),
               )
             | _ => (gameObjectIndices, componentIndices)
             };
           }
         },
       ([||], [||]),
     );

let convertToLightGameObjectIndexData =
    (lightType, nodes, extensions): WDType.componentGameObjectIndexData =>
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