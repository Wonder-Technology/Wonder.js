open Wonder_jest;

let _ =
  describe(
    "test render basic + gameObjects with different geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let prepareGameObjects = (sandbox, state) => {
        open GameObjectAPI;
        open BasicMaterialAPI;
        open BoxGeometryAPI;
        open CustomGeometryAPI;
        open MeshRendererAPI;
        open Sinon;
        let (state, gameObject1, boxGeometry) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject2, customGeometry, (vertices, normals, indices)) =
          CustomGeometryTool.createGameObjectAndSetPointData(state);
        let (state, material1) = createBasicMaterial(state);
        let (state, material2) = createBasicMaterial(state);
        let (state, meshRenderer1) = createMeshRenderer(state);
        let (state, meshRenderer2) = createMeshRenderer(state);
        let state =
          state
          |> addGameObjectBasicMaterialComponent(gameObject1, material1)
          |> addGameObjectMeshRendererComponent(gameObject1, meshRenderer1);
        let state =
          state
          |> addGameObjectBasicMaterialComponent(gameObject2, material2)
          |> addGameObjectMeshRendererComponent(gameObject2, meshRenderer2);
        (
          state,
          (gameObject1, gameObject2),
          (boxGeometry, (customGeometry, vertices, normals, indices)),
          (material1, material2),
          (meshRenderer1, meshRenderer2)
        )
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "send attribute record",
        () => {
          let _prepare = (sandbox, state) => {
            let (state, _, _, _, _) = prepareGameObjects(sandbox, state);
            let (state, _, _, _) = CameraTool.createCameraGameObject(state);
            state
          };
          describe(
            "init vbo buffers when first send",
            () => {
              let _prepare = (sandbox, state) => {
                let (state, _, geometry, _, _) = prepareGameObjects(sandbox, state);
                let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                (state, geometry)
              };
              test(
                "create buffer",
                () => {
                  let (state, _) = _prepare(sandbox, state^);
                  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  getCallCount(createBuffer) |> expect == 4
                }
              );
              describe(
                "init vertex buffer",
                () => {
                  test(
                    "bufferData",
                    () => {
                      let (state, (boxGeometry, (customGeometry, customVertices, _, _))) =
                        _prepare(sandbox, state^);
                      let array_buffer = 1;
                      let static_draw = 2;
                      let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~array_buffer,
                               ~static_draw,
                               ~bufferData,
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let vertices = BoxGeometryAPI.getBoxGeometryVertices(state);
                      (
                        bufferData
                        |> withThreeArgs(array_buffer, vertices, static_draw)
                        |> getCallCount,
                        bufferData
                        |> withThreeArgs(array_buffer, customVertices, static_draw)
                        |> getCallCount
                      )
                      |> expect == (1, 1)
                    }
                  );
                  test(
                    "bind buffer and unbind buffer",
                    () => {
                      let (state, _) = _prepare(sandbox, state^);
                      let array_buffer = 1;
                      let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~array_buffer, ~bindBuffer, ())
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      bindBuffer |> withOneArg(array_buffer) |> getCallCount |> expect == 3 * 2
                    }
                  )
                }
              );
              describe(
                "init index buffer",
                () => {
                  test(
                    "bufferData",
                    () => {
                      let (state, (boxGeometry, (customGeometry, _, _, customIndices))) =
                        _prepare(sandbox, state^);
                      let element_array_buffer = 1;
                      let static_draw = 2;
                      let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~element_array_buffer,
                               ~static_draw,
                               ~bufferData,
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      let indices = BoxGeometryAPI.getBoxGeometryIndices(state);
                      (
                        bufferData
                        |> withThreeArgs(element_array_buffer, indices, static_draw)
                        |> getCallCount,
                        bufferData
                        |> withThreeArgs(element_array_buffer, customIndices, static_draw)
                        |> getCallCount
                      )
                      |> expect == (1, 1)
                    }
                  );
                  test(
                    "bind buffer and unbind buffer",
                    () => {
                      let (state, _) = _prepare(sandbox, state^);
                      let element_array_buffer = 1;
                      let bindBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(
                               ~sandbox,
                               ~element_array_buffer,
                               ~bindBuffer,
                               ()
                             )
                           );
                      let state =
                        state
                        |> RenderJobsTool.initSystemAndRender
                        |> DirectorTool.runWithDefaultTime;
                      bindBuffer
                      |> withOneArg(element_array_buffer)
                      |> getCallCount
                      |> expect == 3
                      * 2
                    }
                  )
                }
              )
            }
          );
          describe(
            "send buffer",
            () =>
              describe(
                "optimize",
                () => {
                  beforeEach(
                    () => {
                      let (newState, _, _, _) = CameraTool.createCameraGameObject(state^);
                      state := newState
                    }
                  );
                  /* let _prepare = (sandbox, state) => {
                       let (state, _, geometry, _, _) = prepareGameObjects(sandbox, state);
                       let (state, _, _, _) = CameraTool.createCameraGameObject(state);
                       (state, geometry)
                     }; */
                  test(
                    "if lastSendGeometry === geometryIndex && last type_ === type_, not send",
                    () => {
                      let (state, _, geometry, _, _) =
                        RenderBasicJobTool.prepareGameObject(sandbox, state^);
                      let (state, _, _, _, _) =
                        RenderBasicJobTool.prepareGameObjectWithSharedGeometry(
                          sandbox,
                          geometry,
                          state
                        );
                      let float = 1;
                      let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                      let state =
                        state
                        |> FakeGlTool.setFakeGl(
                             FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                           );
                      let state = state |> RenderJobsTool.initSystemAndRender;
                      let state = state |> DirectorTool.runWithDefaultTime;
                      vertexAttribPointer |> getCallCount |> expect == 1 * 1
                    }
                  );
                  describe(
                    "else",
                    () => {
                      test(
                        "if type_ not equal, not send",
                        () => {
                          let (state, _, _, _, _) = prepareGameObjects(sandbox, state^);
                          let float = 1;
                          let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          vertexAttribPointer |> getCallCount |> expect == 2 * 1
                        }
                      );
                      test(
                        "if geometry index not equal, not send",
                        () => {
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state^);
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state);
                          let float = 1;
                          let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          vertexAttribPointer |> getCallCount |> expect == 2 * 1
                        }
                      );
                      test(
                        "if both not equal, not send",
                        () => {
                          let (state, _, _, _, _) = prepareGameObjects(sandbox, state^);
                          let (state, _, _, _, _) =
                            RenderBasicJobTool.prepareGameObject(sandbox, state);
                          let float = 1;
                          let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                          let state =
                            state
                            |> FakeGlTool.setFakeGl(
                                 FakeGlTool.buildFakeGl(~sandbox, ~float, ~vertexAttribPointer, ())
                               );
                          let state = state |> RenderJobsTool.initSystemAndRender;
                          let state = state |> DirectorTool.runWithDefaultTime;
                          vertexAttribPointer |> getCallCount |> expect == 3 * 1
                        }
                      )
                    }
                  )
                }
              )
          )
        }
      )
    }
  );