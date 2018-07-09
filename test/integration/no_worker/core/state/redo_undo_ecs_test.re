open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo component data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _prepareMeshRendererData = state => {
      let (state, gameObject1, meshRenderer1) =
        MeshRendererTool.createBasicMaterialGameObject(state^);
      let (state, gameObject2, meshRenderer2) =
        MeshRendererTool.createLightMaterialGameObject(state);
      let (state, gameObject3, meshRenderer3) =
        MeshRendererTool.createBasicMaterialGameObject(state);
      let state =
        state
        |> GameObjectTool.disposeGameObjectMeshRendererComponent(
             gameObject3,
             meshRenderer3,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        meshRenderer1,
        meshRenderer2,
        meshRenderer3,
      );
    };
    let _prepareTransformMatrixData = state => {
      let (state, gameObject1, transform1) =
        GameObjectTool.createGameObject(state^);
      let (state, gameObject2, transform2) =
        GameObjectTool.createGameObject(state);
      let (state, gameObject3, transform3) =
        GameObjectTool.createGameObject(state);
      let state =
        TransformAPI.setTransformParent(
          Js.Nullable.return(transform1),
          transform2,
          state,
        );
      let pos1 = (1., 2., 3.);
      let pos2 = (2., 4., 10.);
      let pos3 = ((-1.), 4., 5.);
      let state =
        TransformAPI.setTransformLocalPosition(transform1, pos1, state);
      let state =
        TransformAPI.setTransformLocalPosition(transform2, pos2, state);
      let state =
        TransformAPI.setTransformLocalPosition(transform3, pos3, state);

      let rotation1 = ((-2.5), 1., 0., 1.);
      let scale1 = (2., 2., 2.5);
      let state =
        state
        |> TransformAPI.setTransformLocalRotation(transform1, rotation1)
        |> TransformAPI.setTransformLocalScale(transform1, scale1);

      let state =
        state
        |> GameObjectTool.disposeGameObjectTransformComponent(
             gameObject3,
             transform3,
             false,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        transform1,
        transform2,
        transform3,
      );
    };
    let _prepareBasicCameraViewData = state => {
      let (state, gameObject1, _, (basicCameraView1, _)) =
        CameraTool.createCameraGameObject(state^);
      let (state, gameObject2, _, (basicCameraView2, _)) =
        CameraTool.createCameraGameObject(state);
      let (state, gameObject3, _, (basicCameraView3, _)) =
        CameraTool.createCameraGameObject(state);
      /* let state = state |> setPerspectiveCameraProjectionNear(basicCameraView2, 0.2);
         let state = state |> setPerspectiveCameraProjectionFar(basicCameraView2, 100.);
         let state = state |> setPerspectiveCameraProjectionFar(basicCameraView3, 100.);
         let state = state |> setPerspectiveCameraProjectionAspect(basicCameraView1, 1.);
         let state = state |> setPerspectiveCameraProjectionAspect(basicCameraView2, 2.);
         let state = state |> setPerspectiveCameraProjectionFovy(basicCameraView2, 60.); */
      /* let state = state |> BasicCameraViewTool.update; */
      let state =
        state
        |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
             gameObject3,
             basicCameraView3,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        basicCameraView1,
        basicCameraView2,
        basicCameraView3,
      );
    };
    let _preparePerspectiveCameraProjectionData = state => {
      open PerspectiveCameraProjectionAPI;
      let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
        CameraTool.createCameraGameObject(state^);
      let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
        CameraTool.createCameraGameObject(state);
      let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
        CameraTool.createCameraGameObject(state);
      let state =
        state |> setPerspectiveCameraProjectionNear(perspectiveCameraProjection2, 0.2);
      let state =
        state |> setPerspectiveCameraProjectionFar(perspectiveCameraProjection2, 100.);
      let state =
        state |> setPerspectiveCameraProjectionFar(perspectiveCameraProjection3, 100.);
      let state =
        state |> setPerspectiveCameraProjectionAspect(perspectiveCameraProjection1, 1.);
      let state =
        state |> setPerspectiveCameraProjectionAspect(perspectiveCameraProjection2, 2.);
      let state =
        state |> setPerspectiveCameraProjectionFovy(perspectiveCameraProjection2, 60.);
      let state = state |> PerspectiveCameraProjectionTool.update;
      let state =
        state
        |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
             gameObject3,
             perspectiveCameraProjection3,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        perspectiveCameraProjection1,
        perspectiveCameraProjection2,
        perspectiveCameraProjection3,
      );
    };
    let _prepareBasicMaterialData = state => {
      open BasicMaterialAPI;
      open Js.Typed_array;
      let (state, gameObject1, material1) =
        BasicMaterialTool.createGameObject(state^);
      let (state, gameObject2, material2) =
        BasicMaterialTool.createGameObject(state);
      let (state, gameObject3, material3) =
        BasicMaterialTool.createGameObject(state);
      let state = AllMaterialTool.prepareForInit(state);
      /* let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
         let state = BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state); */
      let state =
        state |> setBasicMaterialColor(material2, [|1., 0.5, 0.0|]);
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        material1,
        material2,
        material3,
      );
    };
    let _prepareLightMaterialData = state => {
      open LightMaterialAPI;
      open Js.Typed_array;
      let (state, gameObject1, material1) =
        LightMaterialTool.createGameObject(state^);
      let (state, gameObject2, material2) =
        LightMaterialTool.createGameObject(state);
      let (state, gameObject3, material3) =
        LightMaterialTool.createGameObject(state);
      let state = AllMaterialTool.prepareForInit(state);
      /* let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
         let state = LightMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state); */
      let diffuseColor2 = [|1., 0.5, 0.0|];
      let specularColor2 = [|0., 1.0, 0.5|];
      let state =
        state |> setLightMaterialDiffuseColor(material2, diffuseColor2);
      let state =
        state |> setLightMaterialSpecularColor(material2, specularColor2);
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        material1,
        material2,
        material3,
      );
    };
    let _prepareBasicSourceTextureData = state => {
      open BasicSourceTextureAPI;
      open Js.Typed_array;
      open SourceTextureType;
      let (state, texture1) = createBasicSourceTexture(state);
      let (state, texture2) = createBasicSourceTexture(state);
      let (state, texture3) = createBasicSourceTexture(state);
      let state = AllMaterialTool.prepareForInit(state);
      let state =
        state |> setBasicSourceTextureWrapS(texture2, MIRRORED_REPEAT);
      let state =
        state |> setBasicSourceTextureWrapT(texture2, MIRRORED_REPEAT);
      let state = state |> setBasicSourceTextureMagFilter(texture2, LINEAR);
      let state = state |> setBasicSourceTextureMinFilter(texture2, LINEAR);
      let state = state |> setBasicSourceTextureType(texture2, 1);
      let state = state |> setBasicSourceTextureFormat(texture2, ALPHA);
      (state, texture1, texture2, texture3);
    };
    let _prepareArrayBufferViewSourceTextureData = state => {
      open ArrayBufferViewSourceTextureAPI;
      open Js.Typed_array;
      open SourceTextureType;
      let (state, texture1) = createArrayBufferViewSourceTexture(state);
      let (state, texture2) = createArrayBufferViewSourceTexture(state);
      let (state, texture3) = createArrayBufferViewSourceTexture(state);
      let state = AllMaterialTool.prepareForInit(state);
      let state =
        state
        |> setArrayBufferViewSourceTextureWrapS(texture2, MIRRORED_REPEAT);
      let state =
        state
        |> setArrayBufferViewSourceTextureWrapT(texture2, MIRRORED_REPEAT);
      let state =
        state |> setArrayBufferViewSourceTextureMagFilter(texture2, LINEAR);
      let state =
        state |> setArrayBufferViewSourceTextureMinFilter(texture2, LINEAR);
      let state = state |> setArrayBufferViewSourceTextureType(texture2, 1);
      let state = state |> setArrayBufferViewSourceTextureFormat(texture2, 2);
      let state = state |> setArrayBufferViewSourceTextureWidth(texture2, 2);
      let state = state |> setArrayBufferViewSourceTextureHeight(texture2, 4);
      (state, texture1, texture2, texture3);
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("deep copy meshRenderer record", () => {
      test("copied record should equal to source record", () => {
        open MeshRendererType;
        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          meshRenderer1,
          meshRenderer2,
          meshRenderer3,
        ) =
          _prepareMeshRendererData(state);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        MeshRendererTool.getMeshRendererRecord(copiedState)
        |>
        expect == {
                    index: 3,
                    basicMaterialRenderGameObjectArray: [|gameObject1|],
                    lightMaterialRenderGameObjectArray: [|gameObject2|],
                    gameObjectMap: [|
                      gameObject1,
                      gameObject2,
                      Js.Undefined.empty |> Obj.magic,
                    |],
                    disposedIndexArray: [|meshRenderer3|],
                  };
      });
      test("changing copied state shouldn't affect source state", () => {
        open MeshRendererType;
        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          meshRenderer1,
          meshRenderer2,
          meshRenderer3,
        ) =
          _prepareMeshRendererData(state);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let {
              basicMaterialRenderGameObjectArray,
              lightMaterialRenderGameObjectArray,
              gameObjectMap,
              disposedIndexArray,
            } as record =
          MeshRendererTool.getMeshRendererRecord(copiedState);
        let record = {...record, index: 0};
        basicMaterialRenderGameObjectArray |> Js.Array.pop |> ignore;
        lightMaterialRenderGameObjectArray |> Js.Array.pop |> ignore;
        disposedIndexArray |> Js.Array.pop |> ignore;
        gameObjectMap
        |> Obj.magic
        |> WonderCommonlib.SparseMapService.deleteVal(meshRenderer2);
        MeshRendererTool.getMeshRendererRecord(state)
        |>
        expect == {
                    index: 3,
                    basicMaterialRenderGameObjectArray: [|gameObject1|],
                    lightMaterialRenderGameObjectArray: [|gameObject2|],
                    gameObjectMap: [|
                      gameObject1,
                      gameObject2,
                      Js.Undefined.empty |> Obj.magic,
                    |],
                    disposedIndexArray: [|meshRenderer3|],
                  };
      });
    });
    describe("deepCopyForRestore", () => {
      let _testCopyTypeArraySingleValue =
          (
            (
              createGameObjectFunc,
              getDataFunc,
              setDataFunc,
              getTargetDataFunc,
            ),
            state,
          ) => {
        open StateDataMainType;
        /* open SourceInstanceType; */
        let (state, gameObject1, component1) = createGameObjectFunc(state^);
        let (data1, data2) = getTargetDataFunc();
        let state = state |> setDataFunc(component1, data1);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let copiedState = copiedState |> setDataFunc(component1, data2);
        getDataFunc(component1, state) |> expect == data1;
      };
      describe("deep copy transform record", () => {
        test("copy localToWorldMatrices", () =>
          _testCopyTypeArraySingleValue(
            (
              GameObjectTool.createGameObject,
              TransformTool.getLocalToWorldMatrix,
              TransformTool.setLocalToWorldMatrix,
              () => (
                [|
                  2.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                |],
                [|
                  3.,
                  1.,
                  0.,
                  0.,
                  0.,
                  1.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                  0.,
                  0.,
                  0.,
                  0.,
                  1.,
                |],
              ),
            ),
            state,
          )
        );
        test("copy localPositions", () =>
          _testCopyTypeArraySingleValue(
            (
              GameObjectTool.createGameObject,
              TransformAPI.getTransformLocalPosition,
              TransformAPI.setTransformLocalPosition,
              () => ((2., 0., 0.), (3., 1., 2.)),
            ),
            state,
          )
        );
        test("copy localRotations", () =>
          _testCopyTypeArraySingleValue(
            (
              GameObjectTool.createGameObject,
              TransformAPI.getTransformLocalRotation,
              TransformAPI.setTransformLocalRotation,
              () => ((2., 0., 0., 1.), (3., 1., 2., 1.)),
            ),
            state,
          )
        );
        test("copy localScales", () =>
          _testCopyTypeArraySingleValue(
            (
              GameObjectTool.createGameObject,
              TransformAPI.getTransformLocalScale,
              TransformAPI.setTransformLocalScale,
              () => ((2., 0., 0.), (3., 1., 2.)),
            ),
            state,
          )
        );
        test("deep copy childMap", () => {
          open TransformType;
          let (
            state,
            gameObject1,
            gameObject2,
            gameObject3,
            transform1,
            transform2,
            transform3,
          ) =
            _prepareTransformMatrixData(state);
          let _ = TransformAPI.getTransformPosition(transform2, state);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let (copiedState, transform4) =
            TransformAPI.createTransform(copiedState);
          let _ =
            copiedState
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(transform4),
                 transform2,
               );
          state
          |> TransformAPI.unsafeGetTransformChildren(transform1)
          |> expect == [|transform2|];
        });
        test("clean localToWorldMatrixCacheMap, normalMatrixCacheMap", () => {
          open TransformType;
          let (
            state,
            gameObject1,
            gameObject2,
            gameObject3,
            transform1,
            transform2,
            transform3,
          ) =
            _prepareTransformMatrixData(state);
          let _ =
            TransformTool.updateAndGetNormalMatrixTypeArray(
              transform2,
              state,
            );
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let (copiedState, transform4) =
            TransformAPI.createTransform(copiedState);
          let {localToWorldMatrixCacheMap, normalMatrixCacheMap} =
            TransformTool.getRecord(copiedState);
          (localToWorldMatrixCacheMap, normalMatrixCacheMap)
          |>
          expect == (
                      WonderCommonlib.SparseMapService.createEmpty(),
                      WonderCommonlib.SparseMapService.createEmpty(),
                    );
        });
      });
      /* describe(
           "deep copy geometry record",
           () => {
             /* describe(
               "deep copy box geometry record",
               () => {
                 test(
                   "copy vertices",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         BoxGeometryAPI.getBoxGeometryVertices,
                         BoxGeometryTool.setVertices,
                         () => (
                           Float32Array.make([|
                             2.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.
                           |]),
                           Float32Array.make([|
                             4.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.
                           |])
                         )
                       ),
                       state
                     )
                 );
                 test(
                   "copy normals",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         BoxGeometryAPI.getBoxGeometryNormals,
                         BoxGeometryTool.setNormals,
                         () => (
                           Float32Array.make([|
                             2.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.
                           |]),
                           Float32Array.make([|
                             4.,
                             2.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             1.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.,
                             0.
                           |])
                         )
                       ),
                       state
                     )
                 );
                 test(
                   "copy indices",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         BoxGeometryAPI.getBoxGeometryIndices,
                         BoxGeometryTool.setIndices,
                         () => (
                           Uint16Array.make([|
                             4,
                             0,
                             0,
                             0,
                             0,
                             1,
                             0,
                             0,
                             0,
                             0,
                             1,
                             0,
                             0,
                             0,
                             0,
                             1,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0
                           |]),
                           Uint16Array.make([|
                             7,
                             0,
                             0,
                             0,
                             0,
                             1,
                             0,
                             0,
                             0,
                             0,
                             1,
                             0,
                             0,
                             0,
                             0,
                             1,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0
                           |])
                         )
                       ),
                       state
                     )
                 )
               }
             ); */
             /* describe(
               "deep copy custom geometry record",
               () =>
                 test(
                   "copy verticesInfos",
                   () => {
                     open StateDataMainType;
                     open CustomGeometryAPI;
                     open GeometryType;
                     let (state, gameObject1, geometry1) =
                       GameObjectTool.createGameObject(state^);
                     let vertices1 = Float32Array.make([|10.|]);
                     let state = state |> setCustomGeometryVertices(geometry1, vertices1);
                     let copiedState = MainStateTool.deepCopyForRestore(state);
                     CustomGeometryTool.getRecord(copiedState).verticesInfos[0] = {
                       startIndex: 10,
                       endIndex: 20
                     };
                     CustomGeometryTool.getRecord(state).verticesInfos[0]
                     |> expect == {startIndex: 0, endIndex: 1}
                   }
                 )
             ) */
           }
         ); */
      /* describe(
           "deep copy geometry record",
           () =>
             describe(
               "deep copy custom geometry record",
               () => {
                 beforeEach(()=>{

                 state :=
                   TestTool.initWithJobConfigWithoutBuildFakeDom(
                     ~sandbox,
                     ~buffer=SettingTool.buildBufferConfigStr(~customGeometryPointCount=500, ()),
                     ()
                   );
                 });
                 test(
                   "copy vertices",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         /* GameObjectTool.createGameObject, */
                         CustomGeometryTool.createGameObject,
                         CustomGeometryAPI.getCustomGeometryVertices,
                         CustomGeometryAPI.setCustomGeometryVertices,
                         () => (
                           Float32Array.make([|2., 0., 0.|]),
                           Float32Array.make([|4., 0., 0.|])
                         )
                       ),
                       state
                     )
                 );
                 test(
                   "copy normals",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         CustomGeometryAPI.getCustomGeometryNormals,
                         CustomGeometryAPI.setCustomGeometryNormals,
                         () => (
                           Float32Array.make([|2., 0., 0.|]),
                           Float32Array.make([|4., 0., 0.|])
                         )
                       ),
                       state
                     )
                 );
                 test(
                   "copy indices",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         CustomGeometryAPI.getCustomGeometryIndices,
                         CustomGeometryAPI.setCustomGeometryIndices,
                         () => (Uint16Array.make([|2, 0, 0|]), Uint16Array.make([|4|]))
                       ),
                       state
                     )
                 )
               }
             )
         ); */
      /* test(
           "change copied state shouldn't affect source state",
           () => {
             open StateDataMainType;
             let (state, gameObject1, gameObject2, gameObject3, geometry1, geometry2, geometry3) =
               _prepareGeometryData(state);
             let copiedState = MainStateTool.deepCopyForRestore(state);
             let record = copiedState.boxGeometryRecord;
             record.verticesMap
             |> Obj.magic
             |> WonderCommonlib.SparseMapService.deleteVal(geometry2);
             record.normalsMap
             |> Obj.magic
             |> WonderCommonlib.SparseMapService.deleteVal(geometry2);
             record.indicesMap
             |> Obj.magic
             |> WonderCommonlib.SparseMapService.deleteVal(geometry2);
             let {verticesMap, normalsMap, indicesMap} = state.boxGeometryRecord;
             (
               verticesMap
               |> WonderCommonlib.SparseMapService.unsafeGet(geometry2)
               |> JudgeTool.isUndefined,
               normalsMap
               |> WonderCommonlib.SparseMapService.unsafeGet(geometry2)
               |> JudgeTool.isUndefined,
               indicesMap
               |> WonderCommonlib.SparseMapService.unsafeGet(geometry2)
               |> JudgeTool.isUndefined
             )
             |> expect == (false, false, false)
           }
         ); */
      describe("deep copy material record", () => {
        describe("test basic material", () => {
          test("shadow copy textureCountMap,materialArrayForWorkerInit", () =>
            StateDataMainType.(
              BasicMaterialType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {textureCountMap, materialArrayForWorkerInit} =
                      BasicMaterialTool.getRecord(state);
                    [|
                      textureCountMap |> Obj.magic,
                      materialArrayForWorkerInit |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
          test("copy colors", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  BasicMaterialAPI.getBasicMaterialColor(material, state)
                  |> TypeArrayTool.truncateArray,
                BasicMaterialAPI.setBasicMaterialColor,
                () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|]),
              ),
              state,
            )
          );
          test("copy textureIndices", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state),
                BasicMaterialAPI.setBasicMaterialMap,
                () => (0, 1),
              ),
              state,
            )
          );
          test("copy mapUnits", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  BasicMaterialTool.getMapUnit(material, state),
                BasicMaterialTool.setMapUnit,
                () => (1, 2),
              ),
              state,
            )
          );
        });
        describe("test light material", () => {
          test("shadow copy textureCountMap,materialArrayForWorkerInit", () =>
            StateDataMainType.(
              LightMaterialType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {textureCountMap, materialArrayForWorkerInit} =
                      LightMaterialTool.getRecord(state);
                    [|
                      textureCountMap |> Obj.magic,
                      materialArrayForWorkerInit |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
          test("copy diffuseColors", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  LightMaterialAPI.getLightMaterialDiffuseColor(
                    material,
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                LightMaterialAPI.setLightMaterialDiffuseColor,
                () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|]),
              ),
              state,
            )
          );
          test("copy specularColors", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  LightMaterialAPI.getLightMaterialSpecularColor(
                    material,
                    state,
                  )
                  |> TypeArrayTool.truncateArray,
                LightMaterialAPI.setLightMaterialSpecularColor,
                () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|]),
              ),
              state,
            )
          );
          test("copy shininess", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                LightMaterialAPI.getLightMaterialShininess,
                LightMaterialAPI.setLightMaterialShininess,
                () => (1., 2.),
              ),
              state,
            )
          );
          test("copy textureIndices", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                    material,
                    state,
                  ),
                LightMaterialAPI.setLightMaterialDiffuseMap,
                () => (0, 1),
              ),
              state,
            )
          );
          test("copy diffuseMapUnits", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  LightMaterialTool.getDiffuseMapUnit(material, state),
                LightMaterialTool.setDiffuseMapUnit,
                () => (1, 2),
              ),
              state,
            )
          );
          test("copy specularMapUnits", () =>
            _testCopyTypeArraySingleValue(
              (
                GameObjectTool.createGameObject,
                (material, state) =>
                  LightMaterialTool.getSpecularMapUnit(material, state),
                LightMaterialTool.setSpecularMapUnit,
                () => (1, 2),
              ),
              state,
            )
          );
        });
      });
      describe("deep copy texture record", () => {
        describe("deep copy basic source texture record", () =>
          test(
            "shadow copy sourceMap,glTextureMap, \n                    bindTextureUnitCacheMap, disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray\n                    \n                    ",
            () =>
            StateDataMainType.(
              BasicSourceTextureType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {
                      sourceMap,
                      glTextureMap,
                      bindTextureUnitCacheMap,
                      disposedIndexArray,
                      needAddedSourceArray,
                      needInitedTextureIndexArray,
                    } =
                      BasicSourceTextureTool.getRecord(state);
                    [|
                      sourceMap |> Obj.magic,
                      glTextureMap |> Obj.magic,
                      bindTextureUnitCacheMap |> Obj.magic,
                      disposedIndexArray |> Obj.magic,
                      needAddedSourceArray |> Obj.magic,
                      needInitedTextureIndexArray |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          )
        );
        describe("deep copy arrayBufferView source texture record", () =>
          test(
            "shadow copy sourceMap,glTextureMap, \n                    bindTextureUnitCacheMap, disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray\n                    \n                    ",
            () =>
            StateDataMainType.(
              ArrayBufferViewSourceTextureType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {
                      sourceMap,
                      glTextureMap,
                      bindTextureUnitCacheMap,
                      disposedIndexArray,
                      needAddedSourceArray,
                      needInitedTextureIndexArray,
                    } =
                      ArrayBufferViewSourceTextureTool.getRecord(state);
                    [|
                      sourceMap |> Obj.magic,
                      glTextureMap |> Obj.magic,
                      bindTextureUnitCacheMap |> Obj.magic,
                      disposedIndexArray |> Obj.magic,
                      needAddedSourceArray |> Obj.magic,
                      needInitedTextureIndexArray |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          )
        );
      });
      describe("deep copy light record", () => {
        describe("test direction light", () => {
          describe("copy type array record", () => {
            test("copy colors", () =>
              _testCopyTypeArraySingleValue(
                (
                  DirectionLightTool.createGameObject,
                  DirectionLightAPI.getDirectionLightColor,
                  DirectionLightAPI.setDirectionLightColor,
                  () => ([|1., 1., 0.|], [|0., 1., 0.|]),
                ),
                state,
              )
            );
            test("copy intensities", () =>
              _testCopyTypeArraySingleValue(
                (
                  DirectionLightTool.createGameObject,
                  DirectionLightAPI.getDirectionLightIntensity,
                  DirectionLightAPI.setDirectionLightIntensity,
                  () => (2., 3.),
                ),
                state,
              )
            );
          });
          test("shadow copy mappedIndexMap, gameObjectMap", () =>
            StateDataMainType.(
              DirectionLightType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {mappedIndexMap, gameObjectMap} =
                      DirectionLightTool.getRecord(state);
                    [|
                      mappedIndexMap |> Obj.magic,
                      gameObjectMap |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
        });
        describe("test point light", () => {
          describe("copy type array record", () => {
            test("copy colors", () =>
              _testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightColor,
                  PointLightAPI.setPointLightColor,
                  () => ([|1., 1., 0.|], [|0., 1., 0.|]),
                ),
                state,
              )
            );
            test("copy intensities", () =>
              _testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightIntensity,
                  PointLightAPI.setPointLightIntensity,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy constants", () =>
              _testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightConstant,
                  PointLightAPI.setPointLightConstant,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy linears", () =>
              _testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightLinear,
                  PointLightAPI.setPointLightLinear,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy quadratics", () =>
              _testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightQuadratic,
                  PointLightAPI.setPointLightQuadratic,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy ranges", () =>
              _testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightRange,
                  PointLightAPI.setPointLightRange,
                  () => (2., 3.),
                ),
                state,
              )
            );
          });
          test("shadow copy mappedIndexMap, gameObjectMap", () =>
            StateDataMainType.(
              PointLightType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {mappedIndexMap, gameObjectMap} =
                      PointLightTool.getRecord(state);
                    [|
                      mappedIndexMap |> Obj.magic,
                      gameObjectMap |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
        });
      });
      describe("deep copy sourceInstance record", () => {
        test("deep copy matrixFloat32ArrayMap", () => {
          open StateDataMainType;
          open SourceInstanceType;
          let (state, gameObject1, sourceInstance1) =
            SourceInstanceTool.createSourceInstanceGameObject(state^);
          let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
          let originMatrixFloat32Array = Float32Array.make([|1.|]);
          matrixFloat32ArrayMap
          |> WonderCommonlib.SparseMapService.set(
               sourceInstance1,
               originMatrixFloat32Array,
             )
          |> ignore;
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {matrixFloat32ArrayMap} =
            SourceInstanceTool.getRecord(copiedState);
          let matrixFloat32Array =
            matrixFloat32ArrayMap
            |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance1);
          Float32Array.unsafe_set(matrixFloat32Array, 0, 1000.) |> ignore;
          let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
          matrixFloat32ArrayMap
          |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance1)
          |> expect == originMatrixFloat32Array;
        });
        test(
          "shadow copy objectInstanceTransformIndexMap, matrixInstanceBufferCapacityMap, gameObjectMap, disposedIndexArray",
          () =>
          StateDataMainType.(
            SourceInstanceType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    objectInstanceTransformIndexMap,
                    matrixInstanceBufferCapacityMap,
                    gameObjectMap,
                    disposedIndexArray,
                  } =
                    SourceInstanceTool.getRecord(state);
                  [|
                    objectInstanceTransformIndexMap |> Obj.magic,
                    matrixInstanceBufferCapacityMap |> Obj.magic,
                    gameObjectMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        );
      });
      describe("deep copy gameObject record", () =>
        test(
          "shadow copy nameMap, disposedUidMap,\n\n        disposedUidArray,\n        disposedUidArrayForKeepOrder,\n        disposedBasicCameraViewArray,\n        disposedTransformArray,\n        disposedTransformArrayForKeepOrder,\n        disposedPerspectiveCameraProjectionArray,\n        disposedBasicMaterialArray,\n        disposedLightMaterialArray,\n        disposedBoxGeometryArray,\n        disposedCustomGeometryArray,\n        disposedSourceInstanceArray,\n        disposedObjectInstanceArray,\n                disposedDirectionLightArray,\n        disposedPointLightArray,\n        disposedMeshRendererComponentArray,\n        disposedMeshRendererUidArray,\n                \n                \n                aliveUidArray, transformMap, basicCameraViewMap, geometryDataMap, meshRendererMap, basicMaterialMap, lightMaterialMap, directionLightMap, pointLightMap, sourceInstanceMap, objectInstanceMap",
          () =>
          StateDataMainType.(
            GameObjectType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    nameMap,
                    disposedUidMap,
                    disposedUidArray,
                    disposedUidArrayForKeepOrder,
                    disposedBasicCameraViewArray,
                    disposedTransformArray,
                    disposedTransformArrayForKeepOrder,
                    disposedPerspectiveCameraProjectionArray,
                    disposedBasicMaterialArray,
                    disposedLightMaterialArray,
                    disposedBoxGeometryArray,
                    disposedCustomGeometryArray,
                    disposedSourceInstanceArray,
                    disposedObjectInstanceArray,
                    disposedDirectionLightArray,
                    disposedPointLightArray,
                    disposedMeshRendererComponentArray,
                    disposedMeshRendererUidArray,
                    aliveUidArray,
                    transformMap,
                    basicCameraViewMap,
                    geometryDataMap,
                    meshRendererMap,
                    basicMaterialMap,
                    lightMaterialMap,
                    directionLightMap,
                    pointLightMap,
                    sourceInstanceMap,
                    objectInstanceMap,
                  } =
                    GameObjectTool.getGameObjectRecord(state);
                  [|
                    nameMap |> Obj.magic,
                    disposedUidMap |> Obj.magic,
                    disposedUidArray |> Obj.magic,
                    disposedUidArrayForKeepOrder |> Obj.magic,
                    disposedBasicCameraViewArray |> Obj.magic,
                    disposedTransformArray |> Obj.magic,
                    disposedTransformArrayForKeepOrder |> Obj.magic,
                    disposedPerspectiveCameraProjectionArray |> Obj.magic,
                    disposedBasicMaterialArray |> Obj.magic,
                    disposedLightMaterialArray |> Obj.magic,
                    disposedBoxGeometryArray |> Obj.magic,
                    disposedCustomGeometryArray |> Obj.magic,
                    disposedSourceInstanceArray |> Obj.magic,
                    disposedObjectInstanceArray |> Obj.magic,
                    disposedDirectionLightArray |> Obj.magic,
                    disposedPointLightArray |> Obj.magic,
                    disposedMeshRendererComponentArray |> Obj.magic,
                    disposedMeshRendererUidArray |> Obj.magic,
                    aliveUidArray |> Obj.magic,
                    transformMap |> Obj.magic,
                    basicCameraViewMap |> Obj.magic,
                    geometryDataMap |> Obj.magic,
                    meshRendererMap |> Obj.magic,
                    basicMaterialMap |> Obj.magic,
                    lightMaterialMap |> Obj.magic,
                    directionLightMap |> Obj.magic,
                    pointLightMap |> Obj.magic,
                    sourceInstanceMap |> Obj.magic,
                    objectInstanceMap |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );
      describe("deep copy objectInstance record", () =>
        test(
          "shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray",
          () =>
          StateDataMainType.(
            ObjectInstanceType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {sourceInstanceMap, gameObjectMap, disposedIndexArray} =
                    ObjectInstanceTool.getObjectInstanceRecord(state);
                  [|
                    sourceInstanceMap |> Obj.magic,
                    gameObjectMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );
      describe("deep copy basicCameraView record", () =>
        test("shadow copy gameObjectMap, disposedIndexArray", () =>
          BasicCameraViewType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {gameObjectMap, disposedIndexArray} =
                  state.basicCameraViewRecord;
                [|
                  gameObjectMap |> Obj.magic,
                  disposedIndexArray |> Obj.magic,
                |];
              },
              state^,
            )
          )
        )
      );
      describe("deep copy basicCameraView record", () => {
        test(
          "shadow copy dirtyArray, nearMap, farMap, fovyMap, aspectMap, gameObjectMap, disposedIndexArray",
          () =>
          PerspectiveCameraProjectionType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {
                  dirtyArray,
                  nearMap,
                  farMap,
                  fovyMap,
                  aspectMap,
                  gameObjectMap,
                  disposedIndexArray,
                } =
                  state.perspectiveCameraProjectionRecord;
                [|
                  dirtyArray |> Obj.magic,
                  nearMap |> Obj.magic,
                  farMap |> Obj.magic,
                  fovyMap |> Obj.magic,
                  aspectMap |> Obj.magic,
                  gameObjectMap |> Obj.magic,
                  disposedIndexArray |> Obj.magic,
                |];
              },
              state^,
            )
          )
        );
        test("deep copy pMatrixMap", () => {
          open PerspectiveCameraProjectionType;
          let (
            state,
            gameObject1,
            gameObject2,
            gameObject3,
            perspectiveCameraProjection1,
            perspectiveCameraProjection2,
            perspectiveCameraProjection3,
          ) =
            _preparePerspectiveCameraProjectionData(state);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {pMatrixMap} as record =
            copiedState.perspectiveCameraProjectionRecord;
          let record = {...record, index: 0};
          Js.Typed_array.Float32Array.unsafe_set(
            pMatrixMap |> WonderCommonlib.SparseMapService.unsafeGet(0),
            1,
            10.0,
          );
          let oldPMatrix =
            state.perspectiveCameraProjectionRecord.pMatrixMap
            |> WonderCommonlib.SparseMapService.unsafeGet(0);
          Js.Typed_array.Float32Array.unsafe_get(oldPMatrix, 1)
          |> expect != 10.0;
        });
      });
    });
    describe("restore", () => {
      let _testRestoreStateEqualTargetState =
          (state, prepareDataFunc, getDataFunc) => {
        let (state, _, _, _, _, _, _) = prepareDataFunc(state);
        let currentState =
          MainStateTool.createNewCompleteStateWithRenderConfig(sandbox);
        let (currentState, _, _, _, _, _, _) =
          prepareDataFunc(ref(currentState));
        let _ = MainStateTool.restore(currentState, state);
        MainStateTool.unsafeGetState()
        |> getDataFunc
        |> expect == (state |> getDataFunc);
        /* expect(1) == 1; */
      };
      describe("restore meshRenderer record to target state", () => {
        let _prepare = state => {
          let (
            state,
            gameObject1,
            gameObject2,
            gameObject3,
            meshRenderer1,
            meshRenderer2,
            meshRenderer3,
          ) =
            _prepareMeshRendererData(state);
          let state = AllMaterialTool.prepareForInit(state);
          let (currentState, gameObject4, meshRenderer4) =
            MeshRendererTool.createBasicMaterialGameObject(
              MainStateTool.createNewCompleteState(sandbox),
            );
          let currentState = AllMaterialTool.pregetGLSLData(currentState);
          (
            (
              state,
              gameObject1,
              gameObject2,
              gameObject3,
              meshRenderer1,
              meshRenderer2,
              meshRenderer3,
            ),
            (currentState, gameObject4, meshRenderer4),
          );
        };
        test("set restored state to stateData", () => {
          let ((state, _, _, _, _, _, _), (currentState, _, _)) =
            _prepare(state);
          let currentState = MainStateTool.restore(currentState, state);
          MainStateTool.unsafeGetState() |> expect == currentState;
        });
        test("change restored state should affect source state", () => {
          let ((state, _, _, _, _, _, _), (currentState, _, _)) =
            _prepare(state);
          let currentState = MainStateTool.restore(currentState, state);
          let (currentState, gameObject5, meshRenderer5) =
            MeshRendererTool.createBasicMaterialGameObject(
              MainStateTool.createNewCompleteState(sandbox),
            );
          state
          |> MeshRendererAPI.unsafeGetMeshRendererGameObject(meshRenderer5)
          |> expect == gameObject5;
        });
        test(
          "changing restored state which is restored from deep copied state shouldn't affect source state",
          () => {
            let (
              (state, gameObject1, gameObject2, gameObject3, _, _, _),
              (currentState, _, _),
            ) =
              _prepare(state);
            let currentState =
              MainStateTool.restore(
                currentState,
                state |> MainStateTool.deepCopyForRestore,
              );
            let (currentState, _, _) =
              MeshRendererTool.createBasicMaterialGameObject(currentState);
            (
              MeshRendererTool.getMeshRendererRecord(state).
                basicMaterialRenderGameObjectArray,
              MeshRendererTool.getMeshRendererRecord(state).
                lightMaterialRenderGameObjectArray,
            )
            |> expect == ([|gameObject1|], [|gameObject2|]);
          },
        );
      });
      describe("restore transform record to target state", () => {
        let _test = state => {
          open TransformType;
          let {
            localToWorldMatrices,
            localPositions,
            localRotations,
            localScales,
          } =
            state |> TransformTool.getRecord;
          (localToWorldMatrices, localPositions, localRotations, localScales)
          |>
          expect == (
                      Float32Array.make([|
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        (-2.),
                        (-10.),
                        (-4.),
                        0.,
                        (-10.),
                        (-23.),
                        (-10.),
                        0.,
                        5.,
                        12.5,
                        (-33.75),
                        0.,
                        1.,
                        2.,
                        3.,
                        1.,
                        (-2.),
                        (-10.),
                        (-4.),
                        0.,
                        (-10.),
                        (-23.),
                        (-10.),
                        0.,
                        5.,
                        12.5,
                        (-33.75),
                        0.,
                        7.,
                        15.,
                        (-382.5),
                        1.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.,
                      |]),
                      Float32Array.make([|
                        0.,
                        0.,
                        0.,
                        1.,
                        2.,
                        3.,
                        2.,
                        4.,
                        10.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                      |]),
                      Float32Array.make([|
                        0.,
                        0.,
                        0.,
                        1.,
                        (-2.5),
                        1.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        1.,
                        0.,
                        0.,
                        0.,
                        1.,
                      |]),
                      Float32Array.make([|
                        1.,
                        1.,
                        1.,
                        2.,
                        2.,
                        2.5,
                        1.,
                        1.,
                        1.,
                        1.,
                        1.,
                        1.,
                        1.,
                        1.,
                        1.,
                      |]),
                    );
        };
        test("test restore typeArrays", () => {
          open TransformType;
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(~transformCount=5, ()),
              (),
            );
          let (state, gameObject1, gameObject2, _, transform1, transform2, _) =
            _prepareTransformMatrixData(state);

          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = TransformTool.update(transform1, state);
          let state = TransformTool.update(transform2, state);
          let copiedState = MainStateTool.deepCopyForRestore(state);

          let currentState = state;
          let (currentState, _, transform4) =
            GameObjectTool.createGameObject(currentState);

          let pos4 = ((-2.), 3., 1.);
          let rotation4 = ((-2.5), 1., 0., 1.);
          let scale4 = (2., 2., 2.5);
          let currentState =
            currentState
            |> TransformAPI.setTransformLocalPosition(transform4, pos4)
            |> TransformAPI.setTransformLocalRotation(transform4, rotation4)
            |> TransformAPI.setTransformLocalScale(transform4, scale4);

          let currentState = TransformTool.update(transform1, currentState);
          let _ = MainStateTool.restore(currentState, copiedState);
          _test(MainStateTool.unsafeGetState());
        });
        describe("test restore to the same state", () =>
          test("should not change typeArrays", () => {
            open TransformType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(~transformCount=5, ()),
                (),
              );
            let (
              state,
              gameObject1,
              gameObject2,
              _,
              transform1,
              transform2,
              _,
            ) =
              _prepareTransformMatrixData(state);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let state = TransformTool.update(transform1, state);
            let state = TransformTool.update(transform2, state);
            let _ = MainStateTool.restore(state, state);
            _test(MainStateTool.unsafeGetState());
          })
        );
      });
      describe("restore customGeometry record to target state", () => {
        let _prepare = () => {
          let state =
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~customGeometryPointCount=4,
                  ~customGeometryCount=3,
                  (),
                ),
              (),
            );
          let (
            state,
            gameObject1,
            geometry1,
            (vertices1, texCoords1, normals1, indices1),
          ) =
            CustomGeometryTool.createGameObjectAndSetPointData(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let (currentState, gameObject2, geometry2) =
            CustomGeometryTool.createGameObject(state);
          let (currentState, gameObject3, geometry3) =
            CustomGeometryTool.createGameObject(state);
          let vertices2 =
            Float32Array.make([|2., 3., 40., 1., 3., 5., 3., 4., 11.|]);
          let texCoords2 = Float32Array.make([|1., 0.5, 0.2, 0.3, 0.3, 0.5|]);
          let normals2 =
            Float32Array.make([|3., 2., 4., 5., 6., 7., 2.5, 1.5, 0.|]);
          let indices2 = Uint16Array.make([|0, 1, 2|]);
          let currentState =
            currentState
            |> CustomGeometryAPI.setCustomGeometryVertices(
                 geometry2,
                 vertices2,
               )
            |> CustomGeometryAPI.setCustomGeometryTexCoords(
                 geometry2,
                 texCoords2,
               )
            |> CustomGeometryAPI.setCustomGeometryNormals(
                 geometry3,
                 normals2,
               )
            |> CustomGeometryAPI.setCustomGeometryIndices(geometry2, indices2);
          ((currentState, copiedState), (geometry1, geometry2, geometry3));
        };
        test("test restore typeArrays", () => {
          open CustomGeometryType;
          let ((currentState, copiedState), _) = _prepare();
          let _ = MainStateTool.restore(currentState, copiedState);
          let {vertices, texCoords, normals, indices} =
            MainStateTool.unsafeGetState() |> CustomGeometryTool.getRecord;
          (vertices, texCoords, normals, indices)
          |>
          expect == (
                      Float32Array.make([|
                        10.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                      |]),
                      Float32Array.make([|0.5, 0., 0., 0., 0., 0., 0., 0.|]),
                      Float32Array.make([|
                        1.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                        0.,
                      |]),
                      Uint16Array.make([|2, 0, 0, 0|]),
                    );
        });
        test("test set point after restore", () => {
          open CustomGeometryType;
          let (
            (currentState, copiedState),
            (geometry1, geometry2, geometry3),
          ) =
            _prepare();
          let restoredState =
            MainStateTool.restore(currentState, copiedState);
          let vertices3 = Float32Array.make([|3., 4., 11.|]);
          let restoredState =
            restoredState
            |> CustomGeometryAPI.setCustomGeometryVertices(
                 geometry3,
                 vertices3,
               );
          let vertices =
            restoredState
            |> CustomGeometryAPI.getCustomGeometryVertices(geometry3);
          vertices |> expect == vertices3;
        });
      });
      describe("restore material record to target state", () => {
        describe("test basic material", () =>
          test("test restore typeArrays", () => {
            open BasicMaterialType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~basicMaterialCount=4,
                    ~textureCountPerMaterial=1,
                    (),
                  ),
                (),
              );
            let (
              state,
              gameObject1,
              gameObject2,
              gameObject3,
              material1,
              material2,
              material3,
            ) =
              _prepareBasicMaterialData(state);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject4, material4) =
              BasicMaterialTool.createGameObject(state);
            let currentState =
              BasicMaterialAPI.setBasicMaterialColor(
                material4,
                [|1., 0.1, 1.|],
                currentState,
              );
            let (currentState, map1) =
              BasicSourceTextureAPI.createBasicSourceTexture(currentState);
            let (currentState, map2) =
              BasicSourceTextureAPI.createBasicSourceTexture(currentState);
            let currentState =
              currentState
              |> BasicMaterialAPI.setBasicMaterialMap(material4, map2);
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultUnit = BasicSourceTextureTool.getDefaultUnit();
            let {colors, textureIndices, mapUnits} =
              MainStateTool.unsafeGetState() |> BasicMaterialTool.getRecord;
            (colors, textureIndices, mapUnits)
            |>
            expect == (
                        Float32Array.make([|
                          1.,
                          1.,
                          1.,
                          1.,
                          0.5,
                          0.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                        |]),
                        Uint32Array.make([|0, 0, 0, 0|]),
                        Uint8Array.make([|
                          defaultUnit,
                          defaultUnit,
                          defaultUnit,
                          defaultUnit,
                        |]),
                      );
          })
        );
        describe("test light material", () =>
          test("test restore typeArrays", () => {
            open LightMaterialType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~lightMaterialCount=4,
                    ~textureCountPerMaterial=1,
                    (),
                  ),
                (),
              );
            let (
              state,
              gameObject1,
              gameObject2,
              gameObject3,
              material1,
              material2,
              material3,
            ) =
              _prepareLightMaterialData(state);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject4, material4) =
              LightMaterialTool.createGameObject(state);
            let currentState =
              LightMaterialAPI.setLightMaterialDiffuseColor(
                material4,
                [|1., 0.1, 1.|],
                currentState,
              );
            let currentState =
              LightMaterialAPI.setLightMaterialSpecularColor(
                material4,
                [|0.5, 0.2, 0.|],
                currentState,
              );
            let state =
              state |> LightMaterialTool.createAndSetMaps(material4);
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultUnit = BasicSourceTextureTool.getDefaultUnit();
            let {
              diffuseColors,
              specularColors,
              textureIndices,
              diffuseMapUnits,
              specularMapUnits,
            } =
              MainStateTool.unsafeGetState() |> LightMaterialTool.getRecord;
            (
              diffuseColors,
              specularColors,
              textureIndices,
              diffuseMapUnits,
              specularMapUnits,
            )
            |>
            expect == (
                        Float32Array.make([|
                          1.,
                          1.,
                          1.,
                          1.,
                          0.5,
                          0.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                        |]),
                        Float32Array.make([|
                          1.,
                          1.,
                          1.,
                          0.,
                          1.,
                          0.5,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                        |]),
                        Uint32Array.make([|0, 0, 0, 0|]),
                        Uint8Array.make([|
                          defaultUnit,
                          defaultUnit,
                          defaultUnit,
                          defaultUnit,
                        |]),
                        Uint8Array.make([|
                          defaultUnit,
                          defaultUnit,
                          defaultUnit,
                          defaultUnit,
                        |]),
                      );
          })
        );
      });
      describe("restore light record to target state", () => {
        let _prepareLightData = (createGameObjectFunc, state) => {
          open LightMaterialAPI;
          open Js.Typed_array;
          let (state, gameObject1, light1) = createGameObjectFunc(state^);
          let (state, gameObject2, light2) = createGameObjectFunc(state);
          let state = AllMaterialTool.prepareForInit(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          (state, gameObject1, gameObject2, light1, light2);
        };

        describe("test direction light", () =>
          test("test restore typeArrays", () => {
            open DirectionLightType;
            let (state, gameObject1, gameObject2, light1, light2) =
              _prepareLightData(DirectionLightTool.createGameObject, state);
            let state =
              DirectionLightAPI.setDirectionLightColor(
                light2,
                [|0., 0.5, 0.|],
                state,
              );
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject3, light3) =
              DirectionLightTool.createGameObject(state);
            let (currentState, gameObject4, light4) =
              DirectionLightTool.createGameObject(state);
            let currentState =
              DirectionLightAPI.setDirectionLightColor(
                light3,
                [|1., 0.1, 0.|],
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightColor(
                light4,
                [|0., 0.5, 0.5|],
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightColor(
                light1,
                [|0., 0.5, 1.|],
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightIntensity(
                light2,
                0.2,
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightIntensity(
                light4,
                0.5,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let {colors, intensities} =
              MainStateTool.unsafeGetState() |> DirectionLightTool.getRecord;
            (colors, intensities)
            |>
            expect == (
                        Float32Array.make([|
                          1.,
                          1.,
                          1.,
                          0.,
                          0.5,
                          0.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                        |]),
                        Float32Array.make([|1., 1., 1., 1.|]),
                      );
          })
        );
        describe("test point light", () =>
          test("test restore typeArrays", () => {
            open PointLightType;
            let (state, gameObject1, gameObject2, light1, light2) =
              _prepareLightData(PointLightTool.createGameObject, state);
            let state =
              PointLightAPI.setPointLightColor(
                light2,
                [|0., 0.5, 0.|],
                state,
              );
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject3, light3) =
              PointLightTool.createGameObject(state);
            let (currentState, gameObject4, light4) =
              PointLightTool.createGameObject(currentState);
            let currentState =
              PointLightAPI.setPointLightColor(
                light3,
                [|1., 0.1, 1.|],
                currentState,
              );
            let currentState =
              PointLightAPI.setPointLightColor(
                light4,
                [|1., 0.2, 1.|],
                currentState,
              );
            let currentState =
              PointLightAPI.setPointLightColor(
                light1,
                [|0., 0., 1.|],
                currentState,
              );
            let currentState =
              PointLightAPI.setPointLightRange(light2, 0.2, currentState);
            let currentState =
              PointLightAPI.setPointLightRange(light3, 0.5, currentState);
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let {colors, ranges} =
              MainStateTool.unsafeGetState() |> PointLightTool.getRecord;
            (colors, ranges)
            |>
            expect == (
                        Float32Array.make([|
                          1.,
                          1.,
                          1.,
                          0.,
                          0.5,
                          0.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                          1.,
                        |]),
                        Float32Array.make([|65., 65., 65., 65.|]),
                      );
          })
        );
      });
      describe("restore texture record to target state", () => {
        describe("test restore basic source texture record", () =>
          test("test restore typeArrays", () => {
            open BasicSourceTextureType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~basicSourceTextureCount=4,
                    (),
                  ),
                (),
              );
            let (state, texture1, texture2, texture3) =
              _prepareBasicSourceTextureData(state^);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, texture4) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let currentState =
              BasicSourceTextureAPI.setBasicSourceTextureWrapT(
                texture4,
                SourceTextureType.MIRRORED_REPEAT,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultWrapS =
              BasicSourceTextureTool.getDefaultWrapS()
              |> SourceTextureType.wrapToUint8;

            let defaultWrapT =
              BasicSourceTextureTool.getDefaultWrapT()
              |> SourceTextureType.wrapToUint8;
            let defaultMagFilter =
              BasicSourceTextureTool.getDefaultMagFilter()
              |> SourceTextureType.filterToUint8;

            let defaultMinFilter =
              BasicSourceTextureTool.getDefaultMinFilter()
              |> SourceTextureType.filterToUint8;
            let defaultFormat =
              BasicSourceTextureTool.getDefaultFormat()
              |> SourceTextureType.formatToUint8;
            let defaultType = BasicSourceTextureTool.getDefaultType();
            let defaultIsNeedUpdate =
              BasicSourceTextureTool.getDefaultIsNeedUpdate();
            let {
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
            } =
              MainStateTool.unsafeGetState()
              |> BasicSourceTextureTool.getRecord;
            (
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
            )
            |>
            expect == (
                        Uint8Array.make([|
                          defaultWrapS,
                          1,
                          defaultWrapS,
                          defaultWrapS,
                        |]),
                        Uint8Array.make([|
                          defaultWrapT,
                          1,
                          defaultWrapT,
                          defaultWrapT,
                        |]),
                        Uint8Array.make([|
                          defaultMagFilter,
                          1,
                          defaultMagFilter,
                          defaultMagFilter,
                        |]),
                        Uint8Array.make([|
                          defaultMinFilter,
                          1,
                          defaultMinFilter,
                          defaultMinFilter,
                        |]),
                        Uint8Array.make([|
                          defaultFormat,
                          2,
                          defaultFormat,
                          defaultFormat,
                        |]),
                        Uint8Array.make([|
                          defaultType,
                          1,
                          defaultType,
                          defaultType,
                        |]),
                        Uint8Array.make([|
                          defaultIsNeedUpdate,
                          defaultIsNeedUpdate,
                          defaultIsNeedUpdate,
                          defaultIsNeedUpdate,
                        |]),
                      );
          })
        );
        describe("test restore arrayBufferView source texture record", () =>
          test("test restore typeArrays", () => {
            open ArrayBufferViewSourceTextureType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~arrayBufferViewSourceTextureCount=4,
                    (),
                  ),
                (),
              );
            let (state, texture1, texture2, texture3) =
              _prepareArrayBufferViewSourceTextureData(state^);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, texture4) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state,
              );
            let currentState =
              ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWrapT(
                texture4,
                SourceTextureType.MIRRORED_REPEAT,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultWrapS =
              ArrayBufferViewSourceTextureTool.getDefaultWrapS()
              |> SourceTextureType.wrapToUint8;
            let defaultWrapT =
              ArrayBufferViewSourceTextureTool.getDefaultWrapT()
              |> SourceTextureType.wrapToUint8;
            let defaultMagFilter =
              ArrayBufferViewSourceTextureTool.getDefaultMagFilter()
              |> SourceTextureType.filterToUint8;
            let defaultMinFilter =
              ArrayBufferViewSourceTextureTool.getDefaultMinFilter()
              |> SourceTextureType.filterToUint8;
            let defaultFormat =
              ArrayBufferViewSourceTextureTool.getDefaultFormat()
              |> SourceTextureType.formatToUint8;
            let defaultType =
              ArrayBufferViewSourceTextureTool.getDefaultType();
            let defaultIsNeedUpdate =
              ArrayBufferViewSourceTextureTool.getDefaultIsNeedUpdate();
            let defaultWidth =
              ArrayBufferViewSourceTextureTool.getDefaultWidth();
            let defaultHeight =
              ArrayBufferViewSourceTextureTool.getDefaultHeight();
            let {
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
              widths,
              heights,
            } =
              MainStateTool.unsafeGetState()
              |> ArrayBufferViewSourceTextureTool.getRecord;
            (
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
              widths,
              heights,
            )
            |>
            expect == (
                        Uint8Array.make([|
                          defaultWrapS,
                          1,
                          defaultWrapS,
                          defaultWrapS,
                        |]),
                        Uint8Array.make([|
                          defaultWrapT,
                          1,
                          defaultWrapT,
                          defaultWrapT,
                        |]),
                        Uint8Array.make([|
                          defaultMagFilter,
                          1,
                          defaultMagFilter,
                          defaultMagFilter,
                        |]),
                        Uint8Array.make([|
                          defaultMinFilter,
                          1,
                          defaultMinFilter,
                          defaultMinFilter,
                        |]),
                        Uint8Array.make([|
                          defaultFormat,
                          2,
                          defaultFormat,
                          defaultFormat,
                        |]),
                        Uint8Array.make([|
                          defaultType,
                          1,
                          defaultType,
                          defaultType,
                        |]),
                        Uint8Array.make([|
                          defaultIsNeedUpdate,
                          defaultIsNeedUpdate,
                          defaultIsNeedUpdate,
                          defaultIsNeedUpdate,
                        |]),
                        Uint16Array.make([|
                          defaultWidth,
                          2,
                          defaultWidth,
                          defaultWidth,
                        |]),
                        Uint16Array.make([|
                          defaultHeight,
                          4,
                          defaultHeight,
                          defaultHeight,
                        |]),
                      );
          })
        );
      });
      describe("restore sourceInstance record to target state", () => {
        test("test restore typeArrays", () => {
          open SourceInstanceType;
          open Js.Typed_array;
          let state =
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~sourceInstanceCount=3,
                  ~objectInstanceCountPerSourceInstance=3,
                  (),
                ),
              (),
            );
          let (
            state,
            gameObject,
            sourceInstance1,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (
            state,
            gameObject,
            sourceInstance2,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(3, state);
          let state =
            state
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance1,
                 true,
               )
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance2,
                 false,
               );
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let currentState = state;
          let (
            currentState,
            gameObject,
            sourceInstance3,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(
              1,
              currentState,
            );
          let currentState =
            currentState
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance3,
                 true,
               )
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance1,
                 false,
               );
          let _ = MainStateTool.restore(currentState, copiedState);
          let {isTransformStatics, objectInstanceTransformCollections} =
            MainStateTool.unsafeGetState() |> SourceInstanceTool.getRecord;
          (isTransformStatics, objectInstanceTransformCollections)
          |>
          expect == (
                      Uint8Array.make([|1, 0, 1|]),
                      Uint32Array.make([|2, 3, 0, 5, 6, 7, 0, 0, 0|]),
                    );
        });
        test(
          "add current state->sourceInstanceRecord->matrixFloat32ArrayMap typeArr to pool",
          () => {
            open StateDataMainType;
            open SourceInstanceType;
            open TypeArrayPoolType;
            let state = state^;
            let currentState = MainStateTool.createNewCompleteState(sandbox);
            let {matrixFloat32ArrayMap} =
              SourceInstanceTool.getRecord(currentState);
            let index = 0;
            let typeArr = Float32Array.make([|1.|]);
            matrixFloat32ArrayMap
            |> WonderCommonlib.SparseMapService.set(index, typeArr);
            let _ = MainStateTool.restore(currentState, state);
            let {float32ArrayPoolMap}: typeArrayPoolRecord =
              MainStateTool.unsafeGetState().typeArrayPoolRecord;
            float32ArrayPoolMap
            |> WonderCommonlib.SparseMapService.unsafeGet(
                 typeArr |> Float32Array.length,
               )
            |> expect == [|typeArr|];
          },
        );
        test("mark is-not-send-modelMatrixData", () => {
          open StateDataMainType;
          open SourceInstanceType;
          open TypeArrayPoolType;
          let state = state^;
          let {isSendTransformMatrixDataMap} =
            SourceInstanceTool.getRecord(state);
          isSendTransformMatrixDataMap
          |> WonderCommonlib.SparseMapService.set(0, true)
          |> WonderCommonlib.SparseMapService.set(1, false)
          |> ignore;
          let _ =
            MainStateTool.restore(
              MainStateTool.createNewCompleteState(sandbox),
              state,
            );
          let {isSendTransformMatrixDataMap} =
            SourceInstanceTool.getRecord(MainStateTool.unsafeGetState());
          isSendTransformMatrixDataMap |> expect == [|false, false|];
        });
      });
      test("restore basicCameraView record to target state", () =>
        _testRestoreStateEqualTargetState(
          state, _prepareBasicCameraViewData, state =>
          state.basicCameraViewRecord
        )
      );
      test("restore perspectiveCameraProjection record to target state", () =>
        _testRestoreStateEqualTargetState(
          state, _preparePerspectiveCameraProjectionData, state =>
          state.perspectiveCameraProjectionRecord
        )
      );
    });
  });