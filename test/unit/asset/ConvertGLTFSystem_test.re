open Wonder_jest;

open Js.Promise;

let _ =
  describe("ConvertGLTFSystem", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    let _buildFakeLoadImage = [%bs.raw
      {|
    function(){
        window.loadImage_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }
    }
    |}
    ];
    let _test = (gltfJson, testFunc) => {
      let data = ref(Obj.magic(1));
      _buildFakeLoadImage();
      ConvertGLTFSystem.convert(gltfJson)
      |> Most.forEach(((wdRecord, imageArr, bufferArr)) =>
           data := (wdRecord, imageArr, bufferArr)
         )
      |> then_(() => testFunc(data^) |> resolve);
    };
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("convert gltf to wd", () => {
      open WDType;
      describe("test multi primitives", () => {
        describe("convert multi primitives to gltf nodes", () => {
          let _prepare = () => {
            let gltf =
              ConvertGLTFJsonToRecordSystem.convert(
                ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives()
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
                        {
                          camera: None,
                          mesh: None,
                          children: Some([|2, 1, 3, 4|]),
                          matrix: None,
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                        {
                          camera: None,
                          mesh: Some(1),
                          children: None,
                          matrix:
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
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                        {
                          camera: None,
                          mesh: None,
                          children: Some([|1, 5, 6|]),
                          matrix:
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
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                        {
                          camera: None,
                          mesh: Some(2),
                          children: None,
                          matrix: None,
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                        {
                          camera: None,
                          mesh: Some(3),
                          children: None,
                          matrix: None,
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                        {
                          camera: None,
                          mesh: Some(2),
                          children: None,
                          matrix:
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
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                        {
                          camera: None,
                          mesh: Some(3),
                          children: None,
                          matrix:
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
                          translation: None,
                          rotation: None,
                          scale: None,
                        },
                      |];
          });
          test("test meshes", () => {
            open GLTFType;
            let gltfRecord = _prepare();
            gltfRecord.meshes
            |>
            expect == [|
                        {
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
          testPromise("test gameObjects", () =>
            _test(
              ConvertGLTFTool.buildGLTFJsonOfMultiPrimitives(),
              (({gameObjects}, _, _)) =>
              gameObjects |> expect == {count: 7}
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
      testPromise("test asset", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({asset}, _, _)) =>
          asset |> expect == {version: "2.0", generator: "GLTF2WD"}
        )
      );
      testPromise("test scene", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(), (({scene}, _, _)) =>
          scene |> expect == {gameObjects: [|0|]}
        )
      );
      describe("test gameObjects", () => {
        testPromise("test single node gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            (({gameObjects}, _, _)) =>
            gameObjects |> expect == {count: 1}
          )
        );
        testPromise("test truck gltf", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            (({gameObjects}, _, _)) =>
            gameObjects |> expect == {count: 8}
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
            ConvertGLTFTool.buildGLTFJsonOfTransform(),
            (({transforms}, _, _)) =>
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
              lightMaterials |> expect == [|{diffuseColor: None}|]
            )
          );
          describe("test has data", () =>
            testPromise(
              "only set r,g,b components, ignore alpha component", () =>
              _test(
                ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
                (({lightMaterials}, _, _)) =>
                lightMaterials
                |>
                expect == [|
                            {diffuseColor: None},
                            {
                              diffuseColor:
                                Some([|
                                  0.0,
                                  0.04050629958510399,
                                  0.021240700036287309,
                                |]),
                            },
                            {
                              diffuseColor:
                                Some([|
                                  0.06400000303983689,
                                  0.06400000303983689,
                                  0.06400000303983689,
                                |]),
                            },
                            {diffuseColor: None},
                          |]
              )
            )
          );
        })
      );
      describe("test basicSourceTextures", () =>
        testPromise("test", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            (({basicSourceTextures}, _, _)) =>
            basicSourceTextures |> expect == {count: 2}
          )
        )
      );
      describe("test samplers", () =>
        testPromise("test", () =>
          _test(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            (({samplers}, _, _)) =>
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
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            (({accessors}, _, _)) =>
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
          let _buildComponentIndexData = (gameObjectIndices, componentIndices) => {
            gameObjectIndices,
            componentIndices,
          };
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
                            [|0, 1, 3, 4|],
                            [|2, 0, 0, 2|],
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
                            [|0, 1, 3, 4|],
                            [|1, 0, 0, 1|],
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
    describe("get imageArr", () =>
      testPromise("get image arr", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          ((wdRecord, imageArr, bufferArr)) =>
          imageArr
          |> expect == [|ConvertGLTFTool.buildFakeImageOfSingleNode()|]
        )
      )
    );
    describe("get bufferArr", () =>
      testPromise("get arrayBuffer arr", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          ((wdRecord, imageArr, bufferArr)) => {
            let arrayBuffer = bufferArr[0];
            (
              bufferArr |> Js.Array.length,
              Js.Typed_array.ArrayBuffer.byteLength(arrayBuffer),
            )
            |> expect == (1, 840);
          },
        )
      )
    );
    describe("fix bug", () => {
      let _buildGLTFJsonOfMultiImages = () =>
        ConvertGLTFTool.buildGLTFJson(
          ~images=
            {|  [
        {
            "uri":"|}
            ++ ConvertGLTFTool.buildFakeImageOfSingleNode()
            ++ {|"
            },
        {
            "uri":"|}
            ++ ConvertGLTFTool.buildFakeImageOfCesiumMilkTruck()
            ++ {|"
            }
            ]|},
          (),
        );
      let _test = (gltfJson, testFunc) => {
        _buildFakeLoadImage();
        ConvertGLTFSystem.convert(gltfJson)
        |> Most.reduce(
             (arr, dataTuple) => arr |> ArrayService.push(dataTuple),
             [||],
           )
        |> then_(arr => testFunc(arr) |> resolve);
      };

      testPromise("should only exec convert once", () =>
        _test(_buildGLTFJsonOfMultiImages(), arr =>
          arr |> Js.Array.length |> expect == 1
        )
      );
    });
  });