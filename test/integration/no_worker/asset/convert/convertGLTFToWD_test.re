open Wonder_jest;

open Js.Promise;

open WDType;

let _ =
  describe("convert gltf to wd", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _buildFakeLoadImage = ConvertGLTFTool.buildFakeLoadImage;

    let _test = (gltfJson, testFunc) =>
      ConvertGLTFTool.testResult(gltfJson, testFunc);

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
              ConvertGLTFTool.buildGLTFJsonOfMultiPrimitivesWithName()
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
                      ConvertGLTFTool.buildNode(
                        ~children=Some([|3, 2, 1, 4, 5|]),
                        (),
                      ),
                      ConvertGLTFTool.buildNode(
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
                      ConvertGLTFTool.buildNode(
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
                      ConvertGLTFTool.buildNode(
                        ~children=Some([|8, 9|]),
                        (),
                      ),
                      ConvertGLTFTool.buildNode(~mesh=Some(3), ()),
                      ConvertGLTFTool.buildNode(~mesh=Some(4), ()),
                      ConvertGLTFTool.buildNode(
                        ~name=Some("node2_0"),
                        ~mesh=Some(3),
                        (),
                      ),
                      ConvertGLTFTool.buildNode(
                        ~name=Some("node2_1"),
                        ~mesh=Some(4),
                        (),
                      ),
                      ConvertGLTFTool.buildNode(~mesh=Some(5), ()),
                      ConvertGLTFTool.buildNode(~mesh=Some(6), ()),
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
          _test(
            ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
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
                      |]
          )
        );

        describe("test gameObjects", () =>
          test("test count", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
              ({gameObjects}) =>
              gameObjects.count |> expect == 7
            )
          )
        );

        describe("test indices", () =>
          describe("test gameObjectIndices", () =>
            describe("test geometryGameObjectIndices", () =>
              test(
                "test multi primitives geometry should has no gameObject", () =>
                _test(
                  ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
                  ({indices}) =>
                  indices.gameObjectIndices.customGeometryGameObjectIndexData
                  |>
                  expect == {
                              gameObjectIndices: [|1, 3, 4, 5, 6|],
                              componentIndices: [|1, 2, 3, 2, 3|],
                            }
                )
              )
            )
          )
        );
      });
    });

    describe("test set default material", () => {
      test("test default lightMaterial", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfCameras(), ({lightMaterials}) =>
          lightMaterials
          |>
          expect == [|
                      {
                        diffuseColor: ConvertGLTFTool.getDefaultDiffuseColor(),
                        name: "defaultMaterial",
                      },
                    |]
        )
      );
      test("test customGeometrys", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfCameras(), ({customGeometrys}) =>
          customGeometrys
          |>
          expect == [|
                      Some({
                        position: 1,
                        normal: None,
                        texCoord: None,
                        index: 0,
                      }),
                    |]
        )
      );

      test("test default material's lightMaterialGameObjectIndexData", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfCameras(), ({indices}) =>
          indices.gameObjectIndices.lightMaterialGameObjectIndexData
          |> expect == ConvertGLTFTool.buildComponentIndexData([|0|], [|0|])
        )
      );
    });

    test("test asset", () =>
      _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({asset}) =>
        asset |> expect == {version: "2.0", generator: "GLTF2WD"}
      )
    );
    test("test scene", () =>
      _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({scene}) =>
        scene |> expect == {gameObjects: [|0|]}
      )
    );
    describe("test gameObjects", () => {
      test("test single node gltf", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({gameObjects}) =>
          gameObjects |> expect == {count: 1, names: [|"gameObject_0"|]}
        )
      );
      test("test truck gltf", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({gameObjects}) =>
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
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({basicCameraViews}) =>
            basicCameraViews |> expect == {count: 0}
          )
        );
        test("test camera gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCamera(), ({basicCameraViews}) =>
            basicCameraViews |> expect == {count: 3}
          )
        );
      });
      describe("test perspectiveCameraProjections", () => {
        test("test no data", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            ({perspectiveCameraProjections}) =>
            perspectiveCameraProjections |> expect == [||]
          )
        );
        test("test camera gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCamera(),
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
                      |]
          )
        );
      });
    });
    describe("test transforms", () => {
      test("test matrix exist", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({transforms}) =>
          transforms
          |>
          expect == [|
                      {
                        translation: Some((10., 20., 30.)),
                        rotation: Some((0., 0., 0., 1.)),
                        scale: Some((1., 1., 1.)),
                      },
                    |]
        )
      );
      test("test transform gltf", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfTransform(), ({transforms}) =>
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
                    |]
        )
      );

      describe("fix bug", () =>
        test("fix get rotation bug", () =>
          _test(
            ConvertGLTFTool.buildGLTFJson(
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
                      |]
          )
        )
      );
    });
    describe("test lightMaterials", () =>
      describe("test diffuseColor", () => {
        test("test no data", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({lightMaterials}) =>
            lightMaterials
            |>
            expect == [|
                        {
                          diffuseColor:
                            ConvertGLTFTool.getDefaultDiffuseColor(),
                          name: "material",
                        },
                      |]
          )
        );
        describe("test has data", () =>
          test("only set r,g,b components, ignore alpha component", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              ({lightMaterials}) =>
              lightMaterials
              |>
              expect == [|
                          {
                            diffuseColor:
                              ConvertGLTFTool.getDefaultDiffuseColor(),
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
                              ConvertGLTFTool.getDefaultDiffuseColor(),
                            name: "wheels",
                          },
                        |]
            )
          )
        );
      })
    );
    describe("test basicSourceTextures", () =>
      test("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfTexture(), ({basicSourceTextures}) =>
          basicSourceTextures
          |>
          expect == {count: 3, names: [|"texture_0", "texture0", "image0"|]}
        )
      )
    );
    describe("test samplers", () =>
      test("test", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({samplers}) =>
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
    describe("test images", () =>
      test("test", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({images}) =>
          images
          |>
          expect == [|{uri: ConvertGLTFTool.buildFakeImageOfSingleNode()}|]
        )
      )
    );
    describe("test customGeometrys", () =>
      test("test single primitive", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({customGeometrys}) =>
          customGeometrys
          |>
          expect == [|
                      Some({
                        position: 2,
                        normal: Some(1),
                        texCoord: Some(3),
                        index: 0,
                      }),
                    |]
        )
      )
    );
    describe("test accessors", () =>
      test("test", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({accessors}) =>
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
    describe("test bufferViews", () =>
      test("test", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({bufferViews}) =>
          bufferViews
          |>
          expect == [|
                      {
                        buffer: 0,
                        byteOffset: 768,
                        byteLength: 72,
                        byteStride: None,
                        /* target: ELEMENT_ARRAY_BUFFER */
                      },
                      {
                        buffer: 0,
                        byteOffset: 0,
                        byteLength: 576,
                        byteStride: Some(12),
                        /* target: ARRAY_BUFFER */
                      },
                      {
                        buffer: 0,
                        byteOffset: 576,
                        byteLength: 192,
                        byteStride: Some(8),
                        /* target: ARRAY_BUFFER */
                      },
                    |]
        )
      )
    );
    describe("test buffers", () =>
      test("test", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({buffers}) =>
          buffers
          |>
          expect == [|
                      {
                        uri: ConvertGLTFTool.buildFakeBufferOfSingleNode(),
                        byteLength: 840,
                      },
                    |]
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
          ConvertGLTFTool.buildComponentIndexData(
            gameObjectIndices,
            componentIndices,
          );
        describe("test childrenTransformIndexData", () => {
          test("test single node gltf", () =>
            _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({indices}) =>
              indices.gameObjectIndices.childrenTransformIndexData
              |> expect == _buildTransformIndexData([||], [||])
            )
          );
          test("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
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
            _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({indices}) =>
              indices.gameObjectIndices.basicCameraViewGameObjectIndexData
              |> expect == _buildComponentIndexData([||], [||])
            )
          );
          test("test camera gltf", () =>
            _test(ConvertGLTFTool.buildGLTFJsonOfCamera(), ({indices}) =>
              indices.gameObjectIndices.basicCameraViewGameObjectIndexData
              |> expect == _buildComponentIndexData([|0, 1|], [|2, 0|])
            )
          );
        });
        describe("test perspectiveCameraProjectionGameObjectIndexData", () => {
          test("test no data", () =>
            _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({indices}) =>
              indices.gameObjectIndices.
                perspectiveCameraProjectionGameObjectIndexData
              |> expect == _buildComponentIndexData([||], [||])
            )
          );
          test("test camera gltf", () =>
            _test(ConvertGLTFTool.buildGLTFJsonOfCamera(), ({indices}) =>
              indices.gameObjectIndices.
                perspectiveCameraProjectionGameObjectIndexData
              |> expect == _buildComponentIndexData([|0, 1|], [|1, 0|])
            )
          );
        });
        describe("test lightMaterialGameObjectIndexData", () => {
          test("test single node gltf", () =>
            _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({indices}) =>
              indices.gameObjectIndices.lightMaterialGameObjectIndexData
              |> expect == _buildComponentIndexData([|0|], [|0|])
            )
          );
          test("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
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
            _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({indices}) =>
              indices.gameObjectIndices.transformGameObjectIndexData
              |> expect == _buildComponentIndexData([|0|], [|0|])
            )
          );
          test("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
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
            _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), ({indices}) =>
              indices.gameObjectIndices.customGeometryGameObjectIndexData
              |> expect == _buildComponentIndexData([|0|], [|0|])
            )
          );
          test("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
              indices.gameObjectIndices.customGeometryGameObjectIndexData
              |>
              expect == _buildComponentIndexData(
                          [|2, 4, 5, 6, 7|],
                          [|1, 1, 2, 3, 4|],
                        )
            )
          );
        });
      });
      describe("test materialIndices", () => {
        let _buildIndexData = (materialIndices, mapIndices) => {
          materialIndices,
          mapIndices,
        };
        describe("test diffuseMapMaterialIndices", () =>
          test("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
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
        test("test truck gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
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
        test("test truck gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(), ({indices}) =>
            indices.samplerTextureIndices
            |> expect == _buildIndexData([|0, 1|], [|0, 0|])
          )
        );
      });
    });
  });