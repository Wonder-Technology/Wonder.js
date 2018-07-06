open Wonder_jest;

open Js.Promise;

let _ =
  describe("assemble wdb from glb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _getAllChildrenTransform = (rootGameObject, state) =>
      AssembleWDBSystemTool.getAllChildrenTransform(rootGameObject, state);
    let _getAllSortedTransforms = (rootGameObject, state) =>
      AssembleWDBSystemTool.getAllSortedTransforms(rootGameObject, state);

    let _getAllGameObjects = (rootGameObject, state) =>
      AssembleWDBSystemTool.getAllGameObjects(rootGameObject, state);

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.init(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~customGeometryPointCount=10000,
              ~customGeometryCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build scene gameObject", () => {
      testPromise("test single scene gameObject", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ((state, rootGameObject)) => rootGameObject |> expect == 1,
          (),
        )
      );
      testPromise("test multi scene gameObjects", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            AssembleWDBSystemTool.buildGLTFJsonOfMultiSceneGameObjects(),
          ~state,
          ~testFunc=
            ((state, rootGameObject)) =>
              (
                rootGameObject,
                TransformAPI.unsafeGetTransformChildren(
                  GameObjectAPI.unsafeGetGameObjectTransformComponent(
                    rootGameObject,
                    state,
                  ),
                  state,
                ),
              )
              |> expect == (3, [|1, 2|]),
          (),
        )
      );
    });

    describe("test gameObject", () =>
      describe("set gameObject name", () =>
        testPromise("test", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) =>
              _getAllGameObjects(rootGameObject, state)
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.unsafeGetGameObjectName(gameObject, state)
                 )
              |>
              expect == [|
                          "gameObject_0",
                          "gameObject_1",
                          "gameObject_3",
                          "Cesium_Milk_Truck_0",
                          "Cesium_Milk_Truck_1",
                          "Cesium_Milk_Truck_2",
                          "Wheels",
                          "Wheels",
                        |],
            state^,
          )
        )
      )
    );

    describe("test transforms", () => {
      describe("test set parent", () => {
        testPromise("test children", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) => {
              let (state, allTransformChildren) =
                _getAllChildrenTransform(rootGameObject, state);
              allTransformChildren |> expect == [|2, 4, 6, 7, 8, 3, 5|];
            },
            state^,
          )
        );
        testPromise("test parent", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) => {
              let (state, allTransformChildren) =
                _getAllChildrenTransform(rootGameObject, state);
              TransformTool.getRecord(state).parentMap
              |> Obj.magic
              |>
              expect == [|
                          Js.Undefined.empty |> Obj.magic,
                          Js.Undefined.empty |> Obj.magic,
                          1,
                          2,
                          1,
                          4,
                          1,
                          1,
                          1,
                        |];
            },
            state^,
          )
        );
      });
      describe("test set data", () =>
        testPromise("test set localPosition, localRotation, localScale", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) =>
              _getAllSortedTransforms(rootGameObject, state)
              |> Js.Array.map(transform =>
                   (
                     TransformAPI.getTransformLocalPosition(transform, state),
                     TransformAPI.getTransformLocalRotation(transform, state),
                     TransformAPI.getTransformLocalScale(transform, state),
                   )
                 )
              |>
              expect == [|
                          ((0., 0., 0.), (0., 0., 0., 1.), (1., 1., 1.)),
                          (
                            (
                              (-1.352329969406128),
                              0.4277220070362091,
                              (-2.98022992950564e-8),
                            ),
                            (0., 0., 0., 1.),
                            (1., 1., 1.),
                          ),
                          (
                            (0., 0., 0.),
                            (
                              0.,
                              0.,
                              0.08848590403795242,
                              (-0.9960774183273315),
                            ),
                            (1., 1., 1.),
                          ),
                          (
                            (
                              1.432669997215271,
                              0.4277220070362091,
                              (-2.98022992950564e-8),
                            ),
                            (0., 0., 0., 1.),
                            (1., 1., 1.),
                          ),
                          (
                            (0., 0., 0.),
                            (
                              0.,
                              0.,
                              0.08848590403795242,
                              (-0.9960774183273315),
                            ),
                            (1., 1., 1.),
                          ),
                          ((0., 0., 0.), (0., 0., 0., 1.), (1., 1., 1.)),
                          ((0., 0., 0.), (0., 0., 0., 1.), (1., 1., 1.)),
                          ((0., 0., 0.), (0., 0., 0., 1.), (1., 1., 1.)),
                        |],
            state^,
          )
        )
      );
      describe("contract check", () =>
        testPromise("shouldn't disposed before", () => {
          TestTool.openContractCheck();
          let (state, gameObject, transform) =
            GameObjectTool.createGameObject(state^);
          let state = TransformTool.dispose(transform, state);

          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              data =>
                expect(() =>
                  AssembleWDBSystemTool.batchCreate(data, state)
                )
                |> toThrowMessage("expect not disposed before")
                |> resolve,
            (),
          );
        })
      );
    });

    describe("test customGeometrys", () => {
      open Js.Typed_array;

      describe("test set point data", () => {
        testPromise("test single node gltf", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ((state, rootGameObject)) => {
                let boxGameObject = rootGameObject;
                let geometry =
                  GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                    boxGameObject,
                    state,
                  );
                (
                  CustomGeometryAPI.getCustomGeometryVertices(geometry, state),
                  CustomGeometryAPI.getCustomGeometryNormals(geometry, state),
                  CustomGeometryAPI.getCustomGeometryTexCoords(
                    geometry,
                    state,
                  ),
                  CustomGeometryAPI.getCustomGeometryIndices(geometry, state),
                )
                |>
                expect == (
                            Float32Array.make([|
                              (-0.5),
                              (-0.5),
                              0.5,
                              0.5,
                              (-0.5),
                              0.5,
                              (-0.5),
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              (-0.5),
                              0.5,
                              0.5,
                              0.5,
                              (-0.5),
                              0.5,
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              0.5,
                              (-0.5),
                              0.5,
                              (-0.5),
                              0.5,
                              0.5,
                              (-0.5),
                              0.5,
                              (-0.5),
                              0.5,
                              (-0.5),
                              (-0.5),
                              0.5,
                              0.5,
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              0.5,
                              (-0.5),
                              0.5,
                              0.5,
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              0.5,
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              (-0.5),
                              0.5,
                              (-0.5),
                              0.5,
                              (-0.5),
                              (-0.5),
                              0.5,
                              0.5,
                              (-0.5),
                            |]),
                            Float32Array.make([|
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              1.,
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                              0.,
                              0.,
                              (-1.),
                            |]),
                            Float32Array.make([|
                              6.,
                              0.,
                              5.,
                              0.,
                              6.,
                              0.9999998807907104,
                              5.,
                              0.9999998807907104,
                              4.,
                              0.,
                              5.,
                              0.,
                              4.,
                              1.,
                              5.,
                              1.,
                              2.,
                              0.,
                              1.,
                              0.,
                              2.,
                              1.,
                              1.,
                              1.,
                              3.,
                              0.,
                              4.,
                              0.,
                              3.,
                              1.,
                              4.,
                              1.,
                              3.,
                              0.,
                              2.,
                              0.,
                              3.,
                              1.,
                              2.,
                              1.,
                              0.,
                              0.,
                              0.,
                              0.9999998807907104,
                              1.,
                              0.,
                              1.,
                              0.9999998807907104,
                            |]),
                            Uint16Array.make([|
                              0,
                              1,
                              2,
                              3,
                              2,
                              1,
                              4,
                              5,
                              6,
                              7,
                              6,
                              5,
                              8,
                              9,
                              10,
                              11,
                              10,
                              9,
                              12,
                              13,
                              14,
                              15,
                              14,
                              13,
                              16,
                              17,
                              18,
                              19,
                              18,
                              17,
                              20,
                              21,
                              22,
                              23,
                              22,
                              21,
                            |]),
                          );
              },
            (),
          )
        );

        testPromise("test truck glb", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state)
              |>
              expect == [|
                          (
                            "Cesium_Milk_Truck_0",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Cesium_Milk_Truck_0",
                               ),
                          ),
                          (
                            "Cesium_Milk_Truck_1",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Cesium_Milk_Truck_1",
                               ),
                          ),
                          (
                            "Cesium_Milk_Truck_2",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Cesium_Milk_Truck_2",
                               ),
                          ),
                          (
                            "Wheels",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Wheels",
                               ),
                          ),
                          (
                            "Wheels",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Wheels",
                               ),
                          ),
                        |];
            },
            state^,
          )
        );

        testPromise(
          "test gameObjects which has no cutomGeometry component", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) =>
              _getAllSortedTransforms(rootGameObject, state)
              |> Js.Array.map(transform =>
                   TransformAPI.unsafeGetTransformGameObject(transform, state)
                 )
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.hasGameObjectGeometryComponent(
                     gameObject,
                     state,
                   )
                 )
              |>
              expect == [|false, false, true, false, true, true, true, true|],
            state^,
          )
        );
      });
      describe("contract check", () =>
        testPromise("shouldn't disposed before", () => {
          TestTool.openContractCheck();
          let (state, gameObject, geometry) =
            CustomGeometryTool.createGameObject(state^);
          let state = GameObjectTool.disposeGameObject(gameObject, state);

          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              data =>
                expect(() =>
                  AssembleWDBSystemTool.batchCreate(data, state)
                )
                |> toThrowMessage("expect not disposed before")
                |> resolve,
            (),
          );
        })
      );
    });

    describe("test basicCameraViews", () =>
      describe("test add basicCameraView components", () =>
        testPromise("test", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
            ~state,
            ~testFunc=
              ((state, rootGameObject)) =>
                _getAllGameObjects(rootGameObject, state)
                |> Js.Array.map(gameObject =>
                     GameObjectAPI.hasGameObjectBasicCameraViewComponent(
                       gameObject,
                       state,
                     )
                   )
                |> expect == [|true, true, false|],
            (),
          )
        )
      )
    );

    describe("test perspectiveCameraProjections", () =>
      describe("test set data", () => {
        let _getAllPerspectiveCameraProjectionComponent =
            (rootGameObject, state) =>
          _getAllGameObjects(rootGameObject, state)
          |> Js.Array.filter(gameObject =>
               GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 state,
               )
             )
          |> Js.Array.map(gameObject =>
               GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
                 gameObject,
                 state,
               )
             );

        testPromise("test set near, fovy", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
            ~state,
            ~testFunc=
              ((state, rootGameObject)) =>
                _getAllPerspectiveCameraProjectionComponent(
                  rootGameObject,
                  state,
                )
                |> Js.Array.map(cameraProjection =>
                     (
                       PerspectiveCameraProjectionTool.unsafeGetNear(
                         cameraProjection,
                         state,
                       ),
                       PerspectiveCameraProjectionTool.unsafeGetFovy(
                         cameraProjection,
                         state,
                       ),
                     )
                   )
                |>
                expect == [|
                            (2., 28.64788975654116),
                            (1., 34.37746770784939),
                          |],
            (),
          )
        );

        describe("test set far", () => {
          let _buildGLTFJsonOfCamera = () =>
            ConvertGLBTool.buildGLTFJson(
              ~nodes=
                {| [
        {
            "mesh": 0,
            "camera": 1,
            "children": [
                1
            ]
        },
        {
            "mesh": 0,
            "camera": 0
        }
    ]|},
              ~cameras=
                {|
[
        {
            "perspective": {
                "aspectRatio": 1.5,
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        },
        {
            "perspective": {
                "aspectRatio": 2.0,
                "yfov": 0.5,
                "zfar": 1000.0,
                "znear": 2.0
            },
            "type": "perspective"
        }
    ]
        |},
              (),
            );

          testPromise("if no far, set infinite", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state,
              ~testFunc=
                ((state, rootGameObject)) =>
                  _getAllPerspectiveCameraProjectionComponent(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(cameraProjection =>
                       PerspectiveCameraProjectionTool.unsafeGetFar(
                         cameraProjection,
                         state,
                       )
                     )
                  |> expect == [|1000., 100000.|],
              (),
            )
          );
        });

        describe("test set aspect", () => {
          let _buildGLTFJsonOfCamera = () =>
            ConvertGLBTool.buildGLTFJson(
              ~nodes=
                {| [
        {
            "mesh": 0,
            "camera": 1,
            "children": [
                1
            ]
        },
        {
            "mesh": 0,
            "camera": 0
        }
    ]|},
              ~cameras=
                {|
[
        {
            "perspective": {
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        },
        {
            "perspective": {
                "aspectRatio": 2.0,
                "yfov": 0.5,
                "zfar": 1000.0,
                "znear": 2.0
            },
            "type": "perspective"
        }
    ]
        |},
              (),
            );

          testPromise("if no aspect, set canvas.width/canvas.height", () => {
            let state =
              RenderJobsTool.initWithJobConfigWithoutBuildFakeDom(
                sandbox,
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~initPipelines=
                    {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        }
        ]
    }
]
        |},
                  (),
                ),
              );

            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state=ref(state),
              ~testFunc=
                ((state, rootGameObject)) => {
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ()),
                       );

                  let canvas = {"width": 100., "height": 200.} |> Obj.magic;
                  let state = ViewTool.setCanvas(canvas, state);

                  let state = state |> RenderJobsTool.init;

                  _getAllPerspectiveCameraProjectionComponent(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(cameraProjection =>
                       PerspectiveCameraProjectionTool.unsafeGetAspect(
                         cameraProjection,
                         state,
                       )
                     )
                  |> expect == [|2., canvas##width /. canvas##height|];
                },
              (),
            );
          });
        });
      })
    );

    describe("test lightMaterials", () => {
      /* let _buildGLTFJsonOfLightMaterial = () =>
             ConvertGLBTool.buildGLTFJson(
               ~nodes=
                 {| [
             {
                 "children": [
                     1, 2, 3, 4, 5
                 ]
             },
             {
               "mesh": 0
             },
             {
               "mesh": 1
             },
             {
               "mesh": 0
             },
             {
               "mesh": 2
             },
             {
               "mesh": 3
             }
         ]|},
               ~meshes=
                 {| [
             {
                 "primitives": [
                     {
                         "attributes": {
                             "POSITION": 2
                         },
                         "indices": 0,
                         "mode": 4,
                         "material": 0
                     }
                 ]
             },
             {
                 "primitives": [
                     {
                         "attributes": {
                             "POSITION": 2
                         },
                         "indices": 0,
                         "mode": 4,
                         "material": 1
                     }
                 ]
             },
             {
                 "primitives": [
                     {
                         "attributes": {
                             "POSITION": 2
                         },
                         "indices": 0,
                         "mode": 4,
                         "material": 3
                     }
                 ]
             },
             {
                 "primitives": [
                     {
                         "attributes": {
                             "POSITION": 2
                         },
                         "indices": 0,
                         "mode": 4,
                         "material": 2
                     }
                 ]
             }
         ] |},
               ~materials=
                 {| [
             {
                 "pbrMetallicRoughness": {
                     "baseColorTexture": {
                         "index": 0
                     },
                     "metallicFactor": 0.0
                 },
                 "name": "truck"
             },
             {
                 "pbrMetallicRoughness": {
                     "baseColorFactor": [
                         1.0,
                         0.5,
                         0.5,
                         0.8
                     ],
                     "metallicFactor": 0.0
                 },
                 "name": "glass"
             },
             {
                 "pbrMetallicRoughness": {
                     "baseColorTexture": {
                         "index": 1
                     },
                     "metallicFactor": 0.0
                 }
             },
             {
                 "pbrMetallicRoughness": {
                     "baseColorTexture": {
                         "index": 0
                     },
                     "metallicFactor": 0.0
                 }
             }
         ]|},
               ~textures=
                 {|  [
             {
                 "sampler": 0,
                 "source": 0
             },
             {
                 "sampler": 1,
                 "source": 1
             }
         ]|},
               ~samplers=
                 {|  [
             {
                 "magFilter": 9729,
                 "minFilter": 9986,
                 "wrapS": 10497,
                 "wrapT": 33071
             },
             {
                 "magFilter": 9728,
                 "minFilter": 9729,
                 "wrapS": 33071,
                 "wrapT": 33648
             }
         ]|},
               ~images=
                 {|  [
             {
                 "uri":"|}
                 ++ ConvertGLBTool.buildFakeImageOfSingleNode()
                 ++ {|"
                 },
             {
                 "uri":"|}
                 ++ ConvertGLBTool.buildFakeImageOfCesiumMilkTruck()
                 ++ {|"
                 }
                 ]|},
               (),
             ); */

      let _getAllLightMaterials = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllLightMaterials(rootGameObject, state);

      describe("test set material name", () =>
        testPromise("test", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) =>
              _getAllLightMaterials(rootGameObject, state)
              |> Js.Array.map(material =>
                   LightMaterialAPI.unsafeGetLightMaterialName(
                     material,
                     state,
                   )
                 )
              |>
              expect == [|
                          "truck",
                          "glass",
                          "window_trim",
                          "wheels",
                          "wheels",
                        |],
            state^,
          )
        )
      );

      testPromise("test set diffuseColor", () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((state, rootGameObject)) =>
            _getAllLightMaterials(rootGameObject, state)
            |> Js.Array.map(lightMaterial =>
                 LightMaterialAPI.getLightMaterialDiffuseColor(
                   lightMaterial,
                   state,
                 )
               )
            |>
            expect == [|
                        LightMaterialTool.getDefaultDiffuseColor(state),
                        [|0., 0.04050629958510399, 0.021240700036287308|],
                        [|
                          0.06400000303983688,
                          0.06400000303983688,
                          0.06400000303983688,
                        |],
                        LightMaterialTool.getDefaultDiffuseColor(state),
                        LightMaterialTool.getDefaultDiffuseColor(state),
                      |],
          state^,
        )
      );
      testPromise("test set diffuseMap", () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((state, rootGameObject)) =>
            _getAllLightMaterials(rootGameObject, state)
            |> Js.Array.filter(lightMaterial =>
                 LightMaterialAPI.hasLightMaterialDiffuseMap(
                   lightMaterial,
                   state,
                 )
               )
            |> Js.Array.map(lightMaterial =>
                 LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                   lightMaterial,
                   state,
                 )
               )
            |> expect == [|0, 1, 1|],
          state^,
        )
      );

      describe("test diffuseMaps", () => {
        describe("test BoxTextured glb", () => {
          describe("test set texture name", () =>
            testPromise("test", () =>
              AssembleWDBSystemTool.testGLB(
                sandbox^,
                GLBTool.buildGLBFilePath("BoxTextured.glb"),
                ((state, rootGameObject)) =>
                  AssembleWDBSystemTool.getAllDiffuseMaps(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(diffuseMap =>
                       BasicSourceTextureAPI.unsafeGetBasicSourceTextureName(
                         diffuseMap,
                         state,
                       )
                     )
                  |> expect == [|"CesiumLogoFlat.png"|],
                state^,
              )
            )
          );

          testPromise("set not flipY", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("BoxTextured.glb"),
              ((state, rootGameObject)) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                       diffuseMap,
                       state,
                     )
                   )
                |> Obj.magic
                |> expect == [|false|],
              state^,
            )
          );

          testPromise("test set other data", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("BoxTextured.glb"),
              ((state, rootGameObject)) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     (
                       BasicSourceTextureAPI.getBasicSourceTextureMagFilter(
                         diffuseMap,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureMinFilter(
                         diffuseMap,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureWrapS(
                         diffuseMap,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureWrapT(
                         diffuseMap,
                         state,
                       ),
                     )
                   )
                |> Obj.magic
                |>
                expect == [|
                            (
                              SourceTextureType.LINEAR,
                              SourceTextureType.NEAREST_MIPMAP_LINEAR,
                              SourceTextureType.REPEAT,
                              SourceTextureType.REPEAT,
                            ),
                          |],
              state^,
            )
          );

          testPromise("test set source", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("BoxTextured.glb"),
              ((state, rootGameObject)) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                       diffuseMap,
                       state,
                     )
                   )
                |> expect == [|"object_url0" |> Obj.magic|],
              state^,
            )
          );

          testPromise("test release blobs", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("BoxTextured.glb"),
              ((state, rootGameObject)) =>
                GLBTool.getURL()##revokeObjectURL
                |> getCallCount
                |> expect == 1,
              state^,
            )
          );

          describe("test set format", () => {
            testPromise("png source should set RGBA format", () =>
              AssembleWDBSystemTool.testGLB(
                sandbox^,
                GLBTool.buildGLBFilePath("BoxTextured.glb"),
                ((state, rootGameObject)) =>
                  AssembleWDBSystemTool.getAllDiffuseMaps(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(diffuseMap =>
                       BasicSourceTextureAPI.getBasicSourceTextureFormat(
                         diffuseMap,
                         state,
                       )
                     )
                  |> expect == [|SourceTextureType.RGBA|],
                state^,
              )
            );

            testPromise("jpeg source should set RGB format", () =>
              AssembleWDBSystemTool.testGLB(
                sandbox^,
                GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
                ((state, rootGameObject)) =>
                  AssembleWDBSystemTool.getAllDiffuseMaps(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(diffuseMap =>
                       BasicSourceTextureAPI.getBasicSourceTextureFormat(
                         diffuseMap,
                         state,
                       )
                     )
                  |>
                  expect == [|
                              SourceTextureType.RGB,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                              SourceTextureType.RGBA,
                            |],
                state^,
              )
            );
          });
        });

        describe("test truck glb", () => {
          describe("test set texture name", () =>
            testPromise("test", () =>
              AssembleWDBSystemTool.testGLB(
                sandbox^,
                GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
                ((state, rootGameObject)) =>
                  AssembleWDBSystemTool.getAllDiffuseMaps(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(diffuseMap =>
                       BasicSourceTextureAPI.unsafeGetBasicSourceTextureName(
                         diffuseMap,
                         state,
                       )
                     )
                  |> expect == [|"texture_0", "texture_1", "texture_1"|],
                state^,
              )
            )
          );

          testPromise("set not flipY", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              ((state, rootGameObject)) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                       diffuseMap,
                       state,
                     )
                   )
                |> Obj.magic
                |> expect == [|false, false, false|],
              state^,
            )
          );

          testPromise("test set other data", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              ((state, rootGameObject)) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     (
                       BasicSourceTextureAPI.getBasicSourceTextureMagFilter(
                         diffuseMap,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureMinFilter(
                         diffuseMap,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureWrapS(
                         diffuseMap,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureWrapT(
                         diffuseMap,
                         state,
                       ),
                     )
                   )
                |> Obj.magic
                |>
                expect == [|
                            (
                              SourceTextureType.LINEAR,
                              SourceTextureType.NEAREST_MIPMAP_LINEAR,
                              SourceTextureType.REPEAT,
                              SourceTextureType.REPEAT,
                            ),
                            (
                              SourceTextureType.LINEAR,
                              SourceTextureType.NEAREST_MIPMAP_LINEAR,
                              SourceTextureType.REPEAT,
                              SourceTextureType.REPEAT,
                            ),
                            (
                              SourceTextureType.LINEAR,
                              SourceTextureType.NEAREST_MIPMAP_LINEAR,
                              SourceTextureType.REPEAT,
                              SourceTextureType.REPEAT,
                            ),
                          |],
              state^,
            )
          );
          testPromise("test set source", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              ((state, rootGameObject)) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                       diffuseMap,
                       state,
                     )
                   )
                |>
                expect == [|
                            "object_url0" |> Obj.magic,
                            "object_url0" |> Obj.magic,
                            "object_url0" |> Obj.magic,
                          |],
              state^,
            )
          );
        });

        describe("test AlphaBlendModeTest glb", () =>
          testPromise("test release blobs", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
              ((state, rootGameObject)) =>
                GLBTool.getURL()##revokeObjectURL
                |> getCallCount
                |> expect == 4,
              state^,
            )
          )
        );
      });
    });

    describe("test meshRenderers", () =>
      testPromise(
        "each gameObject with light material component should has one meshRenderer",
        () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((state, rootGameObject)) =>
            _getAllGameObjects(rootGameObject, state)
            |> Js.Array.filter(gameObject =>
                 GameObjectAPI.hasGameObjectMeshRendererComponent(
                   gameObject,
                   state,
                 )
               )
            |> Js.Array.length
            |> expect == 5,
          state^,
        )
      )
    );

    describe("test directionLights", () =>
      testPromise("test set color, intensity", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ((state, rootGameObject)) =>
              AssembleWDBSystemTool.getAllDirectionLightData(
                rootGameObject,
                state,
              )
              |> expect == [|([|0.5, 0.5, 1.|], 1.)|],
          (),
        )
      )
    );

    describe("test pointLights", () =>
      testPromise(
        "test set color, intensity, constant, linear, quadratic, range", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ((state, rootGameObject)) =>
              AssembleWDBSystemTool.getAllPointLightData(
                rootGameObject,
                state,
              )
              |> expect == [|([|0., 0., 0.|], 2.5, 1., 1.5, 0., 55.5)|],
          (),
        )
      )
    );

    describe("test ambientLight", () =>
      testPromise("test set color", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ((state, rootGameObject)) =>
              SceneAPI.getAmbientLightColor(state)
              |> expect == [|1., 0.5, 1.|],
          (),
        )
      )
    );
  });