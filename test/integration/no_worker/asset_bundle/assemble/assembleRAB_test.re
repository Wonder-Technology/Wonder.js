open Wonder_jest;

open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let _ =
  describe("assemble rab", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());

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

            let basicSourceTextureImageDataMap =
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
                ~basicSourceTextureImageDataMap,
                (),
              );

            let rab1 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

            let image2 =
              GenerateSingleRABTool.ResourceData.buildImageData(
                ~name=imageName,
                (),
              );

            let basicSourceTextureImageDataMap =
              WonderCommonlib.ImmutableSparseMapService.createEmpty()
              |> WonderCommonlib.ImmutableSparseMapService.set(0, image2);

            let (state, textureResourceData2) =
              GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
                ~state,
                ~imageDataIndex=0,
                (),
              );

            let resourceData2 =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~basicSourceTextures=[|textureResourceData2|],
                ~basicSourceTextureImageDataMap,
                (),
              );

            let rab2 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData2, state);

            GenerateAllABTool.TestWithTwoRAB.generateAllAB(
              (rab1, rab2),
              state,
            )
            |> MostTool.testStream(data => {
                 let (rab1RelativePath, rab2RelativePath) =
                   GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

                 AssembleRABTool.TestWithTwoRABs.assemble(data)
                 |> MostTool.testStream(() => {
                      let state = StateAPI.unsafeGetState();

                      OperateRABAssetBundleMainService.unsafeFindImageByName(
                        rab2RelativePath,
                        imageName,
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
                cubemapTextureImageDataMap1,
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
                ~cubemapTextureImageDataMap=cubemapTextureImageDataMap1,
                (),
              );

            let rab1 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

            let (
              state,
              textureResourceData2,
              texture2Name,
              (
                cubemapTextureImageDataMap2,
                (image2_1, image2_2, image2_3, image2_4, image2_5, image2_6),
              ),
            ) =
              GenerateSingleRABTool.Test.createCubemapTextureResourceData(
                ~state,
                ~image1Name,
                ~image2Name,
                ~image3Name,
                ~image4Name,
                ~image5Name,
                ~image6Name,
                (),
              );

            let resourceData2 =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~cubemapTextures=[|textureResourceData2|],
                ~cubemapTextureImageDataMap=cubemapTextureImageDataMap2,
                (),
              );

            let rab2 =
              GenerateSingleRABSystem.generateSingleRAB(resourceData2, state);

            GenerateAllABTool.TestWithTwoRAB.generateAllAB(
              (rab1, rab2),
              state,
            )
            |> MostTool.testStream(data => {
                 let (rab1RelativePath, rab2RelativePath) =
                   GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

                 AssembleRABTool.TestWithTwoRABs.assemble(data)
                 |> MostTool.testStream(() => {
                      let state = StateAPI.unsafeGetState();

                      (
                        OperateRABAssetBundleMainService.unsafeFindImageByName(
                          rab2RelativePath,
                          image1Name,
                          state,
                        ),
                        OperateRABAssetBundleMainService.unsafeFindImageByName(
                          rab2RelativePath,
                          image2Name,
                          state,
                        ),
                        OperateRABAssetBundleMainService.unsafeFindImageByName(
                          rab2RelativePath,
                          image3Name,
                          state,
                        ),
                        OperateRABAssetBundleMainService.unsafeFindImageByName(
                          rab2RelativePath,
                          image4Name,
                          state,
                        ),
                        OperateRABAssetBundleMainService.unsafeFindImageByName(
                          rab2RelativePath,
                          image5Name,
                          state,
                        ),
                        OperateRABAssetBundleMainService.unsafeFindImageByName(
                          rab2RelativePath,
                          image6Name,
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

    describe("build basicSourceTexture data", () => {
      describe("set source", () =>
        testPromise("test use image with duplicate data as source", () => {
          let imageName = "image1";

          let image1 =
            GenerateSingleRABTool.ResourceData.buildImageData(
              ~name=imageName,
              (),
            );

          let basicSourceTextureImageDataMap =
            WonderCommonlib.ImmutableSparseMapService.createEmpty()
            |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

          let texture1Name = "texture1";

          let (state, textureResourceData1) =
            GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
              ~state=state^,
              ~name=texture1Name,
              ~imageDataIndex=0,
              (),
            );

          let resourceData1 =
            GenerateSingleRABTool.ResourceData.buildResourceData(
              ~basicSourceTextures=[|textureResourceData1|],
              ~basicSourceTextureImageDataMap,
              (),
            );

          let rab1 =
            GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

          let image2 =
            GenerateSingleRABTool.ResourceData.buildImageData(
              ~name=imageName,
              (),
            );

          let basicSourceTextureImageDataMap =
            WonderCommonlib.ImmutableSparseMapService.createEmpty()
            |> WonderCommonlib.ImmutableSparseMapService.set(0, image2);

          let texture2Name = "texture2";

          let (state, textureResourceData2) =
            GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
              ~state,
              ~name=texture2Name,
              ~imageDataIndex=0,
              (),
            );

          let resourceData2 =
            GenerateSingleRABTool.ResourceData.buildResourceData(
              ~basicSourceTextures=[|textureResourceData2|],
              ~basicSourceTextureImageDataMap,
              (),
            );

          let rab2 =
            GenerateSingleRABSystem.generateSingleRAB(resourceData2, state);

          GenerateAllABTool.TestWithTwoRAB.generateAllAB((rab1, rab2), state)
          |> MostTool.testStream(data => {
               let (rab1RelativePath, rab2RelativePath) =
                 GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

               AssembleRABTool.TestWithTwoRABs.assemble(data)
               |> MostTool.testStream(() => {
                    let state = StateAPI.unsafeGetState();

                    let texture1 =
                      OperateRABAssetBundleMainService.unsafeFindBasicSourceTextureByName(
                        rab1RelativePath,
                        texture1Name,
                        state,
                      );
                    let texture2 =
                      OperateRABAssetBundleMainService.unsafeFindBasicSourceTextureByName(
                        rab2RelativePath,
                        texture2Name,
                        state,
                      );

                    (
                      BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                        texture1,
                        state,
                      ),
                      BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                        texture2,
                        state,
                      ),
                    )
                    |> expect
                    == (
                         GLBTool.createFakeImage(
                           ~name=imageName,
                           ~src="object_url0",
                           (),
                         ),
                         GLBTool.createFakeImage(
                           ~name=imageName,
                           ~src="object_url0",
                           (),
                         ),
                       )
                    |> resolve;
                  });
             });
        })
      );

      testPromise("test set parameter and name", () => {
        open TextureType;

        let imageName = "image1";

        let image1 =
          GenerateSingleRABTool.ResourceData.buildImageData(
            ~name=imageName,
            (),
          );

        let basicSourceTextureImageDataMap =
          WonderCommonlib.ImmutableSparseMapService.createEmpty()
          |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

        let texture1Name = "texture1";
        let wrapS = Mirrored_repeat;
        let wrapT = Repeat;
        let magFilter = Nearest;
        let minFilter = Nearest_mipmap_nearest;
        let format = Rgbas3tcdxt1;
        let type_ = 0;
        let flipY = false;

        let (state, textureResourceData1) =
          GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
            ~state=state^,
            ~name=texture1Name,
            ~imageDataIndex=0,
            ~magFilter=magFilter |> TextureType.filterToUint8,
            ~minFilter=minFilter |> TextureType.filterToUint8,
            ~wrapS=wrapS |> TextureType.wrapToUint8,
            ~wrapT=wrapT |> TextureType.wrapToUint8,
            ~format=format |> TextureType.formatToUint8,
            ~type_,
            ~flipY,
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~basicSourceTextures=[|textureResourceData1|],
            ~basicSourceTextureImageDataMap,
            (),
          );

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  let texture1 =
                    OperateRABAssetBundleMainService.unsafeFindBasicSourceTextureByName(
                      rab1RelativePath,
                      texture1Name,
                      state,
                    );

                  (
                    BasicSourceTextureAPI.unsafeGetBasicSourceTextureName(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureWrapS(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureWrapT(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureMagFilter(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureMinFilter(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureFormat(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureType(
                      texture1,
                      state,
                    ),
                    BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                      texture1,
                      state,
                    ),
                  )
                  |> expect
                  == (
                       texture1Name,
                       wrapS,
                       wrapT,
                       magFilter,
                       minFilter,
                       format,
                       type_,
                       flipY,
                     )
                  |> resolve;
                });
           });
      });
    });

    describe("build cubemapTexture data", () =>
      describe("set source", () =>
        testPromise("test use image with duplicate data as source", () => {
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
              cubemapTextureImageDataMap1,
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
              ~cubemapTextureImageDataMap=cubemapTextureImageDataMap1,
              (),
            );

          let rab1 =
            GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

          let (
            state,
            textureResourceData2,
            texture2Name,
            (
              cubemapTextureImageDataMap2,
              (image2_1, image2_2, image2_3, image2_4, image2_5, image2_6),
            ),
          ) =
            GenerateSingleRABTool.Test.createCubemapTextureResourceData(
              ~state,
              ~image1Name,
              ~image2Name,
              ~image3Name,
              ~image4Name,
              ~image5Name,
              ~image6Name,
              (),
            );

          let resourceData2 =
            GenerateSingleRABTool.ResourceData.buildResourceData(
              ~cubemapTextures=[|textureResourceData2|],
              ~cubemapTextureImageDataMap=cubemapTextureImageDataMap2,
              (),
            );

          let rab2 =
            GenerateSingleRABSystem.generateSingleRAB(resourceData2, state);

          GenerateAllABTool.TestWithTwoRAB.generateAllAB((rab1, rab2), state)
          |> MostTool.testStream(data => {
               let (rab1RelativePath, rab2RelativePath) =
                 GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

               AssembleRABTool.TestWithTwoRABs.assemble(data)
               |> MostTool.testStream(() => {
                    let state = StateAPI.unsafeGetState();

                    let texture1 =
                      OperateRABAssetBundleMainService.unsafeFindCubemapTextureByName(
                        rab1RelativePath,
                        texture1Name,
                        state,
                      );
                    let texture2 =
                      OperateRABAssetBundleMainService.unsafeFindCubemapTextureByName(
                        rab2RelativePath,
                        texture2Name,
                        state,
                      );

                    (
                      CubemapTextureAPI.unsafeGetCubemapTexturePXSource(
                        texture1,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTextureNXSource(
                        texture1,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTexturePYSource(
                        texture1,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTextureNYSource(
                        texture1,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTexturePZSource(
                        texture1,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTextureNZSource(
                        texture1,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTexturePXSource(
                        texture2,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTextureNXSource(
                        texture2,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTexturePYSource(
                        texture2,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTextureNYSource(
                        texture2,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTexturePZSource(
                        texture2,
                        state,
                      ),
                      CubemapTextureAPI.unsafeGetCubemapTextureNZSource(
                        texture2,
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
      )
    );

    testPromise("test set parameter and name", () => {
      open TextureType;

      let (
        textureName,
        (
          cubemapTextureImageDataMap,
          (image1, image2, image3, image4, image5, image6),
        ),
      ) =
        GenerateSingleRABTool.Test.prepareCubemapTextureResourceData();

      let texture1Name = "texture1";
      let wrapS = Mirrored_repeat;
      let wrapT = Repeat;
      let magFilter = Nearest;
      let minFilter = Nearest_mipmap_nearest;
      let pxFormat = Rgbas3tcdxt1;
      let pyType = 0;
      let flipY = false;

      let (state, textureResourceData1) =
        GenerateSingleRABTool.ResourceData.createCubemapTextureResourceData(
          ~state=state^,
          ~name=texture1Name,
          ~magFilter=magFilter |> TextureType.filterToUint8,
          ~minFilter=minFilter |> TextureType.filterToUint8,
          ~wrapS=wrapS |> TextureType.wrapToUint8,
          ~wrapT=wrapT |> TextureType.wrapToUint8,
          ~pxFormat=pxFormat |> TextureType.formatToUint8,
          ~pyType,
          ~flipY,
          (),
        );

      let resourceData1 =
        GenerateSingleRABTool.ResourceData.buildResourceData(
          ~cubemapTextures=[|textureResourceData1|],
          ~cubemapTextureImageDataMap,
          (),
        );

      let rab1 =
        GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

      GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
      |> MostTool.testStream(data => {
           let rab1RelativePath =
             GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

           AssembleRABTool.TestWithOneRAB.assemble(data)
           |> MostTool.testStream(() => {
                let state = StateAPI.unsafeGetState();

                let texture1 =
                  OperateRABAssetBundleMainService.unsafeFindCubemapTextureByName(
                    rab1RelativePath,
                    texture1Name,
                    state,
                  );

                (
                  CubemapTextureAPI.unsafeGetCubemapTextureName(
                    texture1,
                    state,
                  ),
                  CubemapTextureAPI.getCubemapTextureWrapS(texture1, state),
                  CubemapTextureAPI.getCubemapTextureWrapT(texture1, state),
                  CubemapTextureAPI.getCubemapTextureMagFilter(
                    texture1,
                    state,
                  ),
                  CubemapTextureAPI.getCubemapTextureMinFilter(
                    texture1,
                    state,
                  ),
                  CubemapTextureAPI.getCubemapTexturePXFormat(
                    texture1,
                    state,
                  ),
                  CubemapTextureAPI.getCubemapTexturePYType(texture1, state),
                  CubemapTextureAPI.getCubemapTextureFlipY(texture1, state),
                )
                |> expect
                == (
                     texture1Name,
                     wrapS,
                     wrapT,
                     magFilter,
                     minFilter,
                     pxFormat,
                     pyType,
                     flipY,
                   )
                |> resolve;
              });
         });
    });

    describe("build basicMaterial data", () =>
      testPromise("test set name and color", () => {
        let name = "bm1";
        let color = [|0.5, 0.5, 1.|];

        let (state, basicMaterialResourceData1) =
          GenerateSingleRABTool.ResourceData.createBasicMaterialResourceData(
            ~state=state^,
            ~color,
            ~name,
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~basicMaterials=[|basicMaterialResourceData1|],
            (),
          );

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  let material =
                    OperateRABAssetBundleMainService.unsafeFindBasicMaterialByName(
                      rab1RelativePath,
                      name,
                      state,
                    );

                  (
                    BasicMaterialAPI.unsafeGetBasicMaterialName(
                      material,
                      state,
                    ),
                    BasicMaterialAPI.getBasicMaterialColor(material, state),
                  )
                  |> expect == (name, color)
                  |> resolve;
                });
           });
      })
    );

    describe("build lightMaterial data", () => {
      testPromise("test set name and diffuseColor and shininess", () => {
        let name = "lm1";
        let color = [|0.5, 0.5, 1.|];
        let shininess = 10.;

        let (state, lightMaterialResourceData1) =
          GenerateSingleRABTool.ResourceData.createLightMaterialResourceData(
            ~state=state^,
            ~diffuseColor=color,
            ~shininess,
            ~name,
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~lightMaterials=[|lightMaterialResourceData1|],
            (),
          );

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  let material =
                    OperateRABAssetBundleMainService.unsafeFindLightMaterialByName(
                      rab1RelativePath,
                      name,
                      state,
                    );

                  (
                    LightMaterialAPI.unsafeGetLightMaterialName(
                      material,
                      state,
                    ),
                    LightMaterialAPI.getLightMaterialDiffuseColor(
                      material,
                      state,
                    ),
                    LightMaterialAPI.getLightMaterialShininess(
                      material,
                      state,
                    ),
                  )
                  |> expect == (name, color, shininess)
                  |> resolve;
                });
           });
      });
      testPromise("test set diffuseMap", () => {
        let imageName = "image1";

        let image1 =
          GenerateSingleRABTool.ResourceData.buildImageData(
            ~name=imageName,
            (),
          );

        let basicSourceTextureImageDataMap =
          WonderCommonlib.ImmutableSparseMapService.createEmpty()
          |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

        let texture1Name = "t1";
        let (state, textureResourceData1) =
          GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
            ~state=state^,
            ~imageDataIndex=0,
            ~name=texture1Name,
            (),
          );

        let lightMaterial1Name = "lightMaterial1";
        let (state, lightMaterial1) =
          GenerateSingleRABTool.ResourceData.createLightMaterialResourceData(
            ~state,
            ~diffuseMap=Some(textureResourceData1.textureComponent),
            ~name=lightMaterial1Name,
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~basicSourceTextures=[|textureResourceData1|],
            ~lightMaterials=[|lightMaterial1|],
            ~basicSourceTextureImageDataMap,
            (),
          );

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  let material =
                    OperateRABAssetBundleMainService.unsafeFindLightMaterialByName(
                      rab1RelativePath,
                      lightMaterial1Name,
                      state,
                    );

                  LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                    material,
                    state,
                  )
                  |> expect
                  == OperateRABAssetBundleMainService.unsafeFindBasicSourceTextureByName(
                       rab1RelativePath,
                       texture1Name,
                       state,
                     )
                  |> resolve;
                });
           });
      });
    });

    describe("build geometry data", () => {
      beforeEach(() =>
        state :=
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(
                ~geometryPointCount=10,
                ~geometryCount=10,
                (),
              ),
            (),
          )
      );

      describe("test has duplicate data", () =>
        testPromise("test1", () => {
          let (
            state,
            gameObject1,
            geometry1,
            name1,
            (vertices1, texCoords1, normals1, indices16_1, indices32_1),
          ) =
            GenerateSingleRABTool.ResourceData.createGeometryResourceData(
              ~state=state^,
              ~name="geometry1",
              ~vertices=Float32Array.make([|10., 11., 12.|]),
              ~indices16=None,
              ~indices32=Some(Uint32Array.make([|0|])),
              (),
            );

          let resourceData1 =
            GenerateSingleRABTool.ResourceData.buildResourceData(
              ~geometrys=[|geometry1|],
              (),
            );

          let (
            state,
            gameObject2,
            geometry2,
            name2,
            (vertices2, texCoords2, normals2, indices16_2, indices32_2),
          ) =
            GenerateSingleRABTool.ResourceData.createGeometryResourceData(
              ~state,
              ~name="geometry1",
              ~vertices=Float32Array.make([|5., 6., 11.|]),
              ~normals=Float32Array.make([|8., 1., 2.|])->Some,
              ~indices16=None,
              ~indices32=Some(Uint32Array.make([|0|])),
              (),
            );

          let (
            state,
            gameObject3,
            geometry3,
            name3,
            (vertices3, texCoords3, normals3, indices16_3, indices32_3),
          ) =
            GenerateSingleRABTool.ResourceData.createGeometryResourceData(
              ~state,
              ~name="geometry3",
              ~vertices=Float32Array.make([|1., 2., 3., 4., 5., 6.|]),
              ~texCoords=Float32Array.make([|1.5, 2., 0., 0.|])->Some,
              ~indices16=Some(Uint16Array.make([|1, 0|])),
              ~indices32=None,
              (),
            );

          let resourceData2 =
            GenerateSingleRABTool.ResourceData.buildResourceData(
              ~geometrys=[|geometry2, geometry3|],
              (),
            );

          let rab1 =
            GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

          let rab2 =
            GenerateSingleRABSystem.generateSingleRAB(resourceData2, state);

          GenerateAllABTool.TestWithTwoRAB.generateAllAB((rab1, rab2), state)
          |> MostTool.testStream(data => {
               let (rab1RelativePath, rab2RelativePath) =
                 GenerateAllABTool.TestWithTwoRAB.getRabRelativePaths();

               AssembleRABTool.TestWithTwoRABs.assemble(data)
               |> MostTool.testStream(() => {
                    let state = StateAPI.unsafeGetState();

                    let geometry1_1 =
                      OperateRABAssetBundleMainService.unsafeFindGeometryByName(
                        rab1RelativePath,
                        "geometry1",
                        state,
                      );
                    let geometry2_2 =
                      OperateRABAssetBundleMainService.unsafeFindGeometryByName(
                        rab2RelativePath,
                        "geometry1",
                        state,
                      );
                    let geometry2_3 =
                      OperateRABAssetBundleMainService.unsafeFindGeometryByName(
                        rab2RelativePath,
                        "geometry3",
                        state,
                      );

                    (
                      geometry2_2,
                      GeometryAPI.getGeometryVertices(geometry1_1, state),
                      GeometryAPI.getGeometryNormals(geometry1_1, state),
                      GeometryAPI.getGeometryTexCoords(geometry1_1, state),
                      GeometryAPI.hasGeometryIndices16(geometry1_1, state),
                      GeometryAPI.getGeometryIndices32(geometry1_1, state),
                      GeometryAPI.getGeometryVertices(geometry2_3, state),
                      GeometryAPI.getGeometryNormals(geometry2_3, state),
                      GeometryAPI.getGeometryTexCoords(geometry2_3, state),
                      GeometryAPI.getGeometryIndices16(geometry2_3, state),
                      GeometryAPI.hasGeometryIndices32(geometry2_3, state),
                    )
                    |> expect
                    == (
                         geometry1_1,
                         vertices1,
                         normals1,
                         texCoords1,
                         false,
                         indices32_1,
                         vertices3,
                         normals3,
                         texCoords3,
                         indices16_3,
                         false,
                       )
                    |> resolve;
                  });
             });
        })
      );
    });

    describe("build script event function data", () =>
      testPromise("test", () => {
        let scriptEventFunctionData1Name = "s1";
        let (state, scriptEventFunctionDataResourceData1) =
          GenerateSingleRABTool.ResourceData.createScriptEventFunctionDataResourceData(
            ~state=state^,
            ~name=scriptEventFunctionData1Name,
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~scriptEventFunctionDataArr=[|
              scriptEventFunctionDataResourceData1,
            |],
            (),
          );

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  let eventFunctionData =
                    OperateRABAssetBundleMainService.unsafeFindScriptEventFunctionDataByName(
                      rab1RelativePath,
                      scriptEventFunctionData1Name,
                      state,
                    );

                  (
                    eventFunctionData.init |> SerializeService.serializeFunction,
                    eventFunctionData.update
                    |> SerializeService.serializeFunction,
                    eventFunctionData.dispose
                    |> SerializeService.serializeFunction,
                  )
                  |> expect
                  == (
                       ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc()
                       |> SerializeService.serializeFunction,
                       ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
                       |> SerializeService.serializeFunction,
                       ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc()
                       |> SerializeService.serializeFunction,
                     )
                  |> resolve;
                });
           });
      })
    );

    describe("build script attribute", () =>
      testPromise("test", () => {
        let scriptAttribute1Name = "s1";
        let (state, scriptAttributeResourceData1) =
          GenerateSingleRABTool.ResourceData.createScriptAttributeResourceData(
            ~state=state^,
            ~name=scriptAttribute1Name,
            (),
          );

        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~scriptAttributeDataArr=[|scriptAttributeResourceData1|],
            (),
          );

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  let attribute =
                    OperateRABAssetBundleMainService.unsafeFindScriptAttributeByName(
                      rab1RelativePath,
                      scriptAttribute1Name,
                      state,
                    );

                  ScriptAttributeAPI.getScriptAttributeEntries(attribute)
                  |> Js.Array.length
                  |> expect == 2
                  |> resolve;
                });
           });
      })
    );

    describe("mark is assembled", () =>
      testPromise("test", () => {
        let resourceData1 =
          GenerateSingleRABTool.ResourceData.buildResourceData();

        let rab1 =
          GenerateSingleRABSystem.generateSingleRAB(resourceData1, state^);

        GenerateAllABTool.TestWithOneRAB.generateAllAB(rab1, state^)
        |> MostTool.testStream(data => {
             let rab1RelativePath =
               GenerateAllABTool.TestWithOneRAB.getRabRelativePath();

             let state = StateAPI.unsafeGetState();

             let isAssembledBeforeAssemble =
               OperateRABAssetBundleMainService.isAssembled(
                 rab1RelativePath,
                 state,
               );

             AssembleRABTool.TestWithOneRAB.assemble(data)
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  (
                    isAssembledBeforeAssemble,
                    OperateRABAssetBundleMainService.isAssembled(
                      rab1RelativePath,
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