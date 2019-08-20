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
      ~isHandleIMGUI=true,
      ~isBindEvent=true,
      ~isActiveCamera=true,
      ~isRenderLight=true,
      ~isLoadImage=true,
      (),
    ) => {
  open Js.Promise;
  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  ConvertGLBSystem.convertGLBData(
    embeddedGLTFJsonStr |> Js.Json.parseExn,
    binBuffer,
  )
  ->(
      AssembleWholeWDBSystem.assemble(
        (
          isHandleIMGUI,
          isBindEvent,
          isActiveCamera,
          isRenderLight,
          isLoadImage,
        ),
        state^,
      )
    )
  |> WonderBsMost.Most.forEach(data => { 
   /* WonderLog.Log.print(("data:", data)) |> ignore;  */
    
    result := data })
  |> then_(() => testFunc(result^) |> resolve);
};

let testGLBWithConfig =
    (
      ~sandbox,
      ~glbFilePath,
      ~testFunc,
      ~state,
      ~isHandleIMGUI=true,
      ~isBindEvent=true,
      ~isActiveCamera=true,
      ~isRenderLight=true,
      ~isLoadImage=true,
      (),
    ) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  ConvertGLBTool.testResult(sandbox, glbFilePath, ((wd, binBuffer)) =>
    AssembleWholeWDBSystem.assembleWDBData(
      wd,
      binBuffer,
      (
        isHandleIMGUI,
        isBindEvent,
        isActiveCamera,
        isRenderLight,
        isLoadImage,
      ),
      state,
    )
    |> WonderBsMost.Most.forEach(data => result := data)
    |> then_(() => testFunc(result^) |> resolve)
  );
};

let testWDB =
    (
      ~sandbox,
      ~wdbArrayBuffer,
      ~testFunc,
      ~state,
      ~isHandleIMGUI=true,
      ~isBindEvent=true,
      ~isActiveCamera=true,
      ~isRenderLight=true,
      ~isLoadImage=true,
      (),
    ) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  let (wdFileContent, _, binBuffer) =
    BufferUtils.decodeWDB(wdbArrayBuffer, AssembleWholeWDBSystem.checkWDB);

  AssembleWholeWDBSystem.assembleWDBData(
    wdFileContent |> Js.Json.parseExn |> Obj.magic,
    binBuffer,
    (isHandleIMGUI, isBindEvent, isActiveCamera, isRenderLight, isLoadImage),
    state,
  )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => testFunc(result^) |> resolve);
};

let testGLB = (sandbox, glbFilePath, testFunc, state) =>
  testGLBWithConfig(~sandbox, ~glbFilePath, ~testFunc, ~state, ());

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

let getAllChildrenData = allGameObjectData =>
  allGameObjectData |> Js.Array.sliceFrom(1);

let getAllGameObjectsIsActive = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectIsActive(gameObject, state)
     );

let getAllGameObjectsIsRoot = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectIsRoot(gameObject, state)
     );

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

let getAllDirectionLights = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectDirectionLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectDirectionLightComponent(
         gameObject,
         state,
       )
     );

let getAllDirectionLightData = (rootGameObject, state) =>
  getAllDirectionLights(rootGameObject, state)
  |> Js.Array.map(light =>
       (
         DirectionLightAPI.getDirectionLightColor(light, state),
         DirectionLightAPI.getDirectionLightIntensity(light, state),
       )
     );

let getAllPointLights = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectPointLightComponent(gameObject, state)
     );

let getAllPointLightData = (rootGameObject, state) =>
  getAllPointLights(rootGameObject, state)
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
           GeometryTool.getMainIndices16(geometry, state),
           GeometryTool.getMainIndices32(geometry, state),
         ),
       )
     );

let getAllScripts = (rootGameObject, state) =>
  getAllGameObjects(rootGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectScriptComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectScriptComponent(gameObject, state)
     );

/* let getAllScriptData = (rootGameObject, state) =>
   getAllScripts(rootGameObject, state)
   |> Js.Array.map(light =>
        (
          PointLightAPI.getPointLightColor(light, state),
          PointLightAPI.getPointLightIntensity(light, state),
          PointLightAPI.getPointLightConstant(light, state),
          PointLightAPI.getPointLightLinear(light, state),
          PointLightAPI.getPointLightQuadratic(light, state),
          PointLightAPI.getPointLightRange(light, state),
        )
      ); */

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
    |> WonderCommonlib.MutableSparseMapService.mapValid(
         (. (mimeType, uint8Array)) =>
         (mimeType, uint8Array |> Uint8Array.byteLength |> Obj.magic)
       )
    |> Obj.magic
    == (
         targetImageUint8ArrayMap
         |> WonderCommonlib.MutableSparseMapService.mapValid(
              (. (mimeType, uint8ArrayByteLength)) =>
              (mimeType, uint8ArrayByteLength)
            )
       )
  );

let isCubemapTextureImageUint8ArrayMapEqual =
    (sourceImageUint8ArrayMap, targetImageUint8ArrayMap) =>
  Js.Typed_array.(
    sourceImageUint8ArrayMap
    |> WonderCommonlib.MutableSparseMapService.mapValid(
         (.
           {
             pxImageUint8ArrayData: (mimeType1, u1),
             nxImageUint8ArrayData: (mimeType2, u2),
             pyImageUint8ArrayData: (mimeType3, u3),
             nyImageUint8ArrayData: (mimeType4, u4),
             pzImageUint8ArrayData: (mimeType5, u5),
             nzImageUint8ArrayData: (mimeType6, u6),
           }: TextureimageUint8ArrayType.cubemapTextureImageUint8ArrayData,
         ) =>
         (
           {
             pxImageUint8ArrayData: (
               mimeType1,
               u1 |> Uint8Array.byteLength |> Obj.magic,
             ),
             nxImageUint8ArrayData: (
               mimeType2,
               u2 |> Uint8Array.byteLength |> Obj.magic,
             ),
             pyImageUint8ArrayData: (
               mimeType3,
               u3 |> Uint8Array.byteLength |> Obj.magic,
             ),
             nyImageUint8ArrayData: (
               mimeType4,
               u4 |> Uint8Array.byteLength |> Obj.magic,
             ),
             pzImageUint8ArrayData: (
               mimeType5,
               u5 |> Uint8Array.byteLength |> Obj.magic,
             ),
             nzImageUint8ArrayData: (
               mimeType6,
               u6 |> Uint8Array.byteLength |> Obj.magic,
             ),
           }: TextureimageUint8ArrayType.cubemapTextureImageUint8ArrayData
         )
       )
    |> Obj.magic
    == (
         targetImageUint8ArrayMap
         |> WonderCommonlib.MutableSparseMapService.mapValid((. data) => data)
       )
  );