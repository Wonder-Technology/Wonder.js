open Wonder_jest;

open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let _ =
  describe("assemble sab", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithoutBuildFakeDom(~sandbox, ());

      PrepareABTool.prepare(sandbox^);
      GenerateAllABTool.Manifest.prepareDigest(sandbox^);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build image data", () =>
      describe("test has duplicate data", () =>
        testPromise("test1", () => {
          let imageName = "image1";

          let image1 =
            GenerateSingleRABTool.ResourceData.buildImageData(
              ~name=imageName,
              (),
            );

          let imageDataMap =
            WonderCommonlib.ImmutableSparseMapService.createEmpty()
            |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

          let (state, textureResourceData1) =
            GenerateSingleRABTool.ResourceData.createTextureResourceData(
              ~state=state^,
              ~imageDataIndex=0,
              (),
            );

          let resourceData1 =
            GenerateSingleRABTool.ResourceData.buildResourceData(
              ~textures=[|textureResourceData1|],
              ~imageDataMap,
              (),
            );

          let (state, rab1) =
            GenerateRABSystem.generateSingleRAB(resourceData1, state);

          let (state, gameObject2, transform2, (material2, texture2)) =
            GenerateAllABTool.TestDuplicateDataForSAB.TestDuplicateImageData.createGameObject1(
              imageName,
              state,
            );
          let gameObject2Name = "g2";
          let state =
            state
            |> GameObjectAPI.setGameObjectName(gameObject2, gameObject2Name);

          let state = state |> SceneAPI.addSceneChild(transform2);

          let (canvas, context, (base64Str1, base64Str2)) =
            GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          let (state, sab1) =
            GenerateSABSystem.generateSingleSAB(
              SceneAPI.getSceneGameObject(state),
              WonderCommonlib.MutableSparseMapService.createEmpty(),
              state,
            );

          GenerateAllABTool.TestWithOneSABAndOneRAB.generateAllAB(
            (rab1, sab1),
            state,
          )
          |> MostTool.testStream(data => {
               let (rab1RelativePath, sab1RelativePath) =
                 GenerateAllABTool.TestWithOneSABAndOneRAB.getABRelativePaths();

               AssembleSABTool.TestWithOneSABAndOneRAB.assemble(data)
               |> MostTool.testStream(rootGameObject => {
                    let state = StateAPI.unsafeGetState();

                    GameObjectTool.unsafeFindGameObjectByName(
                      rootGameObject,
                      gameObject2Name,
                      state,
                    )
                    |> GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                         _,
                         state,
                       )
                    |> LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                         _,
                         state,
                       )
                    |> BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                         _,
                         state,
                       )
                    |> expect
                    == (
                         {"name": imageName, "src": "object_url0"} |> Obj.magic
                       )
                    |> resolve;
                  });
             });
        })
      )
    );

    describe("build geometry data", () => {
      let _prepare = () => {
        let geometryName = "geometry1";
        let (
          state,
          gameObject1,
          geometry1,
          name1,
          (vertices1, texCoords1, normals1, indices16_1, indices32_1),
        ) =
          GenerateSingleRABTool.ResourceData.createGeometryResourceData(
            ~state=state^,
            ~name=geometryName,
            ~indices16=None,
            ~indices32=Some(Uint32Array.make([|0|])),
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~geometrys=[|geometry1|],
            (),
          );

        let (state, rab1) =
          GenerateRABSystem.generateSingleRAB(resourceData1, state);

        let gameObject2Name = "gameObject2";

        let (
          state,
          gameObject2,
          transform2,
          (geometry2, (vertices2, texCoords2, normals2, indices2)),
          meshRenderer2,
          material2,
        ) =
          GenerateAllABTool.TestDuplicateDataForSAB.TestDuplicateGeometryData.createGameObject1(
            geometryName,
            state,
          );

        let state =
          state
          |> GameObjectAPI.setGameObjectName(gameObject2, gameObject2Name);

        let gameObject3Name = "gameObject3";
        let geometry3Name = "geometry3";

        let (
          state,
          gameObject3,
          transform3,
          (geometry3, (vertices3, texCoords3, normals3, indices3)),
          meshRenderer3,
          material3,
        ) =
          GenerateAllABTool.TestDuplicateDataForSAB.TestDuplicateGeometryData.createGameObject2(
            geometry3Name,
            state,
          );

        let state =
          state
          |> GameObjectAPI.setGameObjectName(gameObject3, gameObject3Name);

        let state =
          state
          |> SceneAPI.addSceneChild(transform2)
          |> SceneAPI.addSceneChild(transform3);

        let (state, sab1) =
          GenerateSABSystem.generateSingleSAB(
            SceneAPI.getSceneGameObject(state),
            WonderCommonlib.MutableSparseMapService.createEmpty(),
            state,
          );

        (
          state,
          (rab1, sab1),
          (gameObject2Name, gameObject3Name),
          (geometryName, geometry3Name),
          (vertices3, texCoords3, normals3, indices3),
        );
      };

      let _execAndJudge =
          (
            (
              state,
              (rab1, sab1),
              (gameObject2Name, gameObject3Name),
              (geometryName, geometry3Name),
              (vertices3, texCoords3, normals3, indices3),
            ),
          ) =>
        GenerateAllABTool.TestWithOneSABAndOneRAB.generateAllAB(
          (rab1, sab1),
          state,
        )
        |> MostTool.testStream(data => {
             let (rab1RelativePath, sab1RelativePath) =
               GenerateAllABTool.TestWithOneSABAndOneRAB.getABRelativePaths();

             AssembleSABTool.TestWithOneSABAndOneRAB.assemble(data)
             |> MostTool.testStream(rootGameObject => {
                  let state = StateAPI.unsafeGetState();

                  let geometry2 =
                    GameObjectTool.unsafeFindGameObjectByName(
                      rootGameObject,
                      gameObject2Name,
                      state,
                    )
                    |> GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                         _,
                         state,
                       );

                  let geometry3 =
                    GameObjectTool.unsafeFindGameObjectByName(
                      rootGameObject,
                      gameObject3Name,
                      state,
                    )
                    |> GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                         _,
                         state,
                       );

                  (
                    geometry2,
                    GeometryAPI.getGeometryVertices(geometry3, state),
                    GeometryAPI.getGeometryNormals(geometry3, state),
                    GeometryAPI.getGeometryTexCoords(geometry3, state),
                    GeometryAPI.getGeometryIndices16(geometry3, state),
                    GeometryAPI.hasGeometryIndices32(geometry3, state),
                  )
                  |> expect
                  == (
                       OperateRABAssetBundleMainService.unsafeFindGeometryByName(
                         rab1RelativePath,
                         geometryName,
                         state,
                       ),
                       vertices3,
                       texCoords3,
                       normals3,
                       indices3,
                       false,
                     )
                  |> resolve;
                });
           });

      describe("test has duplicate data", () =>
        testPromise("test1", () => _prepare() |> _execAndJudge)
      );

      describe("test dispose before assemble", () =>
        testPromise("test1", () => {
          let (
            state,
            (rab1, sab1),
            (gameObject2Name, gameObject3Name),
            (geometryName, geometry3Name),
            (vertices3, texCoords3, normals3, indices3),
          ) =
            _prepare();

          let state =
            state
            |> ImportABSystem.disposeSceneAllChildren
            |> DisposeJobTool.disposeAndReallocate;

          (
            state,
            (rab1, sab1),
            (gameObject2Name, gameObject3Name),
            (geometryName, geometry3Name),
            (vertices3, texCoords3, normals3, indices3),
          )
          |> _execAndJudge;
        })
      );
    });
  });