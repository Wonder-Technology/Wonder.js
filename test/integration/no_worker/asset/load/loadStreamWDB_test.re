open Wonder_jest;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("load stream wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(-1));
    let cesiumMilkTruckWDBArrayBuffer = ref(Obj.magic(-1));
    let alphaBlendModeTestWDBArrayBuffer = ref(Obj.magic(-1));
    let stoveWDBArrayBuffer = ref(Obj.magic(-1));
    let skyboxWDBArrayBuffer = ref(Obj.magic(-1));

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _buildFakeBlob = [%raw
      (.) => {|
  var Blob = function(arrayBufferArr, param){
      if( typeof window.blobData_wonder_forTest === "undefined"){
window.blobData_wonder_forTest = [
  [arrayBufferArr[0], param]
];
      } else{
window.blobData_wonder_forTest.push(
[arrayBufferArr[0], param]
);
      }
  };

window.Blob = Blob;
  |}
    ];

    let _getBlobData = [%raw
      (.) => {|
 return window.blobData_wonder_forTest;
    |}
    ];

    let _clearBlobData = [%raw
      (.) => {|
 delete window.blobData_wonder_forTest;
    |}
    ];

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := NodeTool.convertGLBToWDB("BoxTextured");
      cesiumMilkTruckWDBArrayBuffer :=
        NodeTool.convertGLBToWDB("CesiumMilkTruck");
      alphaBlendModeTestWDBArrayBuffer :=
        NodeTool.convertGLBToWDB("AlphaBlendModeTest");
      stoveWDBArrayBuffer := NodeTool.convertGLBToWDB("SuperLowPolyStove");
    });
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfigAndBufferConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
          SettingTool.buildBufferConfigStr(
            ~geometryPointCount=100000,
            ~geometryCount=100,
            (),
          ),
        );

      _clearBlobData(.);
      _buildFakeBlob(.);

      TestTool.closeContractCheck();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load", () => {
      let _buildFakeRequestAnimationFrame = [%raw
        (unsafeGetStateFunc, setStateFunc, runWithDefaultTimeFunc) => {|
            window.requestAnimationFrame = function(func){
setStateFunc(runWithDefaultTimeFunc(unsafeGetStateFunc()));
            };
            |}
      ];

      // let LoadStreamWDBTool.buildChunkData = (~arrayBuffer, ~done_=false, ()) =>
      //   {
      //     "done": done_,
      //     "value":
      //       switch (arrayBuffer) {
      //       | Some(arrayBuffer) => arrayBuffer |> Uint8Array.fromBuffer
      //       | None => Obj.magic(-1)
      //       },
      //   }
      //   |> resolve;

      // let LoadStreamWDBTool.getDefault11Image = () =>
      //   TextureTool.buildSource(~name="default", ());

      // let LoadStreamWDBTool.prepareWithReadStub = (sandbox, readStub, state) => {
      //   let default11Image = LoadStreamWDBTool.getDefault11Image();

      //   StateAPI.setState(state) |> ignore;

      //   let handleBeforeStartLoop = (state, rootGameObject) => {
      //     let (state, _, _) = DirectionLightTool.createGameObject(state);
      //     let (state, _, _, _) = CameraTool.createCameraGameObject(state);

      //     state;
      //   };

      //   let handleWhenDoneFunc = (state, rootGameObject) => state;

      //   (
      //     default11Image,
      //     readStub,
      //     handleBeforeStartLoop,
      //     handleWhenDoneFunc,
      //     state,
      //   );
      // };

      let _prepare = (sandbox, wdbArrayBuffer, state) => {
        let readStub = createEmptyStubWithJsObjSandbox(sandbox);
        let readStub =
          readStub
          |> onCall(0)
          |> returns(
               LoadStreamWDBTool.buildChunkData(
                 ~arrayBuffer=wdbArrayBuffer->Some,
                 (),
               ),
             )
          |> onCall(1)
          |> returns(
               LoadStreamWDBTool.buildChunkData(
                 ~arrayBuffer=None,
                 ~done_=true,
                 (),
               ),
             );

        LoadStreamWDBTool.prepareWithReadStub(sandbox, readStub, state);
      };

      let _getBoxTexturedMeshGameObject = (rootGameObject, state) =>
        Array.unsafe_get(
          GameObjectTool.getChildren(rootGameObject, state),
          0,
        );

      let _getAllGeometryData = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state);

      let _getAllGeometrys = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllGameObjects(rootGameObject, state)
        |> Js.Array.filter(gameObject =>
             GameObjectAPI.hasGameObjectGeometryComponent(gameObject, state)
           )
        |> Js.Array.map(gameObject =>
             GameObjectAPI.unsafeGetGameObjectGeometryComponent(
               gameObject,
               state,
             )
           );

      let _getAllLightMaterials = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllLightMaterials(rootGameObject, state);

      let _getAllDiffuseMaps = (rootGameObject, state) =>
        AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state);

      let _getAllDiffuseMapSources = LoadStreamWDBTool.getAllDiffuseMapSources;

      beforeEach(() => {
        GLBTool.prepare(sandbox^);

        _buildFakeRequestAnimationFrame(
          StateAPI.unsafeGetState,
          StateAPI.setState,
          DirectorTool.runWithDefaultTime,
        );
      });

      describe("trigger handleWhenLoadingFunc", () => {
        let _prepare = (sandbox, state) => {
          let readStub = createEmptyStubWithJsObjSandbox(sandbox);
          let readStub =
            readStub
            |> onCall(0)
            |> returns(
                 LoadStreamWDBTool.buildChunkData(
                   ~arrayBuffer=
                     (
                       boxTexturedWDBArrayBuffer^
                       |> ArrayBuffer.slice(~start=0, ~end_=1000)
                     )
                     ->Some,
                   (),
                 ),
               )
            |> onCall(1)
            |> returns(
                 LoadStreamWDBTool.buildChunkData(
                   ~arrayBuffer=
                     (
                       boxTexturedWDBArrayBuffer^
                       |> ArrayBuffer.sliceFrom(1000)
                     )
                     ->Some,
                   (),
                 ),
               )
            |> onCall(2)
            |> returns(
                 LoadStreamWDBTool.buildChunkData(
                   ~arrayBuffer=None,
                   ~done_=true,
                   (),
                 ),
               );

          LoadStreamWDBTool.prepareWithReadStub(sandbox, readStub, state);
        };

        testPromise("trigger when load each chunk data", () => {
          let totalLoadedByteLengthArr = [||];
          let contentLengthArr = [||];
          let wdbPathArr = [||];

          let (contentLength, wdbPath, handleWhenLoadingFunc) = (
            1,
            "./BoxTextured.wdb",
            (totalLoadedByteLength, contentLength, wdbPath) => {
              totalLoadedByteLengthArr
              |> ArrayService.push(totalLoadedByteLength)
              |> ignore;
              contentLengthArr |> ArrayService.push(contentLength) |> ignore;
              wdbPathArr |> ArrayService.push(wdbPath) |> ignore;
            },
          );
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (
            default11Image,
            readStub,
            handleBeforeStartLoop,
            handleWhenDoneFunc,
            state,
          ) =
            _prepare(sandbox, state);

          LoadStreamWDBTool.readWithHandleWhenLoadingFunc(
            (
              default11Image,
              LoadStreamWDBTool.buildController(sandbox),
              (contentLength, wdbPath, handleWhenLoadingFunc),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            LoadStreamWDBTool.buildReader(readStub),
          )
          |> then_(() =>
               (totalLoadedByteLengthArr, contentLengthArr, wdbPathArr)
               |> expect
               == (
                    [|1000, 25092|],
                    [|contentLength, contentLength|],
                    [|"./BoxTextured.wdb", "./BoxTextured.wdb"|],
                  )
               |> resolve
             );
        });
      });

      describe("test before start loop", () =>
        describe("set default source to all textures", () => {
          let _testSetDefaultSource =
              (sandbox, wdbArrayBuffer, getTextureSourceArrFunc, state) => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, _, handleWhenDoneFunc, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let sourcesBeforeStartLoop = ref([||]);
            let handleBeforeStartLoop = (state, rootGameObject) => {
              sourcesBeforeStartLoop :=
                getTextureSourceArrFunc(rootGameObject, state);

              let (state, _, _) = DirectionLightTool.createGameObject(state);
              let (state, _, _, _) =
                CameraTool.createCameraGameObject(state);

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                LoadStreamWDBTool.buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              LoadStreamWDBTool.buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 sourcesBeforeStartLoop^
                 |> expect
                 == (
                      ArrayTool.range(
                        0,
                        Js.Array.length(sourcesBeforeStartLoop^) - 1,
                      )
                      |> Js.Array.map(_ => default11Image)
                    )
                 |> resolve;
               });
          };

          describe("set default source to all basicSourceTextures", () => {
            let _testSetDefaultSource = (sandbox, wdbArrayBuffer, state) =>
              _testSetDefaultSource(
                sandbox,
                wdbArrayBuffer,
                _getAllDiffuseMapSources,
                state,
              );

            testPromise("test BoxTextured wdb", () =>
              _testSetDefaultSource(sandbox, boxTexturedWDBArrayBuffer, state)
            );

            describe("test CesiumMilkTruck wdb", () => {
              beforeEach(() => {
                state :=
                  RenderJobsTool.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(
                    sandbox,
                    LoopRenderJobTool.buildNoWorkerJobConfig(),
                    SettingTool.buildBufferConfigStr(
                      ~geometryPointCount=30000,
                      ~geometryCount=10,
                      (),
                    ),
                  );

                TestTool.closeContractCheck();
              });

              testPromise("test", () =>
                _testSetDefaultSource(
                  sandbox,
                  cesiumMilkTruckWDBArrayBuffer,
                  state,
                )
              );
            });

            testPromise("test AlphaBlendModeTest wdb", () =>
              _testSetDefaultSource(
                sandbox,
                alphaBlendModeTestWDBArrayBuffer,
                state,
              )
            );

            testPromise("test SuperLowPolyStove wdb", () =>
              _testSetDefaultSource(sandbox, stoveWDBArrayBuffer, state)
            );
          });

          describe("set default source to all cubemapTextures", () => {
            let _testSetDefaultSource = (sandbox, wdbArrayBuffer, state) =>
              _testSetDefaultSource(
                sandbox,
                wdbArrayBuffer,
                LoadStreamWDBTool.getSkyboxCubemapSourceArr,
                state,
              );

            beforeAll(() =>
              skyboxWDBArrayBuffer :=
                WDBTool.generateWDB(state => {
                  let rootGameObject = SceneAPI.getSceneGameObject(state);

                  let (state, cubemapTexture) =
                    SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

                  (state, rootGameObject);
                })
            );

            testPromise("test skybox wdb", () =>
              _testSetDefaultSource(sandbox, skyboxWDBArrayBuffer, state)
            );
          });
        })
      );

      describe("test load all data in first chunk", () => {
        let _testAddGeometryComponents =
            (
              sandbox,
              wdbArrayBuffer,
              (resultGeometrysBeforeStartLoop, resultGeometrysWhenDone),
              state,
            ) => {
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (default11Image, readStub, _, _, state) =
            _prepare(sandbox, wdbArrayBuffer^, state);
          let geometrysBeforeStartLoop = ref([||]);
          let geometrysWhenDone = ref([||]);
          let handleBeforeStartLoop = (state, rootGameObject) => {
            geometrysBeforeStartLoop :=
              _getAllGeometrys(rootGameObject, state);

            let (state, _, _) = DirectionLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);

            state;
          };
          let handleWhenDoneFunc = (state, rootGameObject) => {
            geometrysWhenDone := _getAllGeometrys(rootGameObject, state);

            state;
          };

          LoadStreamWDBTool.read(
            (
              default11Image,
              LoadStreamWDBTool.buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            LoadStreamWDBTool.buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let state = DirectorTool.runWithDefaultTime(state);

               (geometrysBeforeStartLoop^, geometrysWhenDone^)
               |> expect
               == (resultGeometrysBeforeStartLoop, resultGeometrysWhenDone)
               |> resolve;
             });
        };

        let _testLoadBlobImage =
            (
              sandbox,
              wdbArrayBuffer,
              (resultBlobData, resultSourcesWhenDone),
              getTextureSourceArrFunc,
              state,
            ) => {
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (default11Image, readStub, handleBeforeStartLoop, _, state) =
            _prepare(sandbox, wdbArrayBuffer^, state);
          let sourcesWhenDone = ref(Obj.magic([||]));
          let handleWhenDoneFunc = (state, rootGameObject) => {
            sourcesWhenDone := getTextureSourceArrFunc(rootGameObject, state);

            let (state, _, _) = DirectionLightTool.createGameObject(state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);

            state;
          };

          LoadStreamWDBTool.read(
            (
              default11Image,
              LoadStreamWDBTool.buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            LoadStreamWDBTool.buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let state = DirectorTool.runWithDefaultTime(state);

               let blobData = _getBlobData(.);

               let (arrayBuffer, param) = Array.unsafe_get(blobData, 0);

               (
                 blobData
                 |> Js.Array.map(((arrayBuffer, param)) =>
                      (arrayBuffer |> ArrayBuffer.byteLength, param)
                    ),
                 sourcesWhenDone^,
               )
               |> expect == (resultBlobData, resultSourcesWhenDone)
               |> resolve;
             });
        };

        let _testDraw = (sandbox, wdbArrayBuffer, drawCount, state) => {
          let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state^
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~drawElements, ()),
               );
          let (
            default11Image,
            readStub,
            handleBeforeStartLoop,
            handleWhenDoneFunc,
            state,
          ) =
            _prepare(sandbox, wdbArrayBuffer^, state);

          LoadStreamWDBTool.read(
            (
              default11Image,
              LoadStreamWDBTool.buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            LoadStreamWDBTool.buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let drawElementsCallCount = drawElements |> getCallCount;

               let state = DirectorTool.runWithDefaultTime(state);

               (drawElements |> getCallCount)
               - drawElementsCallCount
               |> expect == drawCount
               |> resolve;
             });
        };

        describe("test skybox wdb", () => {
          let _testLoadBlobImage =
              (
                sandbox,
                wdbArrayBuffer,
                (resultBlobData, resultSourcesWhenDone),
                state,
              ) =>
            _testLoadBlobImage(
              sandbox,
              wdbArrayBuffer,
              (resultBlobData, resultSourcesWhenDone),
              LoadStreamWDBTool.getSkyboxCubemapSourceArr,
              state,
            );

          beforeEach(() => {
            state := LoadStreamWDBTool.prepareStateForSkybox(sandbox);

            TestTool.closeContractCheck();
          });

          beforeAll(() =>
            skyboxWDBArrayBuffer :=
              WDBTool.generateWDB(state => {
                let rootGameObject = SceneAPI.getSceneGameObject(state);

                let (state, cubemapTexture) =
                  SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

                (state, rootGameObject);
              })
          );

          testPromise("load blob image and set it to be source", () =>
            _testLoadBlobImage(
              sandbox,
              skyboxWDBArrayBuffer,
              (
                [|
                  (227, {"type": "image/png"}),
                  (167, {"type": "image/png"}),
                  (145, {"type": "image/png"}),
                  (143, {"type": "image/png"}),
                  (161, {"type": "image/png"}),
                  (151, {"type": "image/jpeg"}),
                |],
                [|
                  GLBTool.createFakeImage(~name="i1", ~src="object_url0", ()),
                  GLBTool.createFakeImage(~name="i2", ~src="object_url1", ()),
                  GLBTool.createFakeImage(~name="i3", ~src="object_url2", ()),
                  GLBTool.createFakeImage(~name="i4", ~src="object_url3", ()),
                  GLBTool.createFakeImage(~name="i5", ~src="object_url4", ()),
                  GLBTool.createFakeImage(~name="i6", ~src="object_url5", ()),
                |],
              ),
              state,
            )
          );
          testPromise("draw the gameObject", () =>
            _testDraw(sandbox, skyboxWDBArrayBuffer, 1, state)
          );
          testPromise("mark skybox->cubemap texture need update", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, handleBeforeStartLoop, _, state) =
              _prepare(sandbox, skyboxWDBArrayBuffer^, state);
            let handleWhenDoneFunc = (state, rootGameObject) => state;

            LoadStreamWDBTool.read(
              (
                default11Image,
                LoadStreamWDBTool.buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              LoadStreamWDBTool.buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 CubemapTextureTool.getIsNeedUpdate(
                   SceneTool.unsafeGetCubemapTexture(state),
                   state,
                 )
                 |> expect == true
                 |> resolve;
               });
          });
        });

        describe("test glb->wdb", () => {
          let _testLoadBlobImage =
              (
                sandbox,
                wdbArrayBuffer,
                (resultBlobData, resultSourcesWhenDone),
                state,
              ) =>
            _testLoadBlobImage(
              sandbox,
              wdbArrayBuffer,
              (resultBlobData, resultSourcesWhenDone),
              _getAllDiffuseMapSources,
              state,
            );

          describe("test BoxTextured wdb", () => {
            testPromise("add geometry component", () =>
              _testAddGeometryComponents(
                sandbox,
                boxTexturedWDBArrayBuffer,
                ([||], [|0|]),
                state,
              )
            );
            testPromise("test set geometry point data", () => {
              let array_buffer = 1;
              let element_array_buffer = 2;
              let static_draw = 3;
              let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state^
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~array_buffer,
                       ~element_array_buffer,
                       ~static_draw,
                       ~bufferData,
                       (),
                     ),
                   );
              let (default11Image, readStub, handleBeforeStartLoop, _, state) =
                _prepare(sandbox, boxTexturedWDBArrayBuffer^, state);
              let geometryWhenDone = ref(-1);
              let handleWhenDoneFunc = (state, rootGameObject) => {
                geometryWhenDone :=
                  GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                    _getBoxTexturedMeshGameObject(rootGameObject, state),
                    state,
                  );

                state;
              };

              LoadStreamWDBTool.read(
                (
                  default11Image,
                  LoadStreamWDBTool.buildController(sandbox),
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                ),
                LoadStreamWDBTool.buildReader(readStub),
              )
              |> then_(() => {
                   let state = StateAPI.unsafeGetState();

                   let state = DirectorTool.runWithDefaultTime(state);

                   let geometry = geometryWhenDone^;

                   let vertices =
                     GeometryAPI.getGeometryVertices(geometry, state);
                   let normals =
                     GeometryAPI.getGeometryNormals(geometry, state);
                   let texCoords =
                     GeometryAPI.getGeometryTexCoords(geometry, state);
                   let indices =
                     GeometryAPI.getGeometryIndices16(geometry, state);

                   (
                     (vertices, normals, texCoords, indices->Some, None),
                     (
                       bufferData
                       |> withThreeArgs(array_buffer, vertices, static_draw)
                       |> getCallCount,
                       bufferData
                       |> withThreeArgs(array_buffer, normals, static_draw)
                       |> getCallCount,
                       bufferData
                       |> withThreeArgs(array_buffer, texCoords, static_draw)
                       |> getCallCount,
                       bufferData
                       |> withThreeArgs(
                            element_array_buffer,
                            indices,
                            static_draw,
                          )
                       |> getCallCount,
                     ),
                   )
                   |> expect
                   == (GLTFTool.getBoxTexturedGeometryData(), (1, 1, 1, 1))
                   |> resolve;
                 });
            });
            testPromise("load blob image and set it to be source", () =>
              _testLoadBlobImage(
                sandbox,
                boxTexturedWDBArrayBuffer,
                (
                  [|(23516, {"type": "image/png"})|],
                  [|
                    GLBTool.createFakeImage(
                      ~name="CesiumLogoFlat.png",
                      ~src="object_url0",
                      (),
                    ),
                  |],
                ),
                state,
              )
            );
            testPromise("draw the gameObject", () =>
              _testDraw(sandbox, boxTexturedWDBArrayBuffer, 1, state)
            );
          });

          describe("test CesiumMilkTruck wdb", () => {
            beforeEach(() => {
              state :=
                RenderJobsTool.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(
                  sandbox,
                  LoopRenderJobTool.buildNoWorkerJobConfig(),
                  SettingTool.buildBufferConfigStr(
                    ~geometryPointCount=30000,
                    ~geometryCount=10,
                    (),
                  ),
                );

              TestTool.closeContractCheck();
            });

            testPromise("add geometry component", () =>
              _testAddGeometryComponents(
                sandbox,
                cesiumMilkTruckWDBArrayBuffer,
                ([||], [|1, 2, 3, 0, 0|]),
                state,
              )
            );
            testPromise("test set geometry point data", () => {
              let state =
                state^
                |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
              let (default11Image, readStub, handleBeforeStartLoop, _, state) =
                _prepare(sandbox, cesiumMilkTruckWDBArrayBuffer^, state);
              let rootGameObjectWhenDone = ref(-1);
              let handleWhenDoneFunc = (state, rootGameObject) => {
                rootGameObjectWhenDone := rootGameObject;

                state;
              };

              LoadStreamWDBTool.read(
                (
                  default11Image,
                  LoadStreamWDBTool.buildController(sandbox),
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                ),
                LoadStreamWDBTool.buildReader(readStub),
              )
              |> then_(() => {
                   let state = StateAPI.unsafeGetState();

                   let state = DirectorTool.runWithDefaultTime(state);

                   let dataArr =
                     _getAllGeometryData(rootGameObjectWhenDone^, state);

                   let dataMap = GLTFTool.getTruckGeometryData();

                   dataArr
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
                      |]
                   |> resolve;
                 });
            });
            testPromise("load blob image and set it to be source", () =>
              _testLoadBlobImage(
                sandbox,
                cesiumMilkTruckWDBArrayBuffer,
                (
                  [|(427633, {"type": "image/png"})|],
                  [|
                    GLBTool.createFakeImage(
                      ~name="image_0",
                      ~src="object_url0",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_0",
                      ~src="object_url0",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_0",
                      ~src="object_url0",
                      (),
                    ),
                  |],
                ),
                state,
              )
            );
            testPromise("draw the gameObject", () =>
              _testDraw(sandbox, cesiumMilkTruckWDBArrayBuffer, 5, state)
            );
          });

          describe("test AlphaBlendModeTest wdb", () => {
            testPromise("add geometry component", () =>
              _testAddGeometryComponents(
                sandbox,
                alphaBlendModeTestWDBArrayBuffer,
                ([||], [|4, 7, 5, 1, 8, 0, 3, 6, 2|]),
                state,
              )
            );
            testPromise("test set geometry point data", () => {
              let state =
                state^
                |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
              let (default11Image, readStub, handleBeforeStartLoop, _, state) =
                _prepare(sandbox, alphaBlendModeTestWDBArrayBuffer^, state);
              let rootGameObjectWhenDone = ref(-1);
              let handleWhenDoneFunc = (state, rootGameObject) => {
                rootGameObjectWhenDone := rootGameObject;

                state;
              };

              LoadStreamWDBTool.read(
                (
                  default11Image,
                  LoadStreamWDBTool.buildController(sandbox),
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                ),
                LoadStreamWDBTool.buildReader(readStub),
              )
              |> then_(() => {
                   let state = StateAPI.unsafeGetState();

                   let state = DirectorTool.runWithDefaultTime(state);

                   let dataArr =
                     _getAllGeometryData(rootGameObjectWhenDone^, state);

                   let dataMap = GLTFTool.getAlphaBlendModeTestGeometryData();

                   (dataArr |> Js.Array.length, dataArr[1])
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
                      )
                   |> resolve;
                 });
            });
            testPromise("load blob image and set it to be source", () =>
              _testLoadBlobImage(
                sandbox,
                alphaBlendModeTestWDBArrayBuffer,
                (
                  [|
                    (702714, {"type": "image/jpeg"}),
                    (65522, {"type": "image/png"}),
                  |],
                  [|
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_3",
                      ~src="object_url1",
                      (),
                    ),
                    GLBTool.createFakeImage(
                      ~name="image_2",
                      ~src="object_url0",
                      (),
                    ),
                  |],
                ),
                state,
              )
            );
            testPromise("draw the gameObject", () =>
              _testDraw(sandbox, alphaBlendModeTestWDBArrayBuffer, 9, state)
            );
          });

          describe("test SuperLowPolyStove wdb", () => {
            testPromise("add geometry component", () =>
              _testAddGeometryComponents(
                sandbox,
                stoveWDBArrayBuffer,
                ([||], [|0, 1|]),
                state,
              )
            );
            testPromise("test set geometry point data", () => {
              let state =
                state^
                |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
              let (default11Image, readStub, handleBeforeStartLoop, _, state) =
                _prepare(sandbox, stoveWDBArrayBuffer^, state);
              let rootGameObjectWhenDone = ref(-1);
              let handleWhenDoneFunc = (state, rootGameObject) => {
                rootGameObjectWhenDone := rootGameObject;

                state;
              };

              LoadStreamWDBTool.read(
                (
                  default11Image,
                  LoadStreamWDBTool.buildController(sandbox),
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                ),
                LoadStreamWDBTool.buildReader(readStub),
              )
              |> then_(() => {
                   let state = StateAPI.unsafeGetState();

                   let state = DirectorTool.runWithDefaultTime(state);

                   let dataArr =
                     _getAllGeometryData(rootGameObjectWhenDone^, state);

                   let dataMap = GLTFTool.getSuperLowPolyStoveGeometryData();

                   (dataArr |> Js.Array.length, dataArr[1])
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
                      )
                   |> resolve;
                 });
            });
            testPromise("draw the gameObject", () =>
              _testDraw(sandbox, stoveWDBArrayBuffer, 2, state)
            );
          });
        });
      });

      describe("test load in multiple chunks", () => {
        describe(
          "test skybox and one gameObject with map(basic source texture) wdb",
          () =>
          describe(
            {|
            load blob image;
            set it to be source;
            |},
            () => {
              let _testLoadBlobImage =
                  (
                    sandbox,
                    (resultBlobData, resultSourcesWhenDone),
                    prepareFunc,
                    state,
                  ) => {
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let (
                  default11Image,
                  readStub,
                  handleBeforeStartLoop,
                  _,
                  state,
                ) =
                  prepareFunc(sandbox, state);
                let sourcesWhenDone = ref([||]);

                let handleWhenDoneFunc = (state, rootGameObject) => {
                  sourcesWhenDone :=
                    LoadStreamWDBTool.getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr(
                      rootGameObject,
                      state,
                    );

                  let (state, _, _) =
                    DirectionLightTool.createGameObject(state);
                  let (state, _, _, _) =
                    CameraTool.createCameraGameObject(state);

                  state;
                };

                LoadStreamWDBTool.read(
                  (
                    default11Image,
                    LoadStreamWDBTool.buildController(sandbox),
                    handleBeforeStartLoop,
                    handleWhenDoneFunc,
                  ),
                  LoadStreamWDBTool.buildReader(readStub),
                )
                |> then_(() => {
                     let state = StateAPI.unsafeGetState();

                     let state = DirectorTool.runWithDefaultTime(state);

                     let blobData = _getBlobData(.);

                     let (arrayBuffer, param) =
                       Array.unsafe_get(blobData, 0);

                     (
                       blobData
                       |> Js.Array.map(((arrayBuffer, param)) =>
                            (arrayBuffer |> ArrayBuffer.byteLength, param)
                          ),
                       sourcesWhenDone^,
                     )
                     |> expect == (resultBlobData, resultSourcesWhenDone)
                     |> resolve;
                   });
              };

              beforeEach(() => {
                state := LoadStreamWDBTool.prepareStateForSkybox(sandbox);

                TestTool.closeContractCheck();
              });

              beforeAll(() =>
                skyboxWDBArrayBuffer :=
                  WDBTool.generateWDB(state => {
                    let rootGameObject = SceneAPI.getSceneGameObject(state);

                    let (state, cubemapTexture) =
                      SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

                    let sceneGameObjectTransform =
                      GameObjectAPI.unsafeGetGameObjectTransformComponent(
                        rootGameObject,
                        state,
                      );

                    let (state, gameObject1, transform1) =
                      LoadStreamWDBTool.createGameObjectWithDiffuseMap(state);

                    let state =
                      state
                      |> TransformAPI.setTransformParent(
                           Js.Nullable.return(sceneGameObjectTransform),
                           transform1,
                         );

                    (state, rootGameObject);
                  })
              );

              describe(
                {|
            chunk1: header + json + stream + stream_chunk1-stream_chunk4
            chunk2: stream_chunk5->stream_chunk11 + a part of stream_chunk12(all are image chunks)
            chunk3: other stream_chunk12(basic source texture image chunk)
            done
            |},
                () => {
                  let _prepare = (sandbox, state) => {
                    let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                    let readStub =
                      readStub
                      |> onCall(0)
                      |> returns(
                           LoadStreamWDBTool.buildChunkData(
                             ~arrayBuffer=
                               (
                                 skyboxWDBArrayBuffer^
                                 |> ArrayBuffer.slice(
                                      ~start=0,
                                      ~end_=948 + 124 + 840,
                                    )
                               )
                               ->Some,
                             (),
                           ),
                         )
                      |> onCall(1)
                      |> returns(
                           LoadStreamWDBTool.buildChunkData(
                             ~arrayBuffer=
                               (
                                 cesiumMilkTruckWDBArrayBuffer^
                                 |> ArrayBuffer.slice(
                                      ~start=948 + 124 + 840,
                                      ~end_=948 + 124 + 1855,
                                    )
                               )
                               ->Some,
                             (),
                           ),
                         )
                      |> onCall(2)
                      |> returns(
                           LoadStreamWDBTool.buildChunkData(
                             ~arrayBuffer=
                               (
                                 skyboxWDBArrayBuffer^
                                 |> ArrayBuffer.sliceFrom(948 + 124 + 1855)
                               )
                               ->Some,
                             (),
                           ),
                         )
                      |> onCall(3)
                      |> returns(
                           LoadStreamWDBTool.buildChunkData(
                             ~arrayBuffer=None,
                             ~done_=true,
                             (),
                           ),
                         );

                    LoadStreamWDBTool.prepareWithReadStub(
                      sandbox,
                      readStub,
                      state,
                    );
                  };

                  testPromise("test", () =>
                    _testLoadBlobImage(
                      sandbox,
                      (
                        [|
                          (227, {"type": "image/png"}),
                          (167, {"type": "image/png"}),
                          (145, {"type": "image/png"}),
                          (143, {"type": "image/png"}),
                          (161, {"type": "image/png"}),
                          (151, {"type": "image/jpeg"}),
                          (129, {"type": "image/png"}),
                        |],
                        [|
                          GLBTool.createFakeImage(
                            ~name="i1",
                            ~src="object_url1",
                            (),
                          ),
                          GLBTool.createFakeImage(
                            ~name="i2",
                            ~src="object_url2",
                            (),
                          ),
                          GLBTool.createFakeImage(
                            ~name="i3",
                            ~src="object_url3",
                            (),
                          ),
                          GLBTool.createFakeImage(
                            ~name="i4",
                            ~src="object_url4",
                            (),
                          ),
                          GLBTool.createFakeImage(
                            ~name="i5",
                            ~src="object_url5",
                            (),
                          ),
                          GLBTool.createFakeImage(
                            ~name="i6",
                            ~src="object_url6",
                            (),
                          ),
                          GLBTool.createFakeImage(
                            ~name="image_0",
                            ~src="object_url0",
                            (),
                          ),
                        |],
                      ),
                      _prepare,
                      state,
                    )
                  );
                },
              );
            },
          )
        );

        describe("test CesiumMilkTruck wdb", () => {
          let _testSetGeometryPointData =
              (sandbox, dataCount, prepareFunc, state) => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (
              default11Image,
              readStub,
              handleBeforeStartLoop,
              handleWhenDoneFunc,
              state,
            ) =
              prepareFunc(sandbox, state);
            let rootGameObjectWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              rootGameObjectWhenDone := rootGameObject;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                LoadStreamWDBTool.buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              LoadStreamWDBTool.buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let dataArr =
                   _getAllGeometryData(rootGameObjectWhenDone^, state);

                 dataArr |> Js.Array.length |> expect == dataCount |> resolve;
               });
          };

          beforeEach(() => {
            state :=
              RenderJobsTool.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(
                sandbox,
                LoopRenderJobTool.buildNoWorkerJobConfig(),
                SettingTool.buildBufferConfigStr(
                  ~geometryPointCount=30000,
                  ~geometryCount=10,
                  (),
                ),
              );

            TestTool.closeContractCheck();
          });

          describe(
            {|
            1.chunk1: header + json + stream + stream_chunk1-stream_chunk4 + a part of stream_chunk5(image chunk)
            2.chunk2: a part of stream_chunk5(image chunk)
            3.chunk3: other stream_chunk5 + stream_chunk6 + a part of stream_chunk7
            4.chunk4: other stream chunk data
            5.done
            |},
            () => {
              let _testLoadBlobImage =
                  (
                    sandbox,
                    (
                      blobDataLength,
                      /* arrayBufferByteLength,
                         resultParam, */
                      resultSourcesWhenDone,
                    ),
                    prepareFunc,
                    state,
                  ) => {
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let (
                  default11Image,
                  readStub,
                  handleBeforeStartLoop,
                  _,
                  state,
                ) =
                  prepareFunc(sandbox, state);
                let sourcesWhenDone = ref([||]);

                let handleWhenDoneFunc = (state, rootGameObject) => {
                  sourcesWhenDone :=
                    _getAllDiffuseMapSources(rootGameObject, state);

                  GameObjectAPI.hasGameObjectGeometryComponent(
                    _getBoxTexturedMeshGameObject(rootGameObject, state),
                    state,
                  );

                  let (state, _, _) =
                    DirectionLightTool.createGameObject(state);
                  let (state, _, _, _) =
                    CameraTool.createCameraGameObject(state);

                  state;
                };

                LoadStreamWDBTool.read(
                  (
                    default11Image,
                    LoadStreamWDBTool.buildController(sandbox),
                    handleBeforeStartLoop,
                    handleWhenDoneFunc,
                  ),
                  LoadStreamWDBTool.buildReader(readStub),
                )
                |> then_(() => {
                     let state = StateAPI.unsafeGetState();

                     let state = DirectorTool.runWithDefaultTime(state);

                     let blobData = _getBlobData(.) |> Js.toOption;

                     /* let (arrayBuffer, param) =
                        Array.unsafe_get(blobData, 0); */

                     (
                       switch (blobData) {
                       | None => 0
                       | Some(blobData) => blobData |> Js.Array.length
                       },
                       /* arrayBuffer |> ArrayBuffer.byteLength,
                          param, */
                       sourcesWhenDone^,
                     )
                     |> expect
                     == (
                          blobDataLength,
                          /* arrayBufferByteLength,
                             resultParam, */
                          resultSourcesWhenDone,
                        )
                     |> resolve;
                   });
              };

              describe("test 1,5", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 2, _prepare, state)
                );
                testPromise("not load blob image", () =>
                  _testLoadBlobImage(
                    sandbox,
                    (
                      0,
                      [|
                        LoadStreamWDBTool.getDefault11Image(),
                        LoadStreamWDBTool.getDefault11Image(),
                        LoadStreamWDBTool.getDefault11Image(),
                      |],
                    ),
                    _prepare,
                    state,
                  )
                );
              });

              describe("test 1,2,5", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=32768, ~end_=40000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("not set new geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 2, _prepare, state)
                );
                testPromise("not load blob image", () =>
                  _testLoadBlobImage(
                    sandbox,
                    (
                      0,
                      [|
                        LoadStreamWDBTool.getDefault11Image(),
                        LoadStreamWDBTool.getDefault11Image(),
                        LoadStreamWDBTool.getDefault11Image(),
                      |],
                    ),
                    _prepare,
                    state,
                  )
                );
              });

              describe("test 1,2,3,5", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=32768, ~end_=40000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               /* |> ArrayBuffer.slice(~start=40000, ~end_=80000) */
                               |> ArrayBuffer.slice(
                                    ~start=40000,
                                    ~end_=470000,
                                  )
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("not set new geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 2, _prepare, state)
                );
                testPromise(
                  {|
                     load blob image;
                     set it to be source;
                     |},
                  () =>
                  _testLoadBlobImage(
                    sandbox,
                    (
                      1,
                      [|
                        GLBTool.createFakeImage(
                          ~name="image_0",
                          ~src="object_url0",
                          (),
                        ),
                        GLBTool.createFakeImage(
                          ~name="image_0",
                          ~src="object_url0",
                          (),
                        ),
                        GLBTool.createFakeImage(
                          ~name="image_0",
                          ~src="object_url0",
                          (),
                        ),
                      |],
                    ),
                    _prepare,
                    state,
                  )
                );
              });

              describe("test 1,2,3,4,5", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=32768)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=32768, ~end_=40000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=40000, ~end_=80000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.sliceFrom(80000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("set new geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 5, _prepare, state)
                );
                testPromise(
                  {|
                     load blob image;
                     set it to be source;
                     |},
                  () =>
                  _testLoadBlobImage(
                    sandbox,
                    (
                      1,
                      [|
                        GLBTool.createFakeImage(
                          ~name="image_0",
                          ~src="object_url0",
                          (),
                        ),
                        GLBTool.createFakeImage(
                          ~name="image_0",
                          ~src="object_url0",
                          (),
                        ),
                        GLBTool.createFakeImage(
                          ~name="image_0",
                          ~src="object_url0",
                          (),
                        ),
                      |],
                    ),
                    _prepare,
                    state,
                  )
                );
              });
            },
          );

          describe(
            {|
            1.chunk1: header + a part of json
            2.chunk2: other json + a part of stream
            3.chunk3: other stream + a part of stream_chunk1
            4.chunk4: other stream_chunk1 + stream_chunk2
            5.chunk5: stream_chunk3-stream_chunk5 + a part of stream_chunk6
            6.chunk6: other stream_chunk6 + stream_chunkk7-stream_chunk10 + a part of stream_chunk11
            7.chunk7: other stream chunk data
            8.done
            |},
            () => {
              let _testContractError = (sandbox, prepareFunc, state) => {
                TestTool.openContractCheck();
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let (
                  default11Image,
                  readStub,
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                  state,
                ) =
                  prepareFunc(sandbox, state);
                let rootGameObjectWhenDone = ref(-1);
                let handleWhenDoneFunc = (state, rootGameObject) => {
                  rootGameObjectWhenDone := rootGameObject;

                  state;
                };

                PromiseTool.judgeErrorMessage(
                  "expect load all data",
                  LoadStreamWDBTool.read(
                    (
                      default11Image,
                      LoadStreamWDBTool.buildController(sandbox),
                      handleBeforeStartLoop,
                      handleWhenDoneFunc,
                    ),
                    LoadStreamWDBTool.buildReader(readStub),
                  ),
                );
              };

              let _testNotSendAttributeData = (sandbox, prepareFunc, state) => {
                let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~bufferData, ()),
                     );
                let (
                  default11Image,
                  readStub,
                  handleBeforeStartLoop,
                  handleWhenDoneFunc,
                  state,
                ) =
                  prepareFunc(sandbox, state);

                LoadStreamWDBTool.read(
                  (
                    default11Image,
                    LoadStreamWDBTool.buildController(sandbox),
                    handleBeforeStartLoop,
                    handleWhenDoneFunc,
                  ),
                  LoadStreamWDBTool.buildReader(readStub),
                )
                |> then_(() =>
                     bufferData |> getCallCount |> expect == 0 |> resolve
                   );
              };

              describe("test 1,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("contract error", () =>
                  _testContractError(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("contract error", () =>
                  _testContractError(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,3,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                describe("assemble and start loop", () => {
                  describe("send light data", () =>
                    testPromise("send u_ambient", () => {
                      let uniform3f =
                        createEmptyStubWithJsObjSandbox(sandbox);
                      let pos = 0;
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(
                          ~pos,
                          sandbox,
                          "u_ambient",
                        );
                      let state =
                        state^
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~uniform3f,
                               ~getUniformLocation,
                               (),
                             ),
                           );
                      let (
                        default11Image,
                        readStub,
                        handleBeforeStartLoop,
                        handleWhenDoneFunc,
                        state,
                      ) =
                        _prepare(sandbox, state);

                      LoadStreamWDBTool.read(
                        (
                          default11Image,
                          LoadStreamWDBTool.buildController(sandbox),
                          handleBeforeStartLoop,
                          handleWhenDoneFunc,
                        ),
                        LoadStreamWDBTool.buildReader(readStub),
                      )
                      |> then_(() =>
                           uniform3f
                           |> withFourArgs(pos |> Obj.magic, 0., 0., 0.)
                           |> getCallCount
                           |> expect == 2
                           |> resolve
                         );
                    })
                  );
                  describe("send camera data", () =>
                    testPromise("send u_vMatrix", () => {
                      let uniformMatrix4fv =
                        createEmptyStubWithJsObjSandbox(sandbox);
                      let pos = 0;
                      let getUniformLocation =
                        GLSLLocationTool.getUniformLocation(
                          ~pos,
                          sandbox,
                          "u_vMatrix",
                        );
                      let state =
                        state^
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~uniformMatrix4fv,
                               ~getUniformLocation,
                               (),
                             ),
                           );
                      let (
                        default11Image,
                        readStub,
                        handleBeforeStartLoop,
                        handleWhenDoneFunc,
                        state,
                      ) =
                        _prepare(sandbox, state);

                      LoadStreamWDBTool.read(
                        (
                          default11Image,
                          LoadStreamWDBTool.buildController(sandbox),
                          handleBeforeStartLoop,
                          handleWhenDoneFunc,
                        ),
                        LoadStreamWDBTool.buildReader(readStub),
                      )
                      |> then_(() =>
                           uniformMatrix4fv
                           |> withOneArg(pos)
                           |> getCallCount
                           |> expect == 2
                           |> resolve
                         );
                    })
                  );
                });

                testPromise("not set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 0, _prepare, state)
                );
                testPromise("not send attribute data", () =>
                  _testNotSendAttributeData(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,3,4,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("not set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 0, _prepare, state)
                );
                testPromise("not send attribute data", () =>
                  _testNotSendAttributeData(sandbox, _prepare, state)
                );
              });

              describe("test 1,2,3,4,5,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=10000, ~end_=50000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(5)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 2, _prepare, state)
                );
              });

              describe("test 1,2,3,4,5,6,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=10000, ~end_=50000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(5)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(
                                    ~start=50000,
                                    ~end_=523828,
                                  )
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(6)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 3, _prepare, state)
                );
              });

              describe("test 1,2,3,4,5,6,7,8", () => {
                let _prepare = (sandbox, state) => {
                  let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                  let readStub =
                    readStub
                    |> onCall(0)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=0, ~end_=300)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(1)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=300, ~end_=1650)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(2)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=1650, ~end_=3000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(3)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=3000, ~end_=10000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(4)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(~start=10000, ~end_=50000)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(5)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.slice(
                                    ~start=50000,
                                    ~end_=523828,
                                  )
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(6)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=
                             (
                               cesiumMilkTruckWDBArrayBuffer^
                               |> ArrayBuffer.sliceFrom(523828)
                             )
                             ->Some,
                           (),
                         ),
                       )
                    |> onCall(7)
                    |> returns(
                         LoadStreamWDBTool.buildChunkData(
                           ~arrayBuffer=None,
                           ~done_=true,
                           (),
                         ),
                       );

                  LoadStreamWDBTool.prepareWithReadStub(
                    sandbox,
                    readStub,
                    state,
                  );
                };

                testPromise("set geometry point data", () =>
                  _testSetGeometryPointData(sandbox, 5, _prepare, state)
                );
              });
            },
          );
        });

        describe("test AlphaBlendModeTest wdb", () => {
          let _testSetGeometryPointData =
              (sandbox, dataCount, prepareFunc, state) => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (
              default11Image,
              readStub,
              handleBeforeStartLoop,
              handleWhenDoneFunc,
              state,
            ) =
              prepareFunc(sandbox, state);
            let rootGameObjectWhenDone = ref(-1);
            let handleWhenDoneFunc = (state, rootGameObject) => {
              rootGameObjectWhenDone := rootGameObject;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                LoadStreamWDBTool.buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              LoadStreamWDBTool.buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 let dataArr =
                   _getAllGeometryData(rootGameObjectWhenDone^, state);

                 dataArr |> Js.Array.length |> expect == dataCount |> resolve;
               });
          };

          describe(
            {|
            1.chunk1: header + json + stream + stream_chunk1-stream_chunk4 + a part of stream_chunk5(image chunk)
            ...
            2.done
            |},
            () =>
            describe("test 1,2", () => {
              let _prepare = (sandbox, state) => {
                let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                let readStub =
                  readStub
                  |> onCall(0)
                  |> returns(
                       LoadStreamWDBTool.buildChunkData(
                         ~arrayBuffer=
                           (
                             alphaBlendModeTestWDBArrayBuffer^
                             |> ArrayBuffer.slice(~start=0, ~end_=65536)
                           )
                           ->Some,
                         (),
                       ),
                     )
                  /* |> onCall(1)
                     |> returns(
                          LoadStreamWDBTool.buildChunkData(
                            ~arrayBuffer=
                              alphaBlendModeTestWDBArrayBuffer^
                              |> ArrayBuffer.slice(~start=65536, ~end_=80000)
                              |. Some,
                            (),
                          ),
                        )
                     |> onCall(2)
                     |> returns(
                          LoadStreamWDBTool.buildChunkData(
                            ~arrayBuffer=
                              alphaBlendModeTestWDBArrayBuffer^
                              |> ArrayBuffer.slice(~start=80000, ~end_=100000)
                              |. Some,
                            (),
                          ),
                        ) */
                  |> onCall(1)
                  |> returns(
                       LoadStreamWDBTool.buildChunkData(
                         ~arrayBuffer=None,
                         ~done_=true,
                         (),
                       ),
                     );

                LoadStreamWDBTool.prepareWithReadStub(
                  sandbox,
                  readStub,
                  state,
                );
              };

              testPromise("set geometry point data", () =>
                _testSetGeometryPointData(sandbox, 1, _prepare, state)
              );
            })
          );
        });
      });

      describe("test set bin buffer chunk data", () =>
        describe("test set basic source texture->image data", () =>
          test("mark need update", () => {
            let image = Obj.magic(51);
            let basicSourceTextureArr = [|0, 1|];
            let state =
              basicSourceTextureArr
              |> WonderCommonlib.ArrayService.reduceOneParam(
                   (. state, basicSourceTexture) =>
                     BasicSourceTextureTool.setIsNeedUpdate(
                       basicSourceTexture,
                       false,
                       state,
                     ),
                   state^,
                 );

            let state =
              LoadStreamWDBTool.setImageData(
                ({imageIndex: 0, image}: StreamType.loadedStreamImageBlobData)
                ->Some,
                (
                  (
                    basicSourceTextureArr,
                    {textureIndices: [|0, 1|], imageIndices: [|0, 0|]}: WDType.imageTextureIndexData,
                  ),
                  (
                    [||],
                    {
                      cubemapTextureIndices: [||],
                      pxImageIndices: [||],
                      nxImageIndices: [||],
                      pyImageIndices: [||],
                      nyImageIndices: [||],
                      pzImageIndices: [||],
                      nzImageIndices: [||],
                    }: WDType.imageCubemapTextureIndexData,
                  ),
                ),
                state,
              );

            basicSourceTextureArr
            |> Js.Array.map(basicSourceTexture =>
                 BasicSourceTextureTool.getIsNeedUpdate(
                   basicSourceTexture,
                   state,
                 )
               )
            |> expect == [|true, true|];
          })
        )
      );

      describe("test imgui", () => {
        let imguiWDBArrayBuffer = ref(Obj.magic(-1));

        let _test = (sandbox, hasExecFunc, prepareFunc, state) => {
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (
            default11Image,
            readStub,
            handleBeforeStartLoop,
            handleWhenDoneFunc,
            state,
          ) =
            prepareFunc(sandbox, state);
          let rootGameObjectWhenDone = ref(-1);
          let handleWhenDoneFunc = (state, rootGameObject) => {
            rootGameObjectWhenDone := rootGameObject;

            state;
          };

          LoadStreamWDBTool.read(
            (
              default11Image,
              LoadStreamWDBTool.buildController(sandbox),
              handleBeforeStartLoop,
              handleWhenDoneFunc,
            ),
            LoadStreamWDBTool.buildReader(readStub),
          )
          |> then_(() => {
               let state = StateAPI.unsafeGetState();

               let state = DirectorTool.runWithDefaultTime(state);

               ExecIMGUITool.hasExecFuncData(state)
               |> expect == hasExecFunc
               |> resolve;
             });
        };

        beforeAll(() =>
          imguiWDBArrayBuffer :=
            WDBTool.generateWDB(state => {
              let rootGameObject = SceneAPI.getSceneGameObject(state);

              let state = ExecIMGUITool.addExecFuncData(~state, ());

              let (state, cubemapTexture) =
                SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

              (state, rootGameObject);
            })
        );

        describe(
          {|
            1.chunk1: header + json +  a part of first stream_chunk
            2.chunk2: other stream chunk data
            3.done
            |},
          () =>
          describe("test 1,2,3", () => {
            let _prepare = (sandbox, state) => {
              let readStub = createEmptyStubWithJsObjSandbox(sandbox);

              let readStub =
                readStub
                |> onCall(0)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=
                         (
                           imguiWDBArrayBuffer^
                           |> ArrayBuffer.slice(~start=0, ~end_=800)
                         )
                         ->Some,
                       (),
                     ),
                   )
                |> onCall(1)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=
                         (imguiWDBArrayBuffer^ |> ArrayBuffer.sliceFrom(800))
                         ->Some,
                       (),
                     ),
                   )
                |> onCall(2)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=None,
                       ~done_=true,
                       (),
                     ),
                   );

              LoadStreamWDBTool.prepareWithReadStub(sandbox, readStub, state);
            };

            testPromise("should handle imgui", () =>
              _test(sandbox, true, _prepare, state)
            );
          })
        );
      });

      describe("if load error", () => {
        let _buildFakeFetchReturnResponse = (ok, status, statusText) =>
          {"ok": ok, "status": status, "statusText": statusText}
          |> Js.Promise.resolve;

        let _buildFakeFetch = (sandbox, status, statusText) => {
          let fetch = createEmptyStubWithJsObjSandbox(sandbox);
          fetch
          |> onCall(0)
          |> returns(
               _buildFakeFetchReturnResponse(false, status, statusText),
             );
          fetch;
        };

        beforeEach(() => GLBTool.prepare(sandbox^));

        testPromise("throw error", () => {
          let status = "aaa";
          let statusText = "bbb";
          let fetchFunc = _buildFakeFetch(sandbox, status, statusText);

          LoadStreamWDBTool.load(
            ~wdbPath=NodeTool.buildWDBPath("BoxTextured"),
            ~fetchFunc,
            (),
          )
          |> PromiseTool.judgeErrorMessage({j|$status $statusText|j});
        });
      });

      describe("if not support stream load", () => {
        let _buildFakeFetchReturnResponse =
            (sandbox, contentLength, ok, arrayBuffer) =>
          {
            "ok": true,
            "headers": {
              "get":
                Sinon.createEmptyStubWithJsObjSandbox(sandbox)
                |> Sinon.withOneArg("content-length")
                |> Sinon.returns(contentLength),
            },
            "arrayBuffer": () => arrayBuffer |> resolve,
          }
          |> Js.Promise.resolve;

        let _buildFakeFetch = (sandbox, contentLength, gltfJsonStr, binBuffer) => {
          open Sinon;

          let fetch = createEmptyStubWithJsObjSandbox(sandbox);
          fetch
          |> onCall(0)
          |> returns(
               _buildFakeFetchReturnResponse(
                 sandbox,
                 contentLength,
                 true,
                 ConvertGLBSystem.convertGLBData(
                   gltfJsonStr |> Js.Json.parseExn,
                   binBuffer,
                 ),
               ),
             );
          fetch;
        };

        beforeEach(() => GLBTool.prepare(sandbox^) |> ignore);

        testPromise("warn", () => {
          let warnStub =
            createMethodStubWithJsObjSandbox(
              sandbox,
              Console.console,
              "warn",
            );
          let fetchFunc =
            _buildFakeFetch(
              sandbox,
              0,
              ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              GLBTool.buildBinBuffer(),
            );

          LoadStreamWDBTool.load(
            ~wdbPath=NodeTool.buildWDBPath("BoxTextured"),
            ~fetchFunc,
            (),
          )
          |> then_(_ =>
               warnStub
               |> expect
               |> toCalledWith([|
                    "your browser does not seem to have the Streams API yet, fallback to load whole wdb",
                  |])
               |> resolve
             );
        });
        testPromise("trigger handleWhenLoadingFunc", () => {
          let totalLoadedByteLengthArr = [||];
          let contentLengthArr = [||];
          let wdbPathArr = [||];
          let contentLength = 1;
          let fetchFunc =
            _buildFakeFetch(
              sandbox,
              contentLength,
              ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              GLBTool.buildBinBuffer(),
            );

          LoadStreamWDBTool.load(
            ~wdbPath=NodeTool.buildWDBPath("BoxTextured"),
            ~handleWhenLoadingFunc=
              (totalLoadedByteLength, contentLength, wdbPath) => {
                totalLoadedByteLengthArr
                |> ArrayService.push(totalLoadedByteLength)
                |> ignore;
                contentLengthArr |> ArrayService.push(contentLength) |> ignore;
                wdbPathArr |> ArrayService.push(wdbPath) |> ignore;
              },
            ~fetchFunc,
            (),
          )
          |> then_(_ =>
               (
                 totalLoadedByteLengthArr,
                 contentLengthArr,
                 wdbPathArr |> Js.Array.length,
                 ArrayService.unsafeGetFirst(wdbPathArr)
                 |> Js.String.includes("BoxTextured.wdb"),
               )
               |> expect == ([|25036|], [|contentLength|], 1, true)
               |> resolve
             );
        });

        describe("fallback to load whole wdb", () =>
          testPromise("load wdb and assemble", () => {
            let stateRef = ref(Obj.magic(-1));
            let rootGameObjectRef = ref(-1);
            let fetchFunc =
              _buildFakeFetch(
                sandbox,
                0,
                ConvertGLBTool.buildGLTFJsonOfSingleNode(),
                GLBTool.buildBinBuffer(),
              );

            LoadStreamWDBTool.load(
              ~wdbPath=NodeTool.buildWDBPath("BoxTextured"),
              ~fetchFunc,
              ~handleWhenLoadWholeWDBFunc=
                (state, _, (rootGameObject, _)) => {
                  stateRef := state;
                  rootGameObjectRef := rootGameObject;
                },
              (),
            )
            |> then_(_ => {
                 let rootGameObject = rootGameObjectRef^;

                 AssembleWDBSystemTool.getAllGameObjects(
                   rootGameObject,
                   stateRef^,
                 )
                 |> expect == [|rootGameObject|]
                 |> resolve;
               });
          })
        );
      });
    });
  });

/* describe
   ("test load error",
   (
   () => {

   })
   );

   describe
   ("test not support stream load",
   (
   () => {

   })
   ); */
/* }); */
