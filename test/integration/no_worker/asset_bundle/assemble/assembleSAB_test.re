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
      describe("test has duplicate data", () => {
        describe("test image from basicSourceTexture", () =>
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
              GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
                ~state=state^,
                ~imageDataIndex=0,
                (),
              );

            let resourceData1 =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~basicSourceTextures=[|textureResourceData1|],
                ~imageDataMap,
                (),
              );

            let rab1 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

            let (state, gameObject2, transform2, (material2, texture2)) =
              GenerateAllABTool.TestDuplicateDataForSAB.TestDuplicateImageData.createGameObject1(
                imageName,
                state,
              );
            let gameObject2Name = "g2";
            let state =
              state
              |> GameObjectAPI.setGameObjectName(gameObject2, gameObject2Name);

            let state = state |> SceneAPI.addSceneChild(gameObject2);

            let (canvas, context, (base64Str1, base64Str2)) =
              GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

            let sab1 =
              GenerateSingleSABSystem.generateSingleSAB(
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
                      == GLBTool.createFakeImage(
                           ~name=imageName,
                           ~src="object_url0",
                           (),
                         )
                      |> resolve;
                    });
               });
          })
        );

        describe("test image from cubemapTexture", () =>
          testPromise("test1", () => {
            let image1Name = "i1";
            let image2Name = "i2";
            let image3Name = "i3";
            let image4Name = "i4";
            let image5Name = "i5";
            let image6Name = "i6";

            let (
              state,
              textureResourceData1,
              texture1Name,
              (
                imageDataMap1,
                (image1_1, image1_2, image1_3, image1_4, image1_5, image1_6),
              ),
            ) =
              GenerateSingleRABTool.Test.createCubemapTextureResourceData(
                ~state=state^,
                ~image1Name,
                ~image2Name,
                ~image3Name,
                ~image4Name,
                ~image5Name,
                ~image6Name,
                (),
              );

            let resourceData1 =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~cubemapTextures=[|textureResourceData1|],
                ~imageDataMap=imageDataMap1,
                (),
              );

            let rab1 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

            let (state, cubemapTexture) =
              SkyboxTool.prepareCubemapTexture(state);

            let state =
              CubemapTextureTool.setAllSources(
                ~texture=cubemapTexture,
                ~image1Name,
                ~image2Name,
                ~image3Name,
                ~image4Name,
                ~image5Name,
                ~image6Name,
                ~state,
                (),
              );

            let _ =
              GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                sandbox,
              );

            let sab1 =
              GenerateSingleSABSystem.generateSingleSAB(
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

                      let cubemapTexture =
                        SceneTool.unsafeGetCubemapTexture(state);

                      (
                        CubemapTextureAPI.unsafeGetCubemapTexturePXSource(
                          cubemapTexture,
                          state,
                        ),
                        CubemapTextureAPI.unsafeGetCubemapTextureNXSource(
                          cubemapTexture,
                          state,
                        ),
                        CubemapTextureAPI.unsafeGetCubemapTexturePYSource(
                          cubemapTexture,
                          state,
                        ),
                        CubemapTextureAPI.unsafeGetCubemapTextureNYSource(
                          cubemapTexture,
                          state,
                        ),
                        CubemapTextureAPI.unsafeGetCubemapTexturePZSource(
                          cubemapTexture,
                          state,
                        ),
                        CubemapTextureAPI.unsafeGetCubemapTextureNZSource(
                          cubemapTexture,
                          state,
                        ),
                      )
                      |> expect
                      == (
                           GLBTool.createFakeImage(
                             ~name=image1Name,
                             ~src="object_url0",
                             (),
                           ),
                           GLBTool.createFakeImage(
                             ~name=image2Name,
                             ~src="object_url1",
                             (),
                           ),
                           GLBTool.createFakeImage(
                             ~name=image3Name,
                             ~src="object_url2",
                             (),
                           ),
                           GLBTool.createFakeImage(
                             ~name=image4Name,
                             ~src="object_url3",
                             (),
                           ),
                           GLBTool.createFakeImage(
                             ~name=image5Name,
                             ~src="object_url4",
                             (),
                           ),
                           GLBTool.createFakeImage(
                             ~name=image6Name,
                             ~src="object_url5",
                             (),
                           ),
                         )
                      |> resolve;
                    });
               });
          })
        );
      })
    );

    describe("build basicSourceTexture data", () =>
      describe("test flipY", () =>
        testPromise(
          "assembled sab gameObjects->texture->flipY not affected by dependency rab->texture->flipY",
          () => {
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
              GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
                ~state=state^,
                ~imageDataIndex=0,
                ~flipY=false,
                (),
              );

            let resourceData1 =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~basicSourceTextures=[|textureResourceData1|],
                ~imageDataMap,
                (),
              );

            let rab1 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

            let (state, gameObject2, transform2, (material2, texture2)) =
              GenerateAllABTool.TestDuplicateDataForSAB.TestDuplicateImageData.createGameObject1(
                imageName,
                state,
              );

            let state =
              state
              |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(
                   texture2,
                   true,
                 );

            let gameObject2Name = "g2";
            let state =
              state
              |> GameObjectAPI.setGameObjectName(gameObject2, gameObject2Name);

            let state = state |> SceneAPI.addSceneChild(gameObject2);

            let (canvas, context, (base64Str1, base64Str2)) =
              GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

            let sab1 =
              GenerateSingleSABSystem.generateSingleSAB(
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
                      |> BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                           _,
                           state,
                         )
                      |> expect == true
                      |> resolve;
                    });
               });
          },
        )
      )
    );

    describe("build cubemapTexture data", () =>
      describe("test flipY", () =>
        testPromise(
          "assembled sab gameObjects->texture->flipY not affected by dependency rab->texture->flipY",
          () => {
            let image1Name = "i1";
            let image2Name = "i2";
            let image3Name = "i3";
            let image4Name = "i4";
            let image5Name = "i5";
            let image6Name = "i6";

            let (
              state,
              textureResourceData1,
              texture1Name,
              (
                imageDataMap1,
                (image1_1, image1_2, image1_3, image1_4, image1_5, image1_6),
              ),
            ) =
              GenerateSingleRABTool.Test.createCubemapTextureResourceData(
                ~state=state^,
                ~image1Name,
                ~image2Name,
                ~image3Name,
                ~image4Name,
                ~image5Name,
                ~image6Name,
                ~flipY=true,
                (),
              );

            let resourceData1 =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~cubemapTextures=[|textureResourceData1|],
                ~imageDataMap=imageDataMap1,
                (),
              );

            let rab1 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

            let (state, cubemapTexture) =
              SkyboxTool.prepareCubemapTexture(state);

            let state =
              CubemapTextureTool.setAllSources(
                ~texture=cubemapTexture,
                ~image1Name,
                ~image2Name,
                ~image3Name,
                ~image4Name,
                ~image5Name,
                ~image6Name,
                ~state,
                (),
              );

            let _ =
              GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                sandbox,
              );

            let sab1 =
              GenerateSingleSABSystem.generateSingleSAB(
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

                      let cubemapTexture =
                        SceneTool.unsafeGetCubemapTexture(state);

                      CubemapTextureAPI.getCubemapTextureFlipY(
                        cubemapTexture,
                        state,
                      )
                      |> expect == false
                      |> resolve;
                    });
               });
          },
        )
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

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

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
          |> SceneAPI.addSceneChild(gameObject2)
          |> SceneAPI.addSceneChild(gameObject3);

        let sab1 =
          GenerateSingleSABSystem.generateSingleSAB(
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

    describe("mark is assembled", () =>
      testPromise("test", () => {
        let sab1 =
          GenerateSingleSABSystem.generateSingleSAB(
            SceneAPI.getSceneGameObject(state^),
            WonderCommonlib.MutableSparseMapService.createEmpty(),
            state^,
          );

        GenerateAllABTool.TestWithOneSAB.generateAllAB(sab1, state^)
        |> MostTool.testStream(data => {
             let state = StateAPI.unsafeGetState();

             let sab1RelativePath =
               GenerateAllABTool.TestWithOneSAB.getSABRelativePath();

             let isAssembledBeforeAssemble =
               OperateSABAssetBundleMainService.isAssembled(
                 sab1RelativePath,
                 state,
               );

             AssembleSABTool.TestWithOneSAB.assemble(data)
             |> MostTool.testStream(rootGameObject => {
                  let state = StateAPI.unsafeGetState();

                  (
                    isAssembledBeforeAssemble,
                    OperateSABAssetBundleMainService.isAssembled(
                      sab1RelativePath,
                      state,
                    ),
                  )
                  |> expect == (false, true)
                  |> resolve;
                });
           });
      })
    );
  });