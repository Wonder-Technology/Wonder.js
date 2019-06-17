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

    describe("test images", () =>
      test("test", () => {
        let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

        let imageDataMap =
          WonderCommonlib.ImmutableSparseMapService.createEmpty()
          |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

        let (state, textureResourceData) =
          GenerateSingleRABTool.ResourceData.createTextureResourceData(
            ~state=state^,
            ~name="texture1",
            ~imageDataIndex=0,
            (),
          );

        let resourceData =
          GenerateSingleRABTool.ResourceData.buildResourceData(
            ~textures=[|textureResourceData|],
            ~imageDataMap,
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
      })
    );

    /* TODO describe
       ("test textures",
       (
       () => {

       })
       ); */

    describe("test lightMaterials", () => {
      test(
        "if lightMaterial->maps not contain in resourceData->textures, contract error",
        () => {
        let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

        let imageDataMap =
          WonderCommonlib.ImmutableSparseMapService.createEmpty()
          |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

        let texture1Name = "texture1";
        let (state, textureResourceData1) =
          GenerateSingleRABTool.ResourceData.createTextureResourceData(
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
            ~textures=[||],
            ~lightMaterials=[|lightMaterial|],
            ~imageDataMap,
            (),
          );

        expect(() =>
          GenerateSingleRABSystem.generateSingleRAB(resourceData, state)
        )
        |> toThrowMessage(
             "expect lightMaterial->maps contain in resourceData->textures",
           );
      });

      describe(
        "test texture resource data not contain in lightMaterial resource data",
        () => {
        test("test lightMaterial has no diffuseMap", () => {
          let image1 = GenerateSingleRABTool.ResourceData.buildImageData();

          let imageDataMap =
            WonderCommonlib.ImmutableSparseMapService.createEmpty()
            |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

          let texture1Name = "texture1";
          let (state, textureResourceData) =
            GenerateSingleRABTool.ResourceData.createTextureResourceData(
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
              ~textures=[|textureResourceData|],
              ~lightMaterials=[|lightMaterial|],
              ~imageDataMap,
              (),
            );

          let rab =
            GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

          let content =
            GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
              rab,
            );

          (content.textures, content.lightMaterials)
          |> expect
          == (
               [|
                 GenerateSingleRABTool.ResourceAssetBundleContent.buildTextureData(
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

          let imageDataMap =
            WonderCommonlib.ImmutableSparseMapService.createEmpty()
            |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

          let texture1Name = "texture1";
          let (state, textureResourceData1) =
            GenerateSingleRABTool.ResourceData.createTextureResourceData(
              ~state=state^,
              ~name=texture1Name,
              ~imageDataIndex=0,
              (),
            );

          let texture2Name = "texture2";
          let (state, textureResourceData2) =
            GenerateSingleRABTool.ResourceData.createTextureResourceData(
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
              ~textures=[|textureResourceData1, textureResourceData2|],
              ~lightMaterials=[|lightMaterial|],
              ~imageDataMap,
              (),
            );

          let rab =
            GenerateSingleRABSystem.generateSingleRAB(resourceData, state);

          let content =
            GenerateSingleRABTool.ResourceAssetBundleContent.getResourceAssetBundleContent(
              rab,
            );

          (content.textures, content.lightMaterials)
          |> expect
          == (
               [|
                 GenerateSingleRABTool.ResourceAssetBundleContent.buildTextureData(
                   ~name=texture1Name,
                   ~source=0,
                   (),
                 ),
                 GenerateSingleRABTool.ResourceAssetBundleContent.buildTextureData(
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
      });
    });

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