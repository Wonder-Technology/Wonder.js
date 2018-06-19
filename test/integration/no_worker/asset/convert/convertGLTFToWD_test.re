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
        testPromise("test customGeometrys", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
            (({customGeometrys}, _, _)) =>
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
          testPromise("test count", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
              (({gameObjects}, _, _)) =>
              gameObjects.count |> expect == 7
            )
          )
        );

        describe("test indices", () =>
          describe("test gameObjectIndices", () =>
            describe("test geometryGameObjectIndices", () =>
              testPromise(
                "test multi primitives geometry should has no gameObject", () =>
                _test(
                  ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
                  (({indices}, _, _)) =>
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
      testPromise("test default lightMaterial", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfCameras(),
          (({lightMaterials}, _, _)) =>
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
      testPromise("test customGeometrys", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfCameras(),
          (({customGeometrys}, _, _)) =>
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

      testPromise(
        "test default material's lightMaterialGameObjectIndexData", () =>
        _test(ConvertGLTFTool.buildGLTFJsonOfCameras(), (({indices}, _, _)) =>
          indices.gameObjectIndices.lightMaterialGameObjectIndexData
          |> expect == ConvertGLTFTool.buildComponentIndexData([|0|], [|0|])
        )
      );
    });

    testPromise("test asset", () =>
      _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({asset}, _, _)) =>
        asset |> expect == {version: "2.0", generator: "GLTF2WD"}
      )
    );
    testPromise("test scene", () =>
      _test(ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({scene}, _, _)) =>
        scene |> expect == {gameObjects: [|0|]}
      )
    );
    describe("test gameObjects", () => {
      testPromise("test single node gltf", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          (({gameObjects}, _, _)) =>
          gameObjects |> expect == {count: 1, names: [|"gameObject_0"|]}
        )
      );
      testPromise("test truck gltf", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
          (({gameObjects}, _, _)) =>
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
        testPromise("test no data", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            (({basicCameraViews}, _, _)) =>
            basicCameraViews |> expect == {count: 0}
          )
        );
        testPromise("test camera gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCamera(),
            (({basicCameraViews}, _, _)) =>
            basicCameraViews |> expect == {count: 3}
          )
        );
      });
      describe("test perspectiveCameraProjections", () => {
        testPromise("test no data", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            (({perspectiveCameraProjections}, _, _)) =>
            perspectiveCameraProjections |> expect == [||]
          )
        );
        testPromise("test camera gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCamera(),
            (({perspectiveCameraProjections}, _, _)) =>
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
      testPromise("test matrix exist", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          (({transforms}, _, _)) =>
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
      testPromise("test transform gltf", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfTransform(), (({transforms}, _, _)) =>
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
        testPromise("fix get rotation bug", () =>
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
            (({transforms}, _, _)) =>
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
        testPromise("test no data", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            (({lightMaterials}, _, _)) =>
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
          testPromise("only set r,g,b components, ignore alpha component", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              (({lightMaterials}, _, _)) =>
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
      testPromise("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfTexture(),
          (({basicSourceTextures}, _, _)) =>
          basicSourceTextures
          |>
          expect == {count: 3, names: [|"texture_0", "texture0", "image0"|]}
        )
      )
    );
    describe("test samplers", () =>
      testPromise("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({samplers}, _, _)) =>
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
      testPromise("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({images}, _, _)) =>
          images
          |>
          expect == [|{uri: ConvertGLTFTool.buildFakeImageOfSingleNode()}|]
        )
      )
    );
    describe("test customGeometrys", () =>
      testPromise("test single primitive", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          (({customGeometrys}, _, _)) =>
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
      testPromise("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({accessors}, _, _)) =>
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
      testPromise("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          (({bufferViews}, _, _)) =>
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
      testPromise("test", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({buffers}, _, _)) =>
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
          testPromise("test single node gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
              (({indices}, _, _)) =>
              indices.gameObjectIndices.childrenTransformIndexData
              |> expect == _buildTransformIndexData([||], [||])
            )
          );
          testPromise("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              (({indices}, _, _)) =>
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
          testPromise("test no data", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
              (({indices}, _, _)) =>
              indices.gameObjectIndices.basicCameraViewGameObjectIndexData
              |> expect == _buildComponentIndexData([||], [||])
            )
          );
          testPromise("test camera gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCamera(), (({indices}, _, _)) =>
              indices.gameObjectIndices.basicCameraViewGameObjectIndexData
              |>
              expect == _buildComponentIndexData(
                          [|0, 1|],
                          [|2, 0|],
                        )
            )
          );
        });
        describe("test perspectiveCameraProjectionGameObjectIndexData", () => {
          testPromise("test no data", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
              (({indices}, _, _)) =>
              indices.gameObjectIndices.
                perspectiveCameraProjectionGameObjectIndexData
              |> expect == _buildComponentIndexData([||], [||])
            )
          );
          testPromise("test camera gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCamera(), (({indices}, _, _)) =>
              indices.gameObjectIndices.
                perspectiveCameraProjectionGameObjectIndexData
              |>
              expect == _buildComponentIndexData(
                          [|0, 1|],
                          [|1, 0|],
                        )
            )
          );
        });
        describe("test lightMaterialGameObjectIndexData", () => {
          testPromise("test single node gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
              (({indices}, _, _)) =>
              indices.gameObjectIndices.lightMaterialGameObjectIndexData
              |> expect == _buildComponentIndexData([|0|], [|0|])
            )
          );
          testPromise("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              (({indices}, _, _)) =>
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
          testPromise("test single node gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
              (({indices}, _, _)) =>
              indices.gameObjectIndices.transformGameObjectIndexData
              |> expect == _buildComponentIndexData([|0|], [|0|])
            )
          );
          testPromise("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              (({indices}, _, _)) =>
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
          testPromise("test single node gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
              (({indices}, _, _)) =>
              indices.gameObjectIndices.customGeometryGameObjectIndexData
              |> expect == _buildComponentIndexData([|0|], [|0|])
            )
          );
          testPromise("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              (({indices}, _, _)) =>
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
          testPromise("test truck gltf", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
              (({indices}, _, _)) =>
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
        testPromise("test truck gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            (({indices}, _, _)) =>
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
        testPromise("test truck gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            (({indices}, _, _)) =>
            indices.samplerTextureIndices
            |> expect == _buildIndexData([|0, 1|], [|0, 0|])
          )
        );
      });
    });
  });