open Wonder_jest;

open RABType;

open Js.Typed_array;

let _ =
  describe("generate single rab", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());

      GenerateSingleRABTool.prepare(sandbox^);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test images", () => {
      test("test from basic source texture", () => {
        let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

        let basicSourceTextureImageDataMap =
          WonderCommonlib.ImmutableSparseMapService.createEmpty()
          |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

        let (state, textureResourceData) =
          GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
            ~state=state^,
            ~name="texture1",
            ~imageDataIndex=0,
            (),
          );

        let resourceData =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~basicSourceTextures=[|textureResourceData|],
            ~basicSourceTextureImageDataMap,
            (),
          );

        let rab =
          GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

        let content =
          GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
            rab,
          );

        content.images
        |> expect
        == [|
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image1.name,
               ~mimeType=image1.mimeType,
               ~bufferView=0,
               (),
             ),
           |];
      });
      test("test from cubemap texture", () => {
        let (
          state,
          textureResourceData,
          textureName,
          (
            cubemapTextureImageDataMap,
            (image1, image2, image3, image4, image5, image6),
          ),
        ) =
          GenerateSingleRABTool.Test.createCubemapTextureResourceData(
            ~state=state^,
            (),
          );

        let resourceData =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~cubemapTextures=[|textureResourceData|],
            ~cubemapTextureImageDataMap,
            (),
          );

        let rab =
          GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

        let content =
          GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
            rab,
          );

        content.images
        |> expect
        == [|
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image1.name,
               ~mimeType=image1.mimeType,
               ~bufferView=0,
               (),
             ),
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image2.name,
               ~mimeType=image2.mimeType,
               ~bufferView=1,
               (),
             ),
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image3.name,
               ~mimeType=image3.mimeType,
               ~bufferView=2,
               (),
             ),
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image4.name,
               ~mimeType=image4.mimeType,
               ~bufferView=3,
               (),
             ),
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image5.name,
               ~mimeType=image5.mimeType,
               ~bufferView=4,
               (),
             ),
             GenerateSingleRABTool.ResourceAssetBundleContent.buildImageData(
               ~name=image6.name,
               ~mimeType=image6.mimeType,
               ~bufferView=5,
               (),
             ),
           |];
      });
    });

    describe("test lightMaterials and basicSourceTextures", () => {
      test(
        "if lightMaterial->maps not contain in resourceData->textures, contract error",
        () => {
        let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

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

        let lightMaterial1Name = "lightMaterial1";
        let (state, lightMaterial) =
          GenerateSingleRABTool.ResourceData.createLightMaterialResourceData(
            ~state,
            ~diffuseMap=Some(textureResourceData1.textureComponent),
            ~name=lightMaterial1Name,
            (),
          );

        let resourceData =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~basicSourceTextures=[||],
            ~lightMaterials=[|lightMaterial|],
            ~basicSourceTextureImageDataMap,
            (),
          );

        expect(() =>
          GenerateSingleRABSystem.generateSingleRAB(resourceData, state)
        )
        |> toThrowMessage(
             "expect lightMaterial->maps contain in resourceData->basicSourceTextures",
           );
      });

      describe(
        "test basicSourceTexture resource data not contain in lightMaterial resource data",
        () => {
          test("test lightMaterial has no diffuseMap", () => {
            let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

            let basicSourceTextureImageDataMap =
              WonderCommonlib.ImmutableSparseMapService.createEmpty()
              |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

            let texture1Name = "texture1";
            let (state, textureResourceData) =
              GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
                ~state=state^,
                ~name=texture1Name,
                ~imageDataIndex=0,
                (),
              );

            let lightMaterial1Name = "lightMaterial1";
            let (state, lightMaterial) =
              GenerateSingleRABTool.ResourceData.createLightMaterialResourceData(
                ~state,
                ~diffuseMap=None,
                ~name=lightMaterial1Name,
                (),
              );

            let resourceData =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~basicSourceTextures=[|textureResourceData|],
                ~lightMaterials=[|lightMaterial|],
                ~basicSourceTextureImageDataMap,
                (),
              );

            let rab =
              GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

            let content =
              GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
                rab,
              );

            (content.basicSourceTextures, content.lightMaterials)
            |> expect
            == (
                 [|
                   GenerateSingleRABTool.ResourceAssetBundleContent.buildBasicSourceTextureData(
                     ~name=texture1Name,
                     ~source=0,
                     (),
                   ),
                 |],
                 [|
                   GenerateSingleRABTool.ResourceAssetBundleContent.buildLightMaterialData(
                     ~name=lightMaterial1Name,
                     ~diffuseMap=None,
                     (),
                   ),
                 |],
               );
          });
          test("test lightMaterial has one diffuseMap", () => {
            let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

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

            let texture2Name = "texture2";
            let (state, textureResourceData2) =
              GenerateSingleRABTool.ResourceData.createBasicSourceTextureResourceData(
                ~state,
                ~name=texture2Name,
                ~imageDataIndex=0,
                (),
              );

            let lightMaterial1Name = "lightMaterial1";
            let (state, lightMaterial) =
              GenerateSingleRABTool.ResourceData.createLightMaterialResourceData(
                ~state,
                ~diffuseMap=Some(textureResourceData2.textureComponent),
                ~name=lightMaterial1Name,
                (),
              );

            let resourceData =
              GenerateSingleRABTool.ResourceData.buildResourceData(
                ~basicSourceTextures=[|
                  textureResourceData1,
                  textureResourceData2,
                |],
                ~lightMaterials=[|lightMaterial|],
                ~basicSourceTextureImageDataMap,
                (),
              );

            let rab =
              GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

            let content =
              GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
                rab,
              );

            (content.basicSourceTextures, content.lightMaterials)
            |> expect
            == (
                 [|
                   GenerateSingleRABTool.ResourceAssetBundleContent.buildBasicSourceTextureData(
                     ~name=texture1Name,
                     ~source=0,
                     (),
                   ),
                   GenerateSingleRABTool.ResourceAssetBundleContent.buildBasicSourceTextureData(
                     ~name=texture2Name,
                     ~source=0,
                     (),
                   ),
                 |],
                 [|
                   GenerateSingleRABTool.ResourceAssetBundleContent.buildLightMaterialData(
                     ~name=lightMaterial1Name,
                     ~diffuseMap=Some(1),
                     (),
                   ),
                 |],
               );
          });
        },
      );
    });

    describe("test cubemapTextures", () =>
      test("test", () => {
        let (
          state,
          textureResourceData,
          textureName,
          (cubemapTextureImageDataMap, _),
        ) =
          GenerateSingleRABTool.Test.createCubemapTextureResourceData(
            ~state=state^,
            (),
          );

        let resourceData =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~cubemapTextures=[|textureResourceData|],
            ~cubemapTextureImageDataMap,
            (),
          );

        let rab =
          GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

        let content =
          GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
            rab,
          );

        content.cubemapTextures
        |> expect
        == [|
             GenerateSingleRABTool.ResourceAssetBundleContent.buildCubemapTextureData(
               ~name=textureName,
               ~pxSource=Some(0),
               ~nxSource=Some(1),
               ~pySource=Some(2),
               ~nySource=Some(3),
               ~pzSource=Some(4),
               ~nzSource=Some(5),
               (),
             ),
           |];
      })
    );

    describe("test geometrys", () =>
      test("test", () => {
        let (
          state,
          gameObject,
          geometry,
          name,
          (vertices, texCoords, normals, indices16, indices32),
        ) =
          GenerateSingleRABTool.ResourceData.createGeometryResourceData(
            ~state=state^,
            ~indices16=None,
            ~indices32=Some(Uint32Array.make([|2|])),
            (),
          );

        let resourceData =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~geometrys=[|geometry|],
            (),
          );

        let rab =
          GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

        let content =
          GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
            rab,
          );

        content.geometrys
        |> expect
        == [|
             GenerateSingleRABTool.ResourceAssetBundleContent.buildGeometryData(
               ~name,
               ~indexDataType=RABType.Index32,
               ~vertexBufferView=0,
               ~normalBufferView=ABBufferViewUtils.buildNoneBufferViewIndex(),
               ~texCoordBufferView=
                 ABBufferViewUtils.buildNoneBufferViewIndex(),
               ~indexBufferView=1,
               (),
             ),
           |];
      })
    );
  });