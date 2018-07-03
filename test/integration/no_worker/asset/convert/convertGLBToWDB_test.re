open Wonder_jest;

open Js.Promise;

open WDType;

open Js.Typed_array;

let _ =
  describe("convert glb to wd", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test multi primitives", () => {
      describe("convert multi primitives to gltf nodes", () => {
        let _prepare = () => {
          let gltf =
            ConvertGLTFJsonToRecordSystem.convert(
              ConvertGLBTool.buildGLTFJsonOfMultiPrimitivesWithName()
              |> Js.Json.parseExn,
            );
          ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes(gltf);
        };

        test("test nodes", () => {
          open GLTFType;
          let gltfRecord = _prepare();
          gltfRecord.nodes
          |>
          expect == [|
                      ConvertGLBTool.buildNode(
                        ~children=Some([|3, 2, 1, 4, 5|]),
                        (),
                      ),
                      ConvertGLBTool.buildNode(
                        ~name=Some("node1"),
                        ~mesh=Some(1),
                        ~matrix=
                          Some([|
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
                            30.0,
                            50.0,
                            1.0,
                          |]),
                        (),
                      ),
                      ConvertGLBTool.buildNode(
                        ~name=Some("node2"),
                        ~children=Some([|1, 6, 7|]),
                        ~matrix=
                          Some([|
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
                            1.0,
                            2.0,
                            3.0,
                            1.0,
                          |]),
                        (),
                      ),
                      ConvertGLBTool.buildNode(
                        ~children=Some([|8, 9|]),
                        (),
                      ),
                      ConvertGLBTool.buildNode(~mesh=Some(3), ()),
                      ConvertGLBTool.buildNode(~mesh=Some(4), ()),
                      ConvertGLBTool.buildNode(
                        ~name=Some("node2_0"),
                        ~mesh=Some(3),
                        (),
                      ),
                      ConvertGLBTool.buildNode(
                        ~name=Some("node2_1"),
                        ~mesh=Some(4),
                        (),
                      ),
                      ConvertGLBTool.buildNode(~mesh=Some(5), ()),
                      ConvertGLBTool.buildNode(~mesh=Some(6), ()),
                    |];
        });
        test("test meshes", () => {
          open GLTFType;
          let gltfRecord = _prepare();
          gltfRecord.meshes
          |>
          expect == [|
                      {
                        name: Some("mesh0"),
                        primitives: [|
                          {
                            attributes: {
                              position: 2,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(0),
                            material: Some(0),
                          },
                          {
                            attributes: {
                              position: 6,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(4),
                            material: Some(1),
                          },
                        |],
                      },
                      {
                        name: None,
                        primitives: [|
                          {
                            attributes: {
                              position: 9,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(7),
                            material: Some(2),
                          },
                        |],
                      },
                      {
                        name: None,
                        primitives: [|
                          {
                            attributes: {
                              position: 10,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(8),
                            material: Some(2),
                          },
                          {
                            attributes: {
                              position: 6,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(4),
                            material: Some(1),
                          },
                        |],
                      },
                      {
                        name: Some("mesh0_0"),
                        primitives: [|
                          {
                            attributes: {
                              position: 2,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(0),
                            material: Some(0),
                          },
                        |],
                      },
                      {
                        name: Some("mesh0_1"),
                        primitives: [|
                          {
                            attributes: {
                              position: 6,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(4),
                            material: Some(1),
                          },
                        |],
                      },
                      {
                        name: None,
                        primitives: [|
                          {
                            attributes: {
                              position: 10,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(8),
                            material: Some(2),
                          },
                        |],
                      },
                      {
                        name: None,
                        primitives: [|
                          {
                            attributes: {
                              position: 6,
                              normal: None,
                              texCoord_0: None,
                              texCoord_1: None,
                            },
                            indices: Some(4),
                            material: Some(1),
                          },
                        |],
                      },
                    |];
        });
      });

      describe("test convert to wd", () => {
        test("test customGeometrys", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
            ~state,
            ~testFunc=
              ({customGeometrys}) =>
                customGeometrys
                |>
                expect == [|
                            None,
                            Some({
                              position: 9,
                              normal: None,
                              texCoord: None,
                              index: 7,
                            }),
                            Some({
                              position: 2,
                              normal: None,
                              texCoord: None,
                              index: 0,
                            }),
                            Some({
                              position: 6,
                              normal: None,
                              texCoord: None,
                              index: 4,
                            }),
                          |],
            (),
          )
        );

        describe("test gameObjects", () =>
          test("test count", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
              ~state,
              ~testFunc=({gameObjects}) => gameObjects.count |> expect == 7,
              (),
            )
          )
        );

        describe("test indices", () =>
          describe("test gameObjectIndices", () =>
            describe("test geometryGameObjectIndices", () =>
              test(
                "test multi primitives geometry should has no gameObject", () =>
                ConvertGLBTool.testGLTFResultByGLTF(
                  ~sandbox=sandbox^,
                  ~embeddedGLTFJsonStr=
                    ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
                  ~state,
                  ~testFunc=
                    ({indices}) =>
                      indices.gameObjectIndices.
                        customGeometryGameObjectIndexData
                      |>
                      expect == {
                                  gameObjectIndices: [|1, 3, 4, 5, 6|],
                                  componentIndices: [|1, 2, 3, 2, 3|],
                                },
                  (),
                )
              )
            )
          )
        );
      });
    });

    describe("test set default material", () => {
      test("test default lightMaterial", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~state,
          ~testFunc=
            ({lightMaterials}) =>
              lightMaterials
              |>
              expect == [|
                          {
                            diffuseColor:
                              ConvertGLBTool.getDefaultDiffuseColor(),
                            name: "defaultMaterial",
                          },
                        |],
          (),
        )
      );
      test("test customGeometrys", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~state,
          ~testFunc=
            ({customGeometrys}) =>
              customGeometrys
              |>
              expect == [|
                          Some({
                            position: 1,
                            normal: None,
                            texCoord: None,
                            index: 0,
                          }),
                        |],
          (),
        )
      );

      test("test default material's lightMaterialGameObjectIndexData", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~state,
          ~testFunc=
            ({indices}) =>
              indices.gameObjectIndices.lightMaterialGameObjectIndexData
              |>
              expect == ConvertGLBTool.buildComponentIndexData(
                          [|0|],
                          [|0|],
                        ),
          (),
        )
      );
    });

    test("test asset", () =>
      ConvertGLBTool.testGLTFResultByGLTF(
        ~sandbox=sandbox^,
        ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
        ~state,
        ~testFunc=
          ({asset}) =>
            asset |> expect == {version: "2.0", generator: "GLTF2WD"},
        (),
      )
    );

    describe("test scene", () => {
      test("test gameObjects", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=({scene}) => scene.gameObjects |> expect == [|0|],
          (),
        )
      );

      test("test ambientLight", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ({scene}) =>
              scene.ambientLight |> expect == Some({color: [|1., 0.5, 1.|]}),
          (),
        )
      );
    });

    describe("test directionLights", () =>
      test("test light gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ({directionLights}) =>
              directionLights
              |> expect == [|{color: [|0.5, 0.5, 1.|], intensity: 1.}|],
          (),
        )
      )
    );

    describe("test pointLights", () =>
      test("test light gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ({pointLights}) =>
              pointLights
              |>
              expect == [|
                          {
                            color: [|0., 0., 0.|],
                            intensity: 2.5,
                            constantAttenuation: 1.,
                            linearAttenuation: 1.5,
                            quadraticAttenuation: 0.,
                            range: 55.5,
                          },
                        |],
          (),
        )
      )
    );

    describe("test gameObjects", () => {
      test("test single node gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ({gameObjects}) =>
              gameObjects |> expect == {count: 1, names: [|"gameObject_0"|]},
          (),
        )
      );
      test("test truck glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          (({gameObjects}, binBuffer)) =>
          gameObjects
          |>
          expect == {
                      count: 8,
                      names: [|
                        "gameObject_0",
                        "gameObject_1",
                        "Wheels",
                        "gameObject_3",
                        "Wheels",
                        "Cesium_Milk_Truck_0",
                        "Cesium_Milk_Truck_1",
                        "Cesium_Milk_Truck_2",
                      |],
                    }
        )
      );
    });

    describe("test camera data", () => {
      describe("test basicCameraViews", () => {
        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({basicCameraViews}) =>
                basicCameraViews |> expect == {count: 0},
            (),
          )
        );
        test("test camera gltf", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
            ~state,
            ~testFunc=
              ({basicCameraViews}) =>
                basicCameraViews |> expect == {count: 3},
            (),
          )
        );
      });
      describe("test perspectiveCameraProjections", () => {
        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({perspectiveCameraProjections}) =>
                perspectiveCameraProjections |> expect == [||],
            (),
          )
        );
        test("test camera gltf", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
            ~state,
            ~testFunc=
              ({perspectiveCameraProjections}) =>
                perspectiveCameraProjections
                |>
                expect == [|
                            {
                              near: 1.0,
                              far: Some(10000.0),
                              aspect: Some(1.5),
                              fovy: 34.37746770784939,
                            },
                            {
                              near: 2.0,
                              far: Some(1000.0),
                              aspect: Some(2.0),
                              fovy: 28.64788975654116,
                            },
                          |],
            (),
          )
        );
      });
    });

    describe("test transforms", () => {
      test("test matrix exist", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ({transforms}) =>
              transforms
              |>
              expect == [|
                          {
                            translation: Some((10., 20., 30.)),
                            rotation: Some((0., 0., 0., 1.)),
                            scale: Some((1., 1., 1.)),
                          },
                        |],
          (),
        )
      );
      test("test transform gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfTransform(),
          ~state,
          ~testFunc=
            ({transforms}) =>
              transforms
              |>
              expect == [|
                          {
                            translation: Some((11., 0.5, (-10.5))),
                            rotation: None,
                            scale: None,
                          },
                          {
                            translation: Some((10., 30., 50.)),
                            rotation: Some((0., 0., 0., 1.)),
                            scale: Some((1., 1., 1.)),
                          },
                          {
                            translation: None,
                            rotation: Some((1., 0.1, 1.5, 0.5)),
                            scale: Some((2.5, 2.5, 3.)),
                          },
                        |],
          (),
        )
      );

      describe("fix bug", () =>
        test("fix get rotation bug", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJson(
                ~nodes=
                  {| [
        {
            "matrix": [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            -1.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
          ]
        }
    ]|},
                (),
              ),
            ~state,
            ~testFunc=
              ({transforms}) =>
                transforms
                |>
                expect == [|
                            {
                              translation: Some((0., 0., 0.)),
                              rotation:
                                Some((
                                  (-0.7071067811865475),
                                  0.,
                                  0.,
                                  0.7071067811865476,
                                )),
                              scale: Some((1., 1., 1.)),
                            },
                          |],
            (),
          )
        )
      );
    });

    describe("test lightMaterials", () =>
      describe("test diffuseColor", () => {
        test("test no data", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            (({lightMaterials}, _)) =>
            lightMaterials
            |>
            expect == [|
                        {
                          diffuseColor:
                            ConvertGLBTool.getDefaultDiffuseColor(),
                          name: "Texture",
                        },
                      |]
          )
        );
        describe("test has data", () =>
          test("only set r,g,b components, ignore alpha component", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({lightMaterials}, binBuffer)) =>
              lightMaterials
              |>
              expect == [|
                          {
                            diffuseColor:
                              ConvertGLBTool.getDefaultDiffuseColor(),
                            name: "truck",
                          },
                          {
                            diffuseColor: [|
                              0.0,
                              0.04050629958510399,
                              0.021240700036287309,
                            |],
                            name: "glass",
                          },
                          {
                            diffuseColor: [|
                              0.06400000303983689,
                              0.06400000303983689,
                              0.06400000303983689,
                            |],
                            name: "window_trim",
                          },
                          {
                            diffuseColor:
                              ConvertGLBTool.getDefaultDiffuseColor(),
                            name: "wheels",
                          },
                        |]
            )
          )
        );
      })
    );

    describe("test basicSourceTextures", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({basicSourceTextures}, binBuffer)) =>
          basicSourceTextures
          |>
          expect == [|
                      {
                        name: "CesiumLogoFlat.png",
                        format: SourceTextureType.RGBA,
                      },
                    |]
        )
      );
      test("test basicSourceTextures", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({basicSourceTextures}, binBuffer)) =>
          basicSourceTextures
          |>
          expect == [|
                      {name: "texture_0", format: SourceTextureType.RGB},
                      {name: "texture_1", format: SourceTextureType.RGB},
                      {name: "texture_2", format: SourceTextureType.RGB},
                      {name: "texture_3", format: SourceTextureType.RGBA},
                      {name: "texture_4", format: SourceTextureType.RGBA},
                      {name: "texture_5", format: SourceTextureType.RGBA},
                      {name: "texture_6", format: SourceTextureType.RGBA},
                      {name: "texture_7", format: SourceTextureType.RGBA},
                    |]
        )
      );
    });

    describe("test samplers", () =>
      test("test", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({samplers}, _)) =>
          samplers
          |>
          expect == [|
                      {
                        magFilter: LINEAR,
                        minFilter: NEAREST_MIPMAP_LINEAR,
                        wrapS: REPEAT,
                        wrapT: REPEAT,
                      },
                    |]
        )
      )
    );

    describe("test images", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({images}, binBuffer)) => {
            let images = images |> OptionService.unsafeGet;

            images |> expect == [|{bufferView: 3, mimeType: "image/png"}|];
          },
        )
      );

      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({images}, binBuffer)) => {
            let images = images |> OptionService.unsafeGet;

            images
            |>
            expect == [|
                        {bufferView: 45, mimeType: "image/jpeg"},
                        {bufferView: 46, mimeType: "image/jpeg"},
                        {bufferView: 47, mimeType: "image/jpeg"},
                        {bufferView: 48, mimeType: "image/png"},
                      |];
          },
        )
      );
    });

    describe("test bufferViews", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({bufferViews}, binBuffer)) =>
          bufferViews
          |>
          expect == [|
                      {
                        buffer: 0,
                        byteOffset: 768,
                        byteLength: 72,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 0,
                        byteLength: 576,
                        byteStride: Some(12),
                      },
                      {
                        buffer: 0,
                        byteOffset: 576,
                        byteLength: 192,
                        byteStride: Some(8),
                      },
                      {
                        buffer: 0,
                        byteOffset: 840,
                        byteLength: 23516,
                        byteStride: None,
                      },
                    |]
        )
      );

      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({bufferViews}, binBuffer)) =>
          (
            bufferViews |> Js.Array.length,
            bufferViews[45],
            bufferViews[46],
            bufferViews[47],
            bufferViews[48],
          )
          |>
          expect == (
                      49,
                      {
                        buffer: 0,
                        byteOffset: 6776,
                        byteLength: 1216267,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 1223044,
                        byteLength: 1013673,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 2236720,
                        byteLength: 702714,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 2939436,
                        byteLength: 65522,
                        byteStride: None,
                      },
                    )
        )
      );
    });

    describe("test buffers", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({buffers}, binBuffer)) =>
          buffers |> expect == [|24360|]
        )
      );
      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({buffers}, binBuffer)) =>
          buffers |> expect == [|3004960|]
        )
      );
    });

    describe("test accessors", () =>
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({accessors}, binBuffer)) =>
          accessors
          |>
          expect == [|
                      {
                        bufferView: 0,
                        byteOffset: 0,
                        componentType: UNSIGNED_SHORT,
                        count: 36,
                        type_: SCALAR,
                      },
                      {
                        bufferView: 1,
                        byteOffset: 0,
                        componentType: FLOAT,
                        count: 24,
                        type_: VEC3,
                      },
                      {
                        bufferView: 1,
                        byteOffset: 288,
                        componentType: FLOAT,
                        count: 24,
                        type_: VEC3,
                      },
                      {
                        bufferView: 2,
                        byteOffset: 0,
                        componentType: FLOAT,
                        count: 24,
                        type_: VEC2,
                      },
                    |]
        )
      )
    );

    describe("test customGeometrys", () =>
      test("test single primitive", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ({customGeometrys}) =>
              customGeometrys
              |>
              expect == [|
                          Some({
                            position: 2,
                            normal: Some(1),
                            texCoord: Some(3),
                            index: 0,
                          }),
                        |],
          (),
        )
      )
    );

    describe("test indices", () => {
      describe("test gameObjectIndices", () => {
        let _buildTransformIndexData =
            (parentTransformIndices, childrenTransformIndices) => {
          parentTransformIndices,
          childrenTransformIndices,
        };
        let _buildComponentIndexData = (gameObjectIndices, componentIndices) =>
          ConvertGLBTool.buildComponentIndexData(
            gameObjectIndices,
            componentIndices,
          );
        describe("test childrenTransformIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.childrenTransformIndexData
                  |> expect == _buildTransformIndexData([||], [||]),
              (),
            )
          );
          test("test truck gltf", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.childrenTransformIndexData
              |>
              expect == _buildTransformIndexData(
                          [|0, 1, 3|],
                          [|[|3, 1, 5, 6, 7|], [|2|], [|4|]|],
                        )
            )
          );
        });
        describe("test basicCameraViewGameObjectIndexData", () => {
          test("test no data", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.basicCameraViewGameObjectIndexData
                  |> expect == _buildComponentIndexData([||], [||]),
              (),
            )
          );
          test("test camera gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.basicCameraViewGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0, 1|], [|2, 0|]),
              (),
            )
          );
        });
        describe("test perspectiveCameraProjectionGameObjectIndexData", () => {
          test("test no data", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.
                    perspectiveCameraProjectionGameObjectIndexData
                  |> expect == _buildComponentIndexData([||], [||]),
              (),
            )
          );
          test("test camera gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.
                    perspectiveCameraProjectionGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0, 1|], [|1, 0|]),
              (),
            )
          );
        });
        describe("test lightMaterialGameObjectIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.lightMaterialGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0|], [|0|]),
              (),
            )
          );
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.lightMaterialGameObjectIndexData
              |>
              expect == _buildComponentIndexData(
                          [|2, 4, 5, 6, 7|],
                          [|3, 3, 0, 1, 2|],
                        )
            )
          );
        });
        describe("test transformGameObjectIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.transformGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0|], [|0|]),
              (),
            )
          );
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.transformGameObjectIndexData
              |>
              expect == _buildComponentIndexData(
                          [|0, 1, 2, 3, 4, 5, 6, 7|],
                          [|0, 1, 2, 3, 4, 5, 6, 7|],
                        )
            )
          );
        });
        describe("test customGeometryGameObjectIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.customGeometryGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0|], [|0|]),
              (),
            )
          );
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.customGeometryGameObjectIndexData
              |>
              expect == _buildComponentIndexData(
                          [|2, 4, 5, 6, 7|],
                          [|1, 1, 2, 3, 4|],
                        )
            )
          );
        });

        describe("test directionLightGameObjectIndexData", () =>
          test("test light gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.directionLightGameObjectIndexData
                  |> expect == _buildComponentIndexData([|2|], [|0|]),
              (),
            )
          )
        );

        describe("test pointLightGameObjectIndexData", () =>
          test("test light gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.pointLightGameObjectIndexData
                  |> expect == _buildComponentIndexData([|3|], [|0|]),
              (),
            )
          )
        );
      });
      describe("test materialIndices", () => {
        let _buildIndexData = (materialIndices, mapIndices) => {
          materialIndices,
          mapIndices,
        };
        describe("test diffuseMapMaterialIndices", () =>
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.materialIndices.diffuseMapMaterialIndices
              |> expect == _buildIndexData([|0, 3|], [|0, 1|])
            )
          )
        );
      });
      describe("test imageTextureIndices", () => {
        let _buildIndexData = (textureIndices, imageIndices) => {
          textureIndices,
          imageIndices,
        };
        test("test truck glb", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            (({indices}, _)) =>
            indices.imageTextureIndices
            |> expect == _buildIndexData([|0, 1|], [|0, 0|])
          )
        );
      });
      describe("test samplerTextureIndices", () => {
        let _buildIndexData = (textureIndices, samplerIndices) => {
          textureIndices,
          samplerIndices,
        };
        test("test truck glb", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            (({indices}, _)) =>
            indices.samplerTextureIndices
            |> expect == _buildIndexData([|0, 1|], [|0, 0|])
          )
        );
      });
    });
  });