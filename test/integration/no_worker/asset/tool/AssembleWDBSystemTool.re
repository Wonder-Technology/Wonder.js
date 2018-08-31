let buildGLTFJsonOfMultiSceneGameObjects = () =>
  ConvertGLBTool.buildGLTFJson(
    ~scenes=
      {|
        [
            {
                "nodes": [0,1]
            }
        ]
        |},
    ~nodes=
      {|
[
        {
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                20.0,
                30.0,
                1.0
            ],
            "mesh": 0
        },
        {
            "mesh": 0
        }
    ]

    |},
    (),
  );

let testGLTF =
    (
      ~sandbox,
      ~embeddedGLTFJsonStr,
      ~testFunc,
      ~state,
      ~binBuffer=GLBTool.buildBinBuffer(),
      ~isSetIMGUIFunc=true,
      ~isBindEvent=true,
      (),
    ) => {
  open Js.Promise;
  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  ConvertGLBSystem.convertGLBData((
    embeddedGLTFJsonStr |> Js.Json.parseExn,
    binBuffer,
  ))
  |. AssembleWholeWDBSystem.assemble((isSetIMGUIFunc, isBindEvent), state^)
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => testFunc(result^) |> resolve);
};

let testGLB = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  ConvertGLBTool.testResult(sandbox, glbFilePath, ((wd, binBuffer)) =>
    AssembleWholeWDBSystem.assembleWDBData(
      wd,
      binBuffer,
      (true, true),
      state,
    )
    |> WonderBsMost.Most.forEach(data => result := data)
    |> then_(() => testFunc(result^) |> resolve)
  );
};

let getAllChildrenTransform = (rootGameObject, state) =>
  GameObjectAPI.getAllChildrenTransform(rootGameObject, state);

let getAllSortedTransforms = (rootGameObject, state) => {
  let allTransformChildren = getAllChildrenTransform(rootGameObject, state);
  let allTransformChildren = allTransformChildren |> Js.Array.sortInPlace;
  [|
    GameObjectAPI.unsafeGetGameObjectTransformComponent(
      rootGameObject,
      state,
    ),
  |]
  |> Js.Array.concat(allTransformChildren);
};

let getAllGameObjects = (rootGameObject, state) =>
  GameObjectAPI.getAllGameObjects(rootGameObject, state);

let getAllMeshRenderers = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectMeshRendererComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectMeshRendererComponent(
         gameObject,
         state,
       )
     );

let getAllDirectionLightData = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectDirectionLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectDirectionLightComponent(
         gameObject,
         state,
       )
     )
  |> Js.Array.map(light =>
       (
         DirectionLightAPI.getDirectionLightColor(light, state),
         DirectionLightAPI.getDirectionLightIntensity(light, state),
       )
     );

let getAllPointLightData = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(light =>
       (
         PointLightAPI.getPointLightColor(light, state),
         PointLightAPI.getPointLightIntensity(light, state),
         PointLightAPI.getPointLightConstant(light, state),
         PointLightAPI.getPointLightLinear(light, state),
         PointLightAPI.getPointLightQuadratic(light, state),
         PointLightAPI.getPointLightRange(light, state),
       )
     );

let getAllGeometrys = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectGeometryComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectGeometryComponent(gameObject, state)
     );

let getAllGeometryData = (rootGameObject, state) =>
  getAllGeometrys(rootGameObject, state)
  |> Js.Array.map(geometry =>
       (
         GeometryAPI.unsafeGetGeometryName(geometry, state),
         (
           GeometryTool.getMainVertices(geometry, state),
           GeometryTool.getMainNormals(geometry, state),
           GeometryTool.getMainTexCoords(geometry, state),
           GeometryTool.getMainIndices(geometry, state),
         ),
       )
     );

let batchCreate = BatchCreateSystem.batchCreate;

let getAllBasicMaterials = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectBasicMaterialComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent(
         gameObject,
         state,
       )
     );

let getAllLightMaterials = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectLightMaterialComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
         gameObject,
         state,
       )
     );

let getAllDiffuseMaps = (rootGameObject, state) =>
  getAllLightMaterials(rootGameObject, state)
  |> Js.Array.filter(lightMaterial =>
       LightMaterialAPI.hasLightMaterialDiffuseMap(lightMaterial, state)
     )
  |> Js.Array.map(lightMaterial =>
       LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(lightMaterial, state)
     );

let isImageUint8ArrayMapEqual =
    (sourceImageUint8ArrayMap, targetImageUint8ArrayMap) =>
  Js.Typed_array.(
    sourceImageUint8ArrayMap
    |> SparseMapService.mapValid((. (mimeType, uint8Array)) =>
         (mimeType, uint8Array |> Uint8Array.byteLength |> Obj.magic)
       )
    |>
    Obj.magic == (
                   targetImageUint8ArrayMap
                   |> SparseMapService.mapValid(
                        (. (mimeType, uint8ArrayByteLength)) =>
                        (mimeType, uint8ArrayByteLength)
                      )
                 )
  );