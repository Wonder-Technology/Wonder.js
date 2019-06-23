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
              ~geometryPointCount=10000,
              ~geometryCount=10,
              (),
            ),
          (),
        );

      ConvertTool.setFakeTransformCount(50);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build scene gameObject", () => {
      testPromise("test single scene gameObject", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) => rootGameObject |> expect == 1,
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
            ((state, _, rootGameObject)) =>
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

      describe("test set isRoot", () => {
        describe(
          "if scene gameObject only has one child, its isRoot should be decided by the child",
          () => {
            testPromise("test1", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfSceneAndOneNodeIsRoot(
                    true,
                    false,
                  ),
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    GameObjectAPI.unsafeGetGameObjectIsRoot(
                      rootGameObject,
                      state,
                    )
                    |> expect == false,
                (),
              )
            );
            testPromise("test2", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfSceneAndOneNodeIsRoot(
                    false,
                    true,
                  ),
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    GameObjectAPI.unsafeGetGameObjectIsRoot(
                      rootGameObject,
                      state,
                    )
                    |> expect == true,
                (),
              )
            );
            testPromise("test3", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfSceneAndOneNodeIsRoot(
                    true,
                    true,
                  ),
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    GameObjectAPI.unsafeGetGameObjectIsRoot(
                      rootGameObject,
                      state,
                    )
                    |> expect == true,
                (),
              )
            );
          },
        );

        describe("else, its isRoot should decided by the itself", () =>
          testPromise("test", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfSceneAndTwoNodeIsRoot(
                  true,
                  false,
                ),
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  GameObjectAPI.unsafeGetGameObjectIsRoot(
                    rootGameObject,
                    state,
                  )
                  |> expect == true,
              (),
            )
          )
        );

        describe("test truck glb", () =>
          testPromise("root gameObject->isRoot should be true", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              ((state, _, rootGameObject)) =>
                GameObjectAPI.unsafeGetGameObjectIsRoot(rootGameObject, state)
                |> expect == true,
              state^,
            )
          )
        );
      });
    });

    describe("test imgui", () => {
      describe(
        "if isSetIMGUIFunc === true, set imgui func and custom data", () => {
        describe("test return hasIMGUIFunc", () =>
          testPromise("return true", () => {
            let customData = {|[ 1, \"function (a) { return a; }\" ]|};
            let imguiFunc = IMGUITool.buildEmptyIMGUIFuncStr();

            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfIMGUI(customData, imguiFunc),
              ~state,
              ~testFunc=
                ((state, (_, hasIMGUIFunc), rootGameObject)) =>
                  hasIMGUIFunc |> expect == true,
              (),
            );
          })
        );

        describe("test customData", () =>
          testPromise("test value with function", () => {
            let customData = {|[ 1, \"function (a) { return a; }\" ]|};
            let imguiFunc = IMGUITool.buildEmptyIMGUIFuncStr();

            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfIMGUI(customData, imguiFunc),
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) => {
                  let (_, func) =
                    IMGUITool.getCustomData(state)
                    |> OptionService.unsafeGet
                    |> Obj.magic;

                  func(10) |> expect == 10;
                },
              (),
            );
          })
        );

        testPromise("test empty imgui func", () => {
          let customData = {|1|};
          let imguiFunc = IMGUITool.buildEmptyIMGUIFuncStr();

          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfIMGUI(customData, imguiFunc),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                (
                  IMGUITool.getIMGUIFunc(state)
                  |> OptionService.unsafeGet
                  |> SerializeTool.serializeFunction,
                  IMGUITool.getCustomData(state)
                  |> OptionService.unsafeGet
                  |> Obj.magic,
                )
                |> expect
                == (imguiFunc, customData |> Obj.magic |> Js.Json.parseExn),
            (),
          );
        });
        testPromise("test use imguiAPIJsObj", () => {
          let (state, gameObject, material) =
            LightMaterialTool.createGameObject(state^);
          let customData = [|gameObject|] |> Obj.magic |> Js.Json.stringify;
          let imguiFunc =
            (
              (. customData, imguiAPIJsObj, state) => {
                let gameObject = Array.unsafe_get(customData, 0);
                let unsafeGetGameObjectLightMaterialComponent =
                  imguiAPIJsObj##unsafeGetGameObjectLightMaterialComponent;

                let material =
                  unsafeGetGameObjectLightMaterialComponent(.
                    gameObject,
                    state,
                  );

                state;
              }
            )
            |> Obj.magic
            |> SerializeTool.serializeFunction
            |> StringTool.removeNewLines;

          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfIMGUI(customData, imguiFunc),
            ~state=ref(state),
            ~testFunc=
              ((state, _, rootGameObject)) =>
                (
                  IMGUITool.getIMGUIFunc(state)
                  |> OptionService.unsafeGet
                  |> SerializeTool.serializeFunction
                  |> StringTool.removeNewLines
                  |> StringTool.removeSpaces,
                  IMGUITool.getCustomData(state)
                  |> OptionService.unsafeGet
                  |> Obj.magic,
                )
                |> expect
                == (
                     {|
                         function (customData, imguiAPIJsObj, state) {
                           var gameObject = customData[0];
                           var unsafeGetGameObjectLightMaterialComponent = imguiAPIJsObj.unsafeGetGameObjectLightMaterialComponent;
                           unsafeGetGameObjectLightMaterialComponent(gameObject, state);
                           return state;
                         }
                       |}
                     |> StringTool.removeNewLines
                     |> StringTool.removeSpaces,
                     [|gameObject|],
                   ),
            (),
          );
        });
      });

      describe("else, not set", () => {
        describe("test return hasIMGUIFunc", () =>
          testPromise("return true", () => {
            let customData = {|[ 1, \"function (a) { return a; }\" ]|};
            let imguiFunc = IMGUITool.buildEmptyIMGUIFuncStr();

            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfIMGUI(customData, imguiFunc),
              ~state,
              ~isSetIMGUIFunc=false,
              ~testFunc=
                ((state, (_, hasIMGUIFunc), rootGameObject)) =>
                  hasIMGUIFunc |> expect == true,
              (),
            );
          })
        );

        testPromise("test no customData", () => {
          let customData = {|[ 1, \"function (a) { return a; }\" ]|};
          let imguiFunc = IMGUITool.buildEmptyIMGUIFuncStr();

          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfIMGUI(customData, imguiFunc),
            ~state,
            ~isSetIMGUIFunc=false,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                IMGUITool.getCustomData(state)
                |> Js.Option.isNone
                |> expect == true,
            (),
          );
        });
      });
    });

    describe("test gameObject", () => {
      describe("set gameObject name", () =>
        testPromise("test", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) =>
              _getAllGameObjects(rootGameObject, state)
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.unsafeGetGameObjectName(gameObject, state)
                 )
              |> expect
              == [|
                   "gameObject_0",
                   "gameObject_3",
                   "gameObject_1",
                   "Cesium_Milk_Truck_0",
                   "Cesium_Milk_Truck_1",
                   "Cesium_Milk_Truck_2",
                   "Wheels",
                   "Wheels",
                 |],
            state^,
          )
        )
      );

      describe("set gameObject isActive", () => {
        testPromise("if gltf->node->extras has no isActive, set true", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllGameObjectsIsActive(
                rootGameObject,
                state,
              )
              |> AssembleWDBSystemTool.getAllChildrenData
              |> expect == [|true, true, true, true, true, true, true|],
            state^,
          )
        );
        testPromise("else, set it", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfNodeIsActive(false),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                AssembleWDBSystemTool.getAllGameObjectsIsActive(
                  rootGameObject,
                  state,
                )
                |> expect == [|false, false|],
            (),
          )
        );
      });

      describe("set gameObject isRoot", () => {
        testPromise("if gltf->node->extras has no isRoot, set false", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllGameObjectsIsRoot(
                rootGameObject,
                state,
              )
              |> AssembleWDBSystemTool.getAllChildrenData
              |> expect == [|false, false, false, false, false, false, false|],
            state^,
          )
        );
        testPromise("else, set it", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfNodeIsRoot(true),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                AssembleWDBSystemTool.getAllGameObjectsIsRoot(
                  rootGameObject,
                  state,
                )
                |> expect == [|true, true|],
            (),
          )
        );
      });

      describe("test gameObject count", () =>
        testPromise("test 2CylinderEngine glb", () => {
          ConvertTool.setFakeTransformCount(1000);

          state :=
            TestTool.initWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~geometryPointCount=300000,
                  ~geometryCount=50,
                  ~transformCount=500,
                  ~lightMaterialCount=480,
                  ~meshRendererCount=500,
                  (),
                ),
              (),
            );

          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("2CylinderEngine.glb"),
            ((state, _, rootGameObject)) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDBSystemTool.getAllGameObjects(rootGameObject, state)
              |> Js.Array.length
              |> expect == 159;
            },
            state^,
          );
        })
      );
    });

    describe("test transforms", () => {
      describe("test set parent", () => {
        testPromise("test children", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) => {
              let allTransformChildren =
                _getAllChildrenTransform(rootGameObject, state);
              allTransformChildren |> expect == [|4, 2, 6, 7, 8, 5, 3|];
            },
            state^,
          )
        );
        testPromise("test parent", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) => {
              let allTransformChildren =
                _getAllChildrenTransform(rootGameObject, state);
              TransformTool.getRecord(state).parentMap
              |> Obj.magic
              |> expect
              == [|
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
            ((state, _, rootGameObject)) =>
              _getAllSortedTransforms(rootGameObject, state)
              |> Js.Array.map(transform =>
                   (
                     TransformAPI.getTransformLocalPosition(transform, state),
                     TransformAPI.getTransformLocalRotation(transform, state),
                     TransformAPI.getTransformLocalScale(transform, state),
                   )
                 )
              |> expect
              == [|
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
                     (0., 0., 0.08848590403795242, (-0.9960774183273315)),
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
                     (0., 0., 0.08848590403795242, (-0.9960774183273315)),
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
      /* describe("contract check", () =>
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
         ); */
    });

    describe("test geometrys", () => {
      open Js.Typed_array;

      describe("test set point data", () => {
        testPromise("test single node gltf", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) => {
                let boxGameObject = rootGameObject;
                let geometry =
                  GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                    boxGameObject,
                    state,
                  );
                (
                  GeometryAPI.getGeometryVertices(geometry, state),
                  GeometryAPI.getGeometryNormals(geometry, state),
                  GeometryAPI.getGeometryTexCoords(geometry, state),
                  GeometryAPI.getGeometryIndices16(geometry, state)->Some,
                  None,
                )
                |> expect == GLTFTool.getBoxTexturedGeometryData();
              },
            (),
          )
        );

        testPromise("test truck glb", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state)
              |> expect
              == [|
                   (
                     "Cesium_Milk_Truck_0",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Cesium_Milk_Truck_0",
                        ),
                   ),
                   (
                     "Cesium_Milk_Truck_1",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Cesium_Milk_Truck_1",
                        ),
                   ),
                   (
                     "Cesium_Milk_Truck_2",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Cesium_Milk_Truck_2",
                        ),
                   ),
                   (
                     "Wheels",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Wheels",
                        ),
                   ),
                   (
                     "Wheels",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Wheels",
                        ),
                   ),
                 |];
            },
            state^,
          )
        );

        testPromise("test AlphaBlendModeTest glb", () => {
          state :=
            TestTool.initWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~geometryPointCount=8000000,
                  ~geometryCount=50,
                  ~transformCount=500,
                  ~lightMaterialCount=480,
                  ~meshRendererCount=500,
                  (),
                ),
              (),
            );

          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
            ((state, _, rootGameObject)) => {
              let allGeometryData =
                AssembleWDBSystemTool.getAllGeometryData(
                  rootGameObject,
                  state,
                );

              let dataMap = GLTFTool.getAlphaBlendModeTestGeometryData();

              (allGeometryData |> Js.Array.length, allGeometryData[1])
              |> expect
              == (
                   9,
                   (
                     "DecalBlendMesh",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "DecalBlendMesh",
                        ),
                   ),
                 );
            },
            state^,
          );
        });

        testPromise("test SuperLowPolyStove glb", () => {
          state :=
            TestTool.initWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~geometryPointCount=100000,
                  ~geometryCount=100,
                  (),
                ),
              (),
            );

          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
            ((state, _, rootGameObject)) => {
              let allGeometryData =
                AssembleWDBSystemTool.getAllGeometryData(
                  rootGameObject,
                  state,
                );

              let dataMap = GLTFTool.getSuperLowPolyStoveGeometryData();

              (allGeometryData |> Js.Array.length, allGeometryData[1])
              |> expect
              == (
                   2,
                   (
                     "Stove_1",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Stove_1",
                        ),
                   ),
                 );
            },
            state^,
          );
        });

        testPromise(
          "test gameObjects which has no cutomGeometry component", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) =>
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
              |> expect
              == [|false, false, true, false, true, true, true, true|],
            state^,
          )
        );
      });

      describe("set geometry name", () => {
        testPromise("test BoxTextured glb", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllGeometrys(rootGameObject, state)
              |> Js.Array.map(geometry =>
                   GeometryAPI.unsafeGetGeometryName(geometry, state)
                 )
              |> expect == [|"Mesh"|],
            state^,
          )
        );
        testPromise("test truck glb", () =>
          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllGeometrys(rootGameObject, state)
              |> Js.Array.map(geometry =>
                   GeometryAPI.unsafeGetGeometryName(geometry, state)
                 )
              |> expect
              == [|
                   "Cesium_Milk_Truck_0",
                   "Cesium_Milk_Truck_1",
                   "Cesium_Milk_Truck_2",
                   "Wheels",
                   "Wheels",
                 |],
            state^,
          )
        );
      });
      /* describe("contract check", () =>
           testPromise("shouldn't disposed before", () => {
             TestTool.openContractCheck();
             let (state, gameObject, geometry) =
               GeometryTool.createGameObject(state^);
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
         ); */
    });

    describe("test basicCameraViews", () => {
      describe("test add basicCameraView components", () =>
        testPromise("test", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
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
      );

      describe("test set active", () => {
        let _getAllBasicCameraViewGameObjects = (rootGameObject, state) =>
          _getAllGameObjects(rootGameObject, state)
          |> Js.Array.filter(gameObject =>
               GameObjectAPI.hasGameObjectBasicCameraViewComponent(
                 gameObject,
                 state,
               )
             );

        describe("test no extras", () =>
          describe("active the one whose cameraViewIndex === 0", () => {
            testPromise("if isActiveCamera === false, not active", () => {
              let (state, basicCameraView, perspectiveCameraProjection) =
                CameraTool.createBasicCameraViewPerspectiveCamera(state^);

              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
                ~isActiveCamera=false,
                ~state=ref(state),
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    _getAllBasicCameraViewGameObjects(rootGameObject, state)
                    |> Js.Array.map(gameObject =>
                         GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent(
                           gameObject,
                           state,
                         )
                       )
                    |> ArrayService.push(basicCameraView)
                    |> Js.Array.map(cameraView =>
                         (
                           cameraView,
                           BasicCameraViewAPI.isActiveBasicCameraView(
                             cameraView,
                             state,
                           ),
                         )
                       )
                    |> expect == [|(3, false), (1, false), (0, false)|],
                (),
              );
            });

            describe("else", () =>
              testPromise("unactive other ones", () => {
                let (state, basicCameraView, perspectiveCameraProjection) =
                  CameraTool.createBasicCameraViewPerspectiveCamera(state^);
                let state =
                  BasicCameraViewAPI.activeBasicCameraView(
                    basicCameraView,
                    state,
                  );

                AssembleWDBSystemTool.testGLTF(
                  ~sandbox=sandbox^,
                  ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
                  ~isActiveCamera=true,
                  ~state=ref(state),
                  ~testFunc=
                    ((state, _, rootGameObject)) =>
                      _getAllBasicCameraViewGameObjects(rootGameObject, state)
                      |> Js.Array.map(gameObject =>
                           GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent(
                             gameObject,
                             state,
                           )
                         )
                      |> ArrayService.push(basicCameraView)
                      |> Js.Array.map(cameraView =>
                           (
                             cameraView,
                             BasicCameraViewAPI.isActiveBasicCameraView(
                               cameraView,
                               state,
                             ),
                           )
                         )
                      |> expect == [|(3, false), (1, true), (0, false)|],
                  (),
                );
              })
            );
          })
        );

        describe("test extras", () => {
          testPromise("if isActiveCamera === false, not active", () => {
            let (state, basicCameraView, perspectiveCameraProjection) =
              CameraTool.createBasicCameraViewPerspectiveCamera(state^);

            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
              ~isActiveCamera=false,
              ~state=ref(state),
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  _getAllBasicCameraViewGameObjects(rootGameObject, state)
                  |> Js.Array.map(gameObject =>
                       GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent(
                         gameObject,
                         state,
                       )
                     )
                  |> ArrayService.push(basicCameraView)
                  |> Js.Array.map(cameraView =>
                       (
                         cameraView,
                         BasicCameraViewAPI.isActiveBasicCameraView(
                           cameraView,
                           state,
                         ),
                       )
                     )
                  |> expect
                  == [|(2, false), (1, false), (3, false), (0, false)|],
              (),
            );
          });

          describe("else", () =>
            testPromise("unactive other ones", () => {
              let (state, basicCameraView, perspectiveCameraProjection) =
                CameraTool.createBasicCameraViewPerspectiveCamera(state^);
              let state =
                BasicCameraViewAPI.activeBasicCameraView(
                  basicCameraView,
                  state,
                );

              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
                ~state=ref(state),
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    _getAllBasicCameraViewGameObjects(rootGameObject, state)
                    |> Js.Array.map(gameObject =>
                         GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent(
                           gameObject,
                           state,
                         )
                       )
                    |> ArrayService.push(basicCameraView)
                    |> Js.Array.map(cameraView =>
                         (
                           cameraView,
                           BasicCameraViewAPI.isActiveBasicCameraView(
                             cameraView,
                             state,
                           ),
                         )
                       )
                    |> expect
                    == [|(2, true), (1, false), (3, false), (0, false)|],
                (),
              );
            })
          );
        });
      });
    });

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
              ((state, _, rootGameObject)) =>
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
                |> expect
                == [|(2., 28.64788975654116), (1., 34.37746770784939)|],
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
                ((state, _, rootGameObject)) =>
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

          testPromise("if has no aspect data, not set aspect", () => {
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
                ((state, _, rootGameObject)) => {
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
                       PerspectiveCameraProjectionTool.getAspect(
                         cameraProjection,
                         state,
                       )
                     )
                  |> expect == [|Some(2.), None|];
                },
              (),
            );
          });
        });
      })
    );

    describe("test flyCameraControllers", () =>
      describe("test set data", () => {
        let _getAllFlyCameraControllerComponent = (rootGameObject, state) =>
          _getAllGameObjects(rootGameObject, state)
          |> Js.Array.filter(gameObject =>
               GameObjectAPI.hasGameObjectFlyCameraControllerComponent(
                 gameObject,
                 state,
               )
             )
          |> Js.Array.map(gameObject =>
               GameObjectAPI.unsafeGetGameObjectFlyCameraControllerComponent(
                 gameObject,
                 state,
               )
             );

        testPromise("test set moveSpeed", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfFlyCameraController(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllFlyCameraControllerComponent(rootGameObject, state)
                |> Js.Array.map(cameraController =>
                     FlyCameraControllerAPI.unsafeGetFlyCameraControllerMoveSpeed(
                       cameraController,
                       state,
                     )
                   )
                |> expect == [|2.1|],
            (),
          )
        );
        testPromise("test set rotateSpeed", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfFlyCameraController(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllFlyCameraControllerComponent(rootGameObject, state)
                |> Js.Array.map(cameraController =>
                     FlyCameraControllerAPI.unsafeGetFlyCameraControllerRotateSpeed(
                       cameraController,
                       state,
                     )
                   )
                |> expect == [|2.3|],
            (),
          )
        );
        testPromise("test set wheelSpeed", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfFlyCameraController(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllFlyCameraControllerComponent(rootGameObject, state)
                |> Js.Array.map(cameraController =>
                     FlyCameraControllerAPI.unsafeGetFlyCameraControllerWheelSpeed(
                       cameraController,
                       state,
                     )
                   )
                |> expect == [|3.9|],
            (),
          )
        );

        describe("test set isBindEvent", () => {
          testPromise("if isBindEvent===false, not bind event", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfFlyCameraController(),
              ~isBindEvent=false,
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  _getAllFlyCameraControllerComponent(rootGameObject, state)
                  |> Js.Array.map(cameraController =>
                       FlyCameraControllerAPI.isBindFlyCameraControllerEvent(
                         cameraController,
                         state,
                       )
                     )
                  |> expect == [|false|],
              (),
            )
          );

          describe("else, judge by data", () => {
            testPromise("test not bind", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfFlyCameraController(
                    ~isBindEvent=false,
                    (),
                  ),
                ~isBindEvent=true,
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    _getAllFlyCameraControllerComponent(rootGameObject, state)
                    |> Js.Array.map(cameraController =>
                         FlyCameraControllerAPI.isBindFlyCameraControllerEvent(
                           cameraController,
                           state,
                         )
                       )
                    |> expect == [|false|],
                (),
              )
            );
            testPromise("test bind", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfFlyCameraController(
                    ~isBindEvent=true,
                    (),
                  ),
                ~isBindEvent=true,
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    _getAllFlyCameraControllerComponent(rootGameObject, state)
                    |> Js.Array.map(cameraController =>
                         FlyCameraControllerAPI.isBindFlyCameraControllerEvent(
                           cameraController,
                           state,
                         )
                       )
                    |> expect == [|true|],
                (),
              )
            );
          });
        });
      })
    );

    describe("test arcballCameraControllers", () =>
      describe("test set data", () => {
        let _getAllArcballCameraControllerComponent = (rootGameObject, state) =>
          _getAllGameObjects(rootGameObject, state)
          |> Js.Array.filter(gameObject =>
               GameObjectAPI.hasGameObjectArcballCameraControllerComponent(
                 gameObject,
                 state,
               )
             )
          |> Js.Array.map(gameObject =>
               GameObjectAPI.unsafeGetGameObjectArcballCameraControllerComponent(
                 gameObject,
                 state,
               )
             );

        testPromise("test set distance", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfArcballCameraController(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllArcballCameraControllerComponent(rootGameObject, state)
                |> Js.Array.map(cameraController =>
                     ArcballCameraControllerAPI.unsafeGetArcballCameraControllerDistance(
                       cameraController,
                       state,
                     )
                   )
                |> expect == [|1.5|],
            (),
          )
        );
        testPromise("test set minDistance", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfArcballCameraController(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllArcballCameraControllerComponent(rootGameObject, state)
                |> Js.Array.map(cameraController =>
                     ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMinDistance(
                       cameraController,
                       state,
                     )
                   )
                |> expect == [|1.|],
            (),
          )
        );
        testPromise("test set wheelSpeed", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfArcballCameraController(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllArcballCameraControllerComponent(rootGameObject, state)
                |> Js.Array.map(cameraController =>
                     ArcballCameraControllerAPI.unsafeGetArcballCameraControllerWheelSpeed(
                       cameraController,
                       state,
                     )
                   )
                |> expect == [|0.9|],
            (),
          )
        );

        describe("test set isBindEvent", () => {
          testPromise("if isBindEvent===false, not bind event", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfArcballCameraController(),
              ~isBindEvent=false,
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  _getAllArcballCameraControllerComponent(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(cameraController =>
                       ArcballCameraControllerAPI.isBindArcballCameraControllerEvent(
                         cameraController,
                         state,
                       )
                     )
                  |> expect == [|false|],
              (),
            )
          );

          describe("else, judge by data", () => {
            testPromise("test not bind", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfArcballCameraController(
                    ~isBindEvent=false,
                    (),
                  ),
                ~isBindEvent=true,
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    _getAllArcballCameraControllerComponent(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(cameraController =>
                         ArcballCameraControllerAPI.isBindArcballCameraControllerEvent(
                           cameraController,
                           state,
                         )
                       )
                    |> expect == [|false|],
                (),
              )
            );
            testPromise("test bind", () =>
              AssembleWDBSystemTool.testGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfArcballCameraController(
                    ~isBindEvent=true,
                    (),
                  ),
                ~isBindEvent=true,
                ~state,
                ~testFunc=
                  ((state, _, rootGameObject)) =>
                    _getAllArcballCameraControllerComponent(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(cameraController =>
                         ArcballCameraControllerAPI.isBindArcballCameraControllerEvent(
                           cameraController,
                           state,
                         )
                       )
                    |> expect == [|true|],
                (),
              )
            );
          });
        });
      })
    );

    describe("test materials", () => {
      describe("test basicMaterials", () => {
        let _getAllBasicMaterials = (rootGameObject, state) =>
          AssembleWDBSystemTool.getAllBasicMaterials(rootGameObject, state);

        describe("test set material name", () =>
          testPromise("test", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfBasicMaterial(),
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  _getAllBasicMaterials(rootGameObject, state)
                  |> Js.Array.map(basicMaterial =>
                       BasicMaterialAPI.unsafeGetBasicMaterialName(
                         basicMaterial,
                         state,
                       )
                     )
                  |> expect == [|"basicMaterial"|],
              (),
            )
          )
        );

        describe("test set color", () =>
          testPromise("test", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfBasicMaterial(
                  ~colorFactor=[|0., 0., 1., 1.|],
                  (),
                ),
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  _getAllBasicMaterials(rootGameObject, state)
                  |> Js.Array.map(basicMaterial =>
                       BasicMaterialAPI.getBasicMaterialColor(
                         basicMaterial,
                         state,
                       )
                     )
                  |> expect == [|[|0., 0., 1.|]|],
              (),
            )
          )
        );
      });

      describe("test lightMaterials", () => {
        let _getAllLightMaterials = (rootGameObject, state) =>
          AssembleWDBSystemTool.getAllLightMaterials(rootGameObject, state);

        describe("test set material name", () =>
          testPromise("test", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              ((state, _, rootGameObject)) =>
                _getAllLightMaterials(rootGameObject, state)
                |> Js.Array.map(material =>
                     LightMaterialAPI.unsafeGetLightMaterialName(
                       material,
                       state,
                     )
                   )
                |> expect
                == [|"truck", "glass", "window_trim", "wheels", "wheels"|],
              state^,
            )
          )
        );

        describe("test pbrMetallicRoughness", () => {
          testPromise("test set diffuseColor", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              ((state, _, rootGameObject)) =>
                _getAllLightMaterials(rootGameObject, state)
                |> Js.Array.map(lightMaterial =>
                     LightMaterialAPI.getLightMaterialDiffuseColor(
                       lightMaterial,
                       state,
                     )
                   )
                |> expect
                == [|
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
              ((state, _, rootGameObject)) =>
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
                    ((state, _, rootGameObject)) =>
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
                      |> expect == [|"texture_0"|],
                    state^,
                  )
                )
              );

              testPromise("set not flipY", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("BoxTextured.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
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

              testPromise("test set sampler data", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("BoxTextured.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
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
                    |> expect
                    == [|
                         (
                           TextureType.Linear,
                           TextureType.Nearest_mipmap_linear,
                           TextureType.Repeat,
                           TextureType.Repeat,
                         ),
                       |],
                  state^,
                )
              );

              describe("test set source", () => {
                testPromise("if isLoadImage === true, set source", () =>
                  AssembleWDBSystemTool.testGLB(
                    sandbox^,
                    GLBTool.buildGLBFilePath("BoxTextured.glb"),
                    ((state, _, rootGameObject)) =>
                      AssembleWDBSystemTool.getAllDiffuseMaps(
                        rootGameObject,
                        state,
                      )
                      |> Js.Array.map(diffuseMap =>
                           BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                             diffuseMap,
                             state,
                           )
                         )
                      |> expect
                      == [|
                           {
                             "name": "CesiumLogoFlat.png",
                             "src": "object_url0",
                           }
                           |> Obj.magic,
                         |],
                    state^,
                  )
                );
                testPromise("else, not set source", () =>
                  AssembleWDBSystemTool.testGLBWithConfig(
                    ~sandbox=sandbox^,
                    ~glbFilePath=GLBTool.buildGLBFilePath("BoxTextured.glb"),
                    ~testFunc=
                      ((state, _, rootGameObject)) =>
                        AssembleWDBSystemTool.getAllDiffuseMaps(
                          rootGameObject,
                          state,
                        )
                        |> Js.Array.map(diffuseMap =>
                             BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                               diffuseMap,
                               state,
                             )
                             |> Obj.magic
                             |> Js.toOption
                           )
                        |> expect == [|None|],
                    ~state=state^,
                    ~isLoadImage=false,
                    (),
                  )
                );
              });

              testPromise("test release blobs", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("BoxTextured.glb"),
                  ((state, _, rootGameObject)) =>
                    GLBTool.getURL(.)##revokeObjectURL
                    |> getCallCount
                    |> expect == 1,
                  state^,
                )
              );

              describe("test set format", () => {
                testPromise("png source should set Rgba format", () =>
                  AssembleWDBSystemTool.testGLB(
                    sandbox^,
                    GLBTool.buildGLBFilePath("BoxTextured.glb"),
                    ((state, _, rootGameObject)) =>
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
                      |> expect == [|TextureType.Rgba|],
                    state^,
                  )
                );

                testPromise("jpeg source should set Rgb format", () =>
                  AssembleWDBSystemTool.testGLB(
                    sandbox^,
                    GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
                    ((state, _, rootGameObject)) =>
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
                      |> expect
                      == [|
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgba,
                           TextureType.Rgb,
                         |],
                    state^,
                  )
                );
              });

              describe("test set type", () =>
                testPromise("set default type", () =>
                  AssembleWDBSystemTool.testGLB(
                    sandbox^,
                    GLBTool.buildGLBFilePath("BoxTextured.glb"),
                    ((state, _, rootGameObject)) =>
                      AssembleWDBSystemTool.getAllDiffuseMaps(
                        rootGameObject,
                        state,
                      )
                      |> Js.Array.map(diffuseMap =>
                           BasicSourceTextureAPI.getBasicSourceTextureType(
                             diffuseMap,
                             state,
                           )
                         )
                      |> expect == [|BasicSourceTextureTool.getDefaultType()|],
                    state^,
                  )
                )
              );
            });

            describe("test truck glb", () => {
              describe("test set texture name", () =>
                testPromise("test", () =>
                  AssembleWDBSystemTool.testGLB(
                    sandbox^,
                    GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
                    ((state, _, rootGameObject)) =>
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
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
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

              testPromise("test set sampler data", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
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
                    |> expect
                    == [|
                         (
                           TextureType.Linear,
                           TextureType.Nearest_mipmap_linear,
                           TextureType.Repeat,
                           TextureType.Repeat,
                         ),
                         (
                           TextureType.Linear,
                           TextureType.Nearest_mipmap_linear,
                           TextureType.Repeat,
                           TextureType.Repeat,
                         ),
                         (
                           TextureType.Linear,
                           TextureType.Nearest_mipmap_linear,
                           TextureType.Repeat,
                           TextureType.Repeat,
                         ),
                       |],
                  state^,
                )
              );
              testPromise("test set source", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(diffuseMap =>
                         BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                           diffuseMap,
                           state,
                         )
                       )
                    |> expect
                    == [|
                         {"name": "image_0", "src": "object_url0"}
                         |> Obj.magic,
                         {"name": "image_0", "src": "object_url0"}
                         |> Obj.magic,
                         {"name": "image_0", "src": "object_url0"}
                         |> Obj.magic,
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
                  ((state, _, rootGameObject)) =>
                    GLBTool.getURL(.)##revokeObjectURL
                    |> getCallCount
                    |> expect == 2,
                  state^,
                )
              )
            );
          });
        });

        describe("khrMaterialsPBRSpecularGlossiness", () => {
          testPromise("test set diffuseColor", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
              ((state, _, rootGameObject)) =>
                _getAllLightMaterials(rootGameObject, state)
                |> Js.Array.map(lightMaterial =>
                     LightMaterialAPI.getLightMaterialDiffuseColor(
                       lightMaterial,
                       state,
                     )
                   )
                |> expect
                == [|
                     LightMaterialTool.getDefaultDiffuseColor(state),
                     LightMaterialTool.getDefaultDiffuseColor(state),
                   |],
              state^,
            )
          );
          testPromise("test set diffuseMap", () =>
            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
              ((state, _, rootGameObject)) =>
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
                |> expect == [|0, 1|],
              state^,
            )
          );

          describe("test diffuseMaps", () =>
            describe("test SuperLowPolyStove glb", () => {
              describe("test set texture name", () =>
                testPromise("test", () =>
                  AssembleWDBSystemTool.testGLB(
                    sandbox^,
                    GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
                    ((state, _, rootGameObject)) =>
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
                      |> expect == [|"texture_0", "texture_2"|],
                    state^,
                  )
                )
              );

              testPromise("set not flipY", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(diffuseMap =>
                         BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                           diffuseMap,
                           state,
                         )
                       )
                    |> Obj.magic
                    |> expect == [|false, false|],
                  state^,
                )
              );

              testPromise("test set sampler data", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
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
                    |> expect
                    == [|
                         (
                           TextureType.Linear,
                           TextureType.Linear_mipmap_linear,
                           TextureType.Repeat,
                           TextureType.Repeat,
                         ),
                         (
                           TextureType.Linear,
                           TextureType.Linear_mipmap_linear,
                           TextureType.Repeat,
                           TextureType.Repeat,
                         ),
                       |],
                  state^,
                )
              );

              testPromise("test set source", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
                  ((state, _, rootGameObject)) =>
                    AssembleWDBSystemTool.getAllDiffuseMaps(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(diffuseMap =>
                         BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                           diffuseMap,
                           state,
                         )
                       )
                    |> expect
                    == [|
                         {
                           "name": "MetalBrillante_diffuse.png",
                           "src": "object_url0",
                         }
                         |> Obj.magic,
                         {
                           "name": "MetalNegro_diffuse.png",
                           "src": "object_url1",
                         }
                         |> Obj.magic,
                       |],
                  state^,
                )
              );

              testPromise("test release blobs", () =>
                AssembleWDBSystemTool.testGLB(
                  sandbox^,
                  GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
                  ((state, _, rootGameObject)) =>
                    GLBTool.getURL(.)##revokeObjectURL
                    |> getCallCount
                    |> expect == 2,
                  state^,
                )
              );
            })
          );
        });
      });

      describe("test basicMaterials and lightMaterials", () =>
        describe("test set material name", () =>
          testPromise("test", () =>
            AssembleWDBSystemTool.testGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfBasicMaterialAndLightMaterial(),
              ~state,
              ~testFunc=
                ((state, _, rootGameObject)) =>
                  (
                    AssembleWDBSystemTool.getAllBasicMaterials(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(basicMaterial =>
                         BasicMaterialAPI.unsafeGetBasicMaterialName(
                           basicMaterial,
                           state,
                         )
                       ),
                    AssembleWDBSystemTool.getAllLightMaterials(
                      rootGameObject,
                      state,
                    )
                    |> Js.Array.map(lightMaterial =>
                         LightMaterialAPI.unsafeGetLightMaterialName(
                           lightMaterial,
                           state,
                         )
                       ),
                  )
                  |> expect
                  == (
                       [|"basicMaterial_0"|],
                       [|"lightMaterial_1", "lightMaterial_0"|],
                     ),
              (),
            )
          )
        )
      );
    });

    describe("test meshRenderers", () => {
      testPromise(
        "each gameObject with geometry component should has one meshRenderer",
        () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((state, _, rootGameObject)) =>
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
      );
      testPromise("test gameObjects which has no meshRenderer component", () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((state, _, rootGameObject)) =>
            _getAllSortedTransforms(rootGameObject, state)
            |> Js.Array.map(transform =>
                 TransformAPI.unsafeGetTransformGameObject(transform, state)
               )
            |> Js.Array.map(gameObject =>
                 GameObjectAPI.hasGameObjectMeshRendererComponent(
                   gameObject,
                   state,
                 )
               )
            |> expect == [|false, false, true, false, true, true, true, true|],
          state^,
        )
      );
      testPromise("test set isRender", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJsonOfMeshRenderer(
              ~isMeshRenderer1Render=true,
              ~isMeshRenderer2Render=false,
              (),
            ),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              _getAllGameObjects(rootGameObject, state)
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.unsafeGetGameObjectMeshRendererComponent(
                     gameObject,
                     state,
                   )
                 )
              |> Js.Array.map(meshRenderer =>
                   MeshRendererAPI.getMeshRendererIsRender(
                     meshRenderer,
                     state,
                   )
                 )
              |> expect == [|false|],
          (),
        )
      );
      testPromise("test set drawMode", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfMeshRenderer(),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              _getAllGameObjects(rootGameObject, state)
              |> Js.Array.map(gameObject =>
                   GameObjectAPI.unsafeGetGameObjectMeshRendererComponent(
                     gameObject,
                     state,
                   )
                 )
              |> Js.Array.map(meshRenderer =>
                   MeshRendererAPI.getMeshRendererDrawMode(
                     meshRenderer,
                     state,
                   )
                 )
              |> expect == [|3|],
          (),
        )
      );
    });

    describe("test directionLights", () => {
      testPromise("if isRenderLight === false, set light not render", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~isRenderLight=false,
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllDirectionLights(
                rootGameObject,
                state,
              )
              |> Js.Array.map(light =>
                   DirectionLightAPI.getDirectionLightIsRender(light, state)
                 )
              |> expect == [|false|],
          (),
        )
      );

      testPromise("test set color, intensity", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllDirectionLightData(
                rootGameObject,
                state,
              )
              |> expect == [|([|0.5, 0.5, 1.|], 1.)|],
          (),
        )
      );
    });

    describe("test pointLights", () => {
      testPromise("if isRenderLight === false, set light not render", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~isRenderLight=false,
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllPointLights(rootGameObject, state)
              |> Js.Array.map(light =>
                   PointLightAPI.getPointLightIsRender(light, state)
                 )
              |> expect == [|false|],
          (),
        )
      );
      testPromise(
        "test set color, intensity, constant, linear, quadratic, range", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllPointLightData(
                rootGameObject,
                state,
              )
              |> expect == [|([|0., 0., 0.|], 2.5, 1., 1.5, 0., 55.5)|],
          (),
        )
      );
    });

    describe("test ambientLight", () =>
      testPromise("test set color", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              SceneAPI.getAmbientLightColor(state)
              |> expect == [|1., 0.5, 1.|],
          (),
        )
      )
    );

    describe("test scripts", () => {
      describe("test add script components", () =>
        testPromise("test", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfScript(),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) =>
                _getAllGameObjects(rootGameObject, state)
                |> Js.Array.map(gameObject =>
                     GameObjectAPI.hasGameObjectScriptComponent(
                       gameObject,
                       state,
                     )
                   )
                |> expect == [|true|],
            (),
          )
        )
      );

      testPromise("test set isActive", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJsonOfScript(
              ~isActive=false,
              ~eventFunctionDataMap=None,
              ~attributeMap=None,
              (),
            ),
          ~state,
          ~testFunc=
            ((state, _, rootGameObject)) =>
              AssembleWDBSystemTool.getAllScripts(rootGameObject, state)
              |> Js.Array.map(script =>
                   ScriptAPI.unsafeGetScriptIsActive(script, state)
                 )
              |> expect == [|false|],
          (),
        )
      );

      describe("test event function", () => {
        testPromise("test exec init event function", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfScript(
                ~eventFunctionDataMap=
                  AssetScriptTool.buildEventFunctionDataMap(
                    ~initFunc=Some(AssetScriptTool.buildEventFunc()),
                    (),
                  )
                  ->Some,
                ~attributeMap=AssetScriptTool.buildAttributeMap()->Some,
                (),
              ),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) => {
                let state =
                  ScriptTool.ExecEventFunction.execAllInitEventFunction(
                    state,
                  );

                AssembleWDBSystemTool.getAllScripts(rootGameObject, state)
                |> Js.Array.map(script =>
                     ScriptTool.unsafeGetScriptAttributeIntFieldValue(
                       script,
                       AssetScriptTool.getScriptAttributeName(),
                       AssetScriptTool.getScriptAttributeFieldName(),
                       state,
                     )
                   )
                |> expect
                == [|
                     AssetScriptTool.getAttributeFieldAValueAfterExecEventeFunc(),
                   |];
              },
            (),
          )
        );
        testPromise("test exec update event function", () =>
          AssembleWDBSystemTool.testGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfScript(
                ~eventFunctionDataMap=
                  AssetScriptTool.buildEventFunctionDataMap(
                    ~updateFunc=Some(AssetScriptTool.buildEventFunc2()),
                    (),
                  )
                  ->Some,
                ~attributeMap=AssetScriptTool.buildAttributeMap()->Some,
                (),
              ),
            ~state,
            ~testFunc=
              ((state, _, rootGameObject)) => {
                let state =
                  ScriptTool.ExecEventFunction.execAllUpdateEventFunction(
                    state,
                  );

                AssembleWDBSystemTool.getAllScripts(rootGameObject, state)
                |> Js.Array.map(script =>
                     ScriptTool.unsafeGetScriptAttributeIntFieldValue(
                       script,
                       AssetScriptTool.getScriptAttributeName(),
                       AssetScriptTool.getScriptAttributeFieldName(),
                       state,
                     )
                   )
                |> expect
                == [|
                     AssetScriptTool.getAttributeFieldAValueAfterExecEventeFunc2(),
                   |];
              },
            (),
          )
        );
      });
    });

    describe("test imageUint8ArrayDataMap", () => {
      testPromise(
        "return imageUint8ArrayDataMap with mimeType and uint8Array", () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((state, (imageUint8ArrayMap, _), rootGameObject)) =>
            AssembleWDBSystemTool.isImageUint8ArrayMapEqual(
              imageUint8ArrayMap,
              WonderCommonlib.MutableSparseMapService.createEmpty()
              |> WonderCommonlib.MutableSparseMapService.set(
                   0,
                   ("image/png", 23516),
                 ),
            )
            |> expect == true,
          state^,
        )
      );
      testPromise(
        "imageUint8ArrayDataMap's key should be basicSourceTexture", () =>
        AssembleWDBSystemTool.testGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((state, (imageUint8ArrayMap, _), rootGameObject)) =>
            AssembleWDBSystemTool.isImageUint8ArrayMapEqual(
              imageUint8ArrayMap,
              WonderCommonlib.MutableSparseMapService.createEmpty()
              |> WonderCommonlib.MutableSparseMapService.set(
                   0,
                   ("image/png", 427633),
                 )
              |> WonderCommonlib.MutableSparseMapService.set(
                   1,
                   ("image/png", 427633),
                 ),
            )
            |> expect == true,
          state^,
        )
      );
    });
  });