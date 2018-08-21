open Wonder_jest;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("load stream wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load", () => {
      let wdbArrayBuffer = ref(Obj.magic(-1));

      let _buildFakeRequestAnimationFrame = [%raw
        (unsafeGetStateFunc, setStateFunc, runWithDefaultTimeFunc) => {|
            window.requestAnimationFrame = function(func){
setStateFunc(runWithDefaultTimeFunc(unsafeGetStateFunc()));
            };
            |}
      ];

      let _buildChunkData = (~arrayBuffer, ~done_=false, ()) =>
        {
          "done": done_,
          "value":
            switch (arrayBuffer) {
            | Some(arrayBuffer) => arrayBuffer |> Uint8Array.fromBuffer
            | None => Obj.magic(-1)
            },
        }
        |> resolve;

      let _getWDBArrayBuffer = wdbName => NodeExtend.readFileBufferSync(
                                            Node.Path.join([|
                                              Node.Process.cwd(),
                                              "./test/res/",
                                              {j|wdb/$wdbName.wdb|j},
                                            |]),
                                          )##buffer;

      let _buildController = sandbox => {
        "close": createEmptyStubWithJsObjSandbox(sandbox),
      };

      let _buildReader = readStub => {"read": readStub |> Obj.magic};

      let _prepare = (sandbox, wdbArrayBuffer, state) => {
        let readStub = createEmptyStubWithJsObjSandbox(sandbox);
        let readStub =
          readStub
          |> onCall(0)
          |> returns(
               _buildChunkData(
                 /* wdbArrayBuffer |> ArrayBuffer.slice(
                    ~start=  ,
                    ~end_= ,

                                ) */
                 ~arrayBuffer=wdbArrayBuffer |. Some,
                 (),
               ),
             )
          |> onCall(1)
          |> returns(_buildChunkData(~arrayBuffer=None, ~done_=true, ()));

        let default11Image = Obj.magic(101);

        StateAPI.setState(state) |> ignore;

        let handleBeforeStartLoop = (state, rootGameObject) => {
          let (state, _, _) = DirectionLightTool.createGameObject(state);
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);

          state;
        };

        let handleWhenDoneFunc = (state, rootGameObject) => state;

        (
          default11Image,
          readStub,
          handleBeforeStartLoop,
          handleWhenDoneFunc,
          state,
        );
      };

      let _getBoxTexturedMeshGameObject = (rootGameObject, state) =>
        Array.unsafe_get(
          GameObjectTool.getChildren(rootGameObject, state),
          0,
        );

      beforeEach(() => {
        GLBTool.prepare(sandbox^);

        _buildFakeRequestAnimationFrame(
          StateAPI.unsafeGetState,
          StateAPI.setState,
          DirectorTool.runWithDefaultTime,
        );
      });

      describe("test before start loop", () =>
        describe("test BoxTextured wdb", () => {
          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("BoxTextured")
          );

          testPromise("set default source to basicSourceTexture", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, _, handleWhenDoneFunc, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let sourceBeforeStartLoop = ref(Obj.magic(-1));
            let handleBeforeStartLoop = (state, rootGameObject) => {
              let basicSourceTexture =
                LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                  GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                    _getBoxTexturedMeshGameObject(rootGameObject, state),
                    state,
                  ),
                  state,
                );

              sourceBeforeStartLoop :=
                BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                  basicSourceTexture,
                  state,
                );

              GameObjectAPI.hasGameObjectGeometryComponent(
                _getBoxTexturedMeshGameObject(rootGameObject, state),
                state,
              );

              let (state, _, _) = DirectionLightTool.createGameObject(state);
              let (state, _, _, _) =
                CameraTool.createCameraGameObject(state);

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              [||],
              None,
              [||],
              None,
              0,
              [||],
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 sourceBeforeStartLoop^ |> expect == default11Image |> resolve;
               });
          });
        })
      );

      describe("test load all data in first chunk", () =>
        describe("test BoxTextured wdb", () => {
          beforeEach(() =>
            wdbArrayBuffer := _getWDBArrayBuffer("BoxTextured")
          );

          testPromise("add geometry component", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, _, _, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let hasGeometryBeforeStartLoop = ref(false);
            let hasGeometryWhenDone = ref(false);
            let handleBeforeStartLoop = (state, rootGameObject) => {
              hasGeometryBeforeStartLoop :=
                GameObjectAPI.hasGameObjectGeometryComponent(
                  _getBoxTexturedMeshGameObject(rootGameObject, state),
                  state,
                );

              let (state, _, _) = DirectionLightTool.createGameObject(state);
              let (state, _, _, _) =
                CameraTool.createCameraGameObject(state);

              state;
            };
            let handleWhenDoneFunc = (state, rootGameObject) => {
              hasGeometryWhenDone :=
                GameObjectAPI.hasGameObjectGeometryComponent(
                  _getBoxTexturedMeshGameObject(rootGameObject, state),
                  state,
                );

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              [||],
              None,
              [||],
              None,
              0,
              [||],
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 (hasGeometryBeforeStartLoop^, hasGeometryWhenDone^)
                 |> expect == (false, true)
                 |> resolve;
               });
          });
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
              _prepare(sandbox, wdbArrayBuffer^, state);
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
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              [||],
              None,
              [||],
              None,
              0,
              [||],
              _buildReader(readStub),
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
                   GeometryAPI.getGeometryIndices(geometry, state);

                 (
                   (vertices, normals, texCoords, indices),
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
                 |>
                 expect == (
                             GLTFTool.getBoxTexturedGeometryData(),
                             (1, 1, 1, 1),
                           )
                 |> resolve;
               });
          });
          testPromise("load blob image and set it to be source", () => {
            let state =
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let (default11Image, readStub, handleBeforeStartLoop, _, state) =
              _prepare(sandbox, wdbArrayBuffer^, state);
            let sourceWhenDone = ref(Obj.magic(-1));
            let handleWhenDoneFunc = (state, rootGameObject) => {
              let basicSourceTexture =
                LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                  GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                    _getBoxTexturedMeshGameObject(rootGameObject, state),
                    state,
                  ),
                  state,
                );

              sourceWhenDone :=
                BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                  basicSourceTexture,
                  state,
                );

              GameObjectAPI.hasGameObjectGeometryComponent(
                _getBoxTexturedMeshGameObject(rootGameObject, state),
                state,
              );

              let (state, _, _) = DirectionLightTool.createGameObject(state);
              let (state, _, _, _) =
                CameraTool.createCameraGameObject(state);

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              [||],
              None,
              [||],
              None,
              0,
              [||],
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let state = DirectorTool.runWithDefaultTime(state);

                 sourceWhenDone^
                 |> expect == Obj.magic("object_url0")
                 |> resolve;
               });
          });
          testPromise("should draw the gameObject", () => {
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
                _buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              [||],
              None,
              [||],
              None,
              0,
              [||],
              _buildReader(readStub),
            )
            |> then_(() => {
                 let state = StateAPI.unsafeGetState();

                 let drawElementsCallCount = drawElements |> getCallCount;

                 let state = DirectorTool.runWithDefaultTime(state);

                 (drawElements |> getCallCount)
                 - drawElementsCallCount
                 |> expect == 1
                 |> resolve;
               });
          });
        })
      );
      /* describe("test complete load one or more stream chunk data", () =>
           describe("test BoxTextured wdb", () => {
             beforeEach(() =>
               wdbArrayBuffer := _getWDBArrayBuffer("BoxTextured")
             );

           })
         ); */
    });
    /* TODO test startLoop:
       e.g.
       set default source */
    /* describe
       ("test done",
       (
       () => {

       })
       ); */
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
  });