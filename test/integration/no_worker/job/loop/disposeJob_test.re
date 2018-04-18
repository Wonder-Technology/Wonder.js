open Wonder_jest;

let _ =
  describe(
    "test dispose job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(sandbox, LoopRenderJobTool.buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "actually do the dispose work",
        () => {
          describe(
            "test dispose component",
            () => {
              /* TODO test more components */
              describe(
                "test disposeGameObjectBasicCameraViewComponent",
                () => {
                  open BasicCameraViewType;
                  let _prepare = (state) => {
                    let (state, gameObject1, _, (basicCameraView1, _)) =
                      CameraTool.createCameraGameObject(state^);
                    let (state, gameObject2, _, (basicCameraView2, _)) =
                      CameraTool.createCameraGameObject(state);
                    let (state, gameObject3, _, (basicCameraView3, _)) =
                      CameraTool.createCameraGameObject(state);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                           gameObject1,
                           basicCameraView1
                         )
                      |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                           gameObject3,
                           basicCameraView3
                         );
                    (
                      state,
                      (gameObject1, gameObject2, gameObject3),
                      (basicCameraView1, basicCameraView2, basicCameraView3)
                    )
                  };
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (
                        state,
                        (gameObject1, gameObject2, gameObject3),
                        (basicCameraView1, basicCameraView2, basicCameraView3)
                      ) =
                        _prepare(state);
                      let {disposedIndexArray} = state.basicCameraViewRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(basicCameraView1),
                        disposedIndexArray |> Js.Array.includes(basicCameraView2),
                        disposedIndexArray |> Js.Array.includes(basicCameraView3)
                      )
                      |> expect == (false, false, false)
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (
                        state,
                        (gameObject1, gameObject2, gameObject3),
                        (basicCameraView1, basicCameraView2, basicCameraView3)
                      ) =
                        _prepare(state);
                      let state = state |> DisposeJob.execJob(None);
                      let {disposedIndexArray} = state.basicCameraViewRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(basicCameraView1),
                        disposedIndexArray |> Js.Array.includes(basicCameraView2),
                        disposedIndexArray |> Js.Array.includes(basicCameraView3)
                      )
                      |> expect == (true, false, true)
                    }
                  )
                }
              );
              describe(
                "test disposeGameObjectPerspectiveCameraProjectionComponent",
                () => {
                  open PerspectiveCameraProjectionType;
                  let _prepare = (state) => {
                    let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
                      CameraTool.createCameraGameObject(state^);
                    let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
                      CameraTool.createCameraGameObject(state);
                    let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                    (
                      state,
                      (gameObject1, gameObject2),
                      (perspectiveCameraProjection1, perspectiveCameraProjection2)
                    )
                  };
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (
                        state,
                        (gameObject1, gameObject2),
                        (perspectiveCameraProjection1, perspectiveCameraProjection2)
                      ) =
                        _prepare(state);
                      let {disposedIndexArray} = state.perspectiveCameraProjectionRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection1),
                        disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection2)
                      )
                      |> expect == (false, false)
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (
                        state,
                        (gameObject1, gameObject2),
                        (perspectiveCameraProjection1, perspectiveCameraProjection2)
                      ) =
                        _prepare(state);
                      let state = state |> DisposeJob.execJob(None);
                      let {disposedIndexArray} = state.perspectiveCameraProjectionRecord;
                      (
                        disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection1),
                        disposedIndexArray |> Js.Array.includes(perspectiveCameraProjection2)
                      )
                      |> expect == (true, false)
                    }
                  )
                }
              );
              describe(
                "test disposeGameObjectTransformComponent",
                () => {
                  open TransformType;
                  let _prepare = (isKeepOrder, state) => {
                    open GameObjectAPI;
                    let (state, gameObject1) = createGameObject(state^);
                    let (state, gameObject2) = createGameObject(state);
                    let transform1 = unsafeGetGameObjectTransformComponent(gameObject1, state);
                    let transform2 = unsafeGetGameObjectTransformComponent(gameObject2, state);
                    let state =
                      state
                      |> TransformAPI.setTransformParent(
                           Js.Nullable.return(transform1),
                           transform2
                         );
                    let pos1 = (1., 2., 3.);
                    let pos2 = (2., 3., 4.);
                    let state =
                      state
                      |> TransformAPI.setTransformLocalPosition(transform1, pos1)
                      |> TransformAPI.setTransformLocalPosition(transform2, pos2);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectTransformComponent(
                           gameObject1,
                           transform1,
                           isKeepOrder
                         );
                    /* state |> TransformAPI.getTransformPosition(transform2) |> expect == pos2 */
                    (state, (gameObject1, gameObject2), (pos1, pos2), (transform1, transform2))
                  };
                  let _prepareForTestChildrenOrder = (isKeepOrder, state) => {
                    open TransformAPI;
                    let (state, parent) = createTransform(state^);
                    let (state, child1) = createTransform(state);
                    let (state, child2) = createTransform(state);
                    let (state, child3) = createTransform(state);
                    let state =
                      state
                      |> setTransformParent(Js.Nullable.return(parent), child1)
                      |> setTransformParent(Js.Nullable.return(parent), child2)
                      |> setTransformParent(Js.Nullable.return(parent), child3);
                    TestTool.closeContractCheck();
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectTransformComponent(
                           (-1),
                           child1,
                           isKeepOrder
                         );
                    let state = state |> DisposeJob.execJob(None);
                    (state, parent)
                  };
                  describe(
                    "test not keep order",
                    () => {
                      test(
                        "shouldn't dispose data",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (pos1, pos2),
                            (transform1, transform2)
                          ) =
                            _prepare(false, state);
                          state
                          |> TransformAPI.getTransformPosition(transform2)
                          |> expect == (3., 5., 7.)
                        }
                      );
                      describe(
                        "test dispose job",
                        () => {
                          test(
                            "dispose data",
                            () => {
                              let (
                                state,
                                (gameObject1, gameObject2),
                                (pos1, pos2),
                                (transform1, transform2)
                              ) =
                                _prepare(false, state);
                              let state = state |> DisposeJob.execJob(None);
                              state
                              |> TransformAPI.getTransformPosition(transform2)
                              |> expect == pos2
                            }
                          );
                          test(
                            "change its current parent's children order",
                            () => {
                              open TransformAPI;
                              let (state, parent) = _prepareForTestChildrenOrder(false, state);
                              state |> unsafeGetTransformChildren(parent) |> expect == [|3, 2|]
                            }
                          )
                        }
                      )
                    }
                  );
                  describe(
                    "test keep order",
                    () => {
                      test(
                        "shouldn't dispose data",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (pos1, pos2),
                            (transform1, transform2)
                          ) =
                            _prepare(true, state);
                          state
                          |> TransformAPI.getTransformPosition(transform2)
                          |> expect == (3., 5., 7.)
                        }
                      );
                      describe(
                        "test dispose job",
                        () => {
                          test(
                            "dispose data",
                            () => {
                              let (
                                state,
                                (gameObject1, gameObject2),
                                (pos1, pos2),
                                (transform1, transform2)
                              ) =
                                _prepare(true, state);
                              let state = state |> DisposeJob.execJob(None);
                              state
                              |> TransformAPI.getTransformPosition(transform2)
                              |> expect == pos2
                            }
                          );
                          test(
                            "not change its current parent's children order",
                            () => {
                              open TransformAPI;
                              let (state, parent) = _prepareForTestChildrenOrder(true, state);
                              state |> unsafeGetTransformChildren(parent) |> expect == [|2, 3|]
                            }
                          )
                        }
                      )
                    }
                  )
                }
              );
              describe(
                "test disposeGameObjectMeshRendererComponent",
                () => {
                  let _prepare = (state) => {
                    let (state, gameObject1, meshRenderer1) =
                      MeshRendererTool.createGameObject(state^);
                    let (state, gameObject2, meshRenderer2) =
                      MeshRendererTool.createGameObject(state);
                    let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                    /* state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|] */
                    (state, (gameObject1, gameObject2), (meshRenderer1, meshRenderer2))
                  };
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (state, (gameObject1, gameObject2), (meshRenderer1, meshRenderer2)) =
                        _prepare(state);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect == 2
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (state, (gameObject1, gameObject2), (meshRenderer1, meshRenderer2)) =
                        _prepare(state);
                      let state = state |> DisposeJob.execJob(None);
                      state |> MeshRendererTool.getRenderArray |> expect == [|gameObject2|]
                    }
                  )
                }
              )
            }
          );
          describe(
            "test dispose gameObject",
            () => {
              let _prepare = (state) => {
                let (state, gameObject1, meshRenderer1) =
                  MeshRendererTool.createGameObject(state^);
                let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
                (state, gameObject1, gameObject2)
              };
              describe(
                "test batchDisposeGameObject",
                () => {
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state =
                        state |> GameObjectAPI.batchDisposeGameObject([|gameObject1, gameObject2|]);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state =
                        state |> GameObjectAPI.batchDisposeGameObject([|gameObject1, gameObject2|]);
                      let state = state |> DisposeJob.execJob(None);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 0
                    }
                  )
                }
              );
              describe(
                "test disposeGameObject",
                () => {
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                      let state = state |> DisposeJob.execJob(None);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 1
                    }
                  )
                }
              );
              describe(
                "test disposeGameObjectKeepOrder",
                () => {
                  test(
                    "shouldn't dispose data",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state = state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 2
                    }
                  );
                  test(
                    "dispose data in dispose job",
                    () => {
                      let (state, gameObject1, gameObject2) = _prepare(state);
                      let state = state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
                      let state = state |> DisposeJob.execJob(None);
                      state |> MeshRendererTool.getRenderArray |> Js.Array.length |> expect === 1
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  );