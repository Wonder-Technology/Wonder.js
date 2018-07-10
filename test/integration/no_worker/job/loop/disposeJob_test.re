open Wonder_jest;

let _ =
  describe("test dispose job", () => {
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
    describe("actually do the dispose work", () => {
      describe("dispose components", () => {
        describe("test disposeGameObjectBasicCameraViewComponent", () => {
          open BasicCameraViewType;
          let _prepare = state => {
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
                   basicCameraView1,
                 )
              |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(
                   gameObject3,
                   basicCameraView3,
                 );
            (
              state,
              (gameObject1, gameObject2, gameObject3),
              (basicCameraView1, basicCameraView2, basicCameraView3),
            );
          };
          test("shouldn't dispose data", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3),
              (basicCameraView1, basicCameraView2, basicCameraView3),
            ) =
              _prepare(state);
            let {disposedIndexArray} = state.basicCameraViewRecord;
            (
              disposedIndexArray |> Js.Array.includes(basicCameraView1),
              disposedIndexArray |> Js.Array.includes(basicCameraView2),
              disposedIndexArray |> Js.Array.includes(basicCameraView3),
            )
            |> expect == (false, false, false);
          });
          test("dispose data in dispose job", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3),
              (basicCameraView1, basicCameraView2, basicCameraView3),
            ) =
              _prepare(state);
            let state = state |> DisposeJob.execJob(None);
            let {disposedIndexArray} = state.basicCameraViewRecord;
            (
              disposedIndexArray |> Js.Array.includes(basicCameraView1),
              disposedIndexArray |> Js.Array.includes(basicCameraView2),
              disposedIndexArray |> Js.Array.includes(basicCameraView3),
            )
            |> expect == (true, false, true);
          });
        });
        describe(
          "test disposeGameObjectPerspectiveCameraProjectionComponent", () => {
          open PerspectiveCameraProjectionType;
          let _prepare = state => {
            let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
              CameraTool.createCameraGameObject(state^);
            let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
              CameraTool.createCameraGameObject(state);
            let state =
              state
              |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
                   gameObject1,
                   perspectiveCameraProjection1,
                 );
            (
              state,
              (gameObject1, gameObject2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
            );
          };
          test("shouldn't dispose data", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
            ) =
              _prepare(state);
            let {disposedIndexArray} =
              state.perspectiveCameraProjectionRecord;
            (
              disposedIndexArray
              |> Js.Array.includes(perspectiveCameraProjection1),
              disposedIndexArray
              |> Js.Array.includes(perspectiveCameraProjection2),
            )
            |> expect == (false, false);
          });
          test("dispose data in dispose job", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (perspectiveCameraProjection1, perspectiveCameraProjection2),
            ) =
              _prepare(state);
            let state = state |> DisposeJob.execJob(None);
            let {disposedIndexArray} =
              state.perspectiveCameraProjectionRecord;
            (
              disposedIndexArray
              |> Js.Array.includes(perspectiveCameraProjection1),
              disposedIndexArray
              |> Js.Array.includes(perspectiveCameraProjection2),
            )
            |> expect == (true, false);
          });
        });
        describe("test disposeGameObjectArcballCameraControllerComponent", () => {
          open StateDataMainType;

          let _prepare = state => {
            let (state, gameObject1, _, (cameraController1, _, _)) =
              ArcballCameraControllerTool.createGameObject(state^);
            let (state, gameObject2, _, (cameraController2, _, _)) =
              ArcballCameraControllerTool.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.disposeGameObjectArcballCameraControllerComponent(
                   gameObject1,
                   cameraController1,
                 );
            (
              state,
              (gameObject1, gameObject2),
              (cameraController1, cameraController2),
            );
          };
          test("shouldn't dispose data", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (cameraController1, cameraController2),
            ) =
              _prepare(state);
            let {disposedIndexArray} = state.arcballCameraControllerRecord;
            (
              disposedIndexArray |> Js.Array.includes(cameraController1),
              disposedIndexArray |> Js.Array.includes(cameraController2),
            )
            |> expect == (false, false);
          });
          test("dispose data in dispose job", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (cameraController1, cameraController2),
            ) =
              _prepare(state);
            let state = state |> DisposeJob.execJob(None);
            let {disposedIndexArray} = state.arcballCameraControllerRecord;
            (
              disposedIndexArray |> Js.Array.includes(cameraController1),
              disposedIndexArray |> Js.Array.includes(cameraController2),
            )
            |> expect == (true, false);
          });
        });
        describe("test disposeGameObjectTransformComponent", () => {
          open TransformType;
          let _prepare = (isKeepOrder, state) => {
            open GameObjectAPI;
            let (state, gameObject1) = createGameObject(state^);
            let (state, gameObject2) = createGameObject(state);
            let transform1 =
              unsafeGetGameObjectTransformComponent(gameObject1, state);
            let transform2 =
              unsafeGetGameObjectTransformComponent(gameObject2, state);
            let state =
              state
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(transform1),
                   transform2,
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
                   isKeepOrder,
                 );
            /* state |> TransformAPI.getTransformPosition(transform2) |> expect == pos2 */
            (
              state,
              (gameObject1, gameObject2),
              (pos1, pos2),
              (transform1, transform2),
            );
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
                   -1,
                   child1,
                   isKeepOrder,
                 );
            let state = state |> DisposeJob.execJob(None);
            (state, parent);
          };
          describe("test not keep order", () => {
            test("shouldn't dispose data", () => {
              let (
                state,
                (gameObject1, gameObject2),
                (pos1, pos2),
                (transform1, transform2),
              ) =
                _prepare(false, state);
              state
              |> TransformAPI.getTransformPosition(transform2)
              |> expect == (3., 5., 7.);
            });
            describe("test dispose job", () => {
              test("dispose data", () => {
                let (
                  state,
                  (gameObject1, gameObject2),
                  (pos1, pos2),
                  (transform1, transform2),
                ) =
                  _prepare(false, state);
                let state = state |> DisposeJob.execJob(None);
                state
                |> TransformAPI.getTransformPosition(transform2)
                |> expect == pos2;
              });
              test("change its current parent's children order", () => {
                open TransformAPI;
                let (state, parent) =
                  _prepareForTestChildrenOrder(false, state);
                state
                |> unsafeGetTransformChildren(parent)
                |> expect == [|4, 3|];
              });
            });
          });
          describe("test keep order", () => {
            test("shouldn't dispose data", () => {
              let (
                state,
                (gameObject1, gameObject2),
                (pos1, pos2),
                (transform1, transform2),
              ) =
                _prepare(true, state);
              state
              |> TransformAPI.getTransformPosition(transform2)
              |> expect == (3., 5., 7.);
            });
            describe("test dispose job", () => {
              test("dispose data", () => {
                let (
                  state,
                  (gameObject1, gameObject2),
                  (pos1, pos2),
                  (transform1, transform2),
                ) =
                  _prepare(true, state);
                let state = state |> DisposeJob.execJob(None);
                state
                |> TransformAPI.getTransformPosition(transform2)
                |> expect == pos2;
              });
              test("not change its current parent's children order", () => {
                open TransformAPI;
                let (state, parent) =
                  _prepareForTestChildrenOrder(true, state);
                state
                |> unsafeGetTransformChildren(parent)
                |> expect == [|3, 4|];
              });
            });
          });
        });
        describe("test disposeGameObjectMeshRendererComponent", () => {
          let _prepare = state => {
            let (state, gameObject1, meshRenderer1) =
              MeshRendererTool.createBasicMaterialGameObject(state^);
            let (state, gameObject2, meshRenderer2) =
              MeshRendererTool.createBasicMaterialGameObject(state);
            let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
            /* state |> MeshRendererTool.getBasicMaterialRenderArray |> expect == [|gameObject2|] */
            (
              state,
              (gameObject1, gameObject2),
              (meshRenderer1, meshRenderer2),
            );
          };
          test("shouldn't dispose data", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (meshRenderer1, meshRenderer2),
            ) =
              _prepare(state);
            state
            |> MeshRendererTool.getBasicMaterialRenderArray
            |> Js.Array.length
            |> expect == 2;
          });
          test("dispose data in dispose job", () => {
            let (
              state,
              (gameObject1, gameObject2),
              (meshRenderer1, meshRenderer2),
            ) =
              _prepare(state);
            let state = state |> DisposeJob.execJob(None);
            state
            |> MeshRendererTool.getBasicMaterialRenderArray
            |> expect == [|gameObject2|];
          });
        });
        describe("test disposeGameObjectBoxGeometryComponent", () =>
          describe("dispose data in dispose job", () =>
            describe("dispose vbo buffer data", () => {
              test("add buffer to pool", () => {
                open VboBufferType;
                let (state, gameObject1, geometry1) =
                  DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeBoxGeometryVboBuffer(
                    state,
                  );
                let state = state |> DisposeJob.execJob(None);
                let {vertexArrayBufferPool, elementArrayBufferPool} =
                  VboBufferTool.getVboBufferRecord(state);
                (
                  vertexArrayBufferPool |> SparseMapService.length,
                  elementArrayBufferPool |> SparseMapService.length,
                )
                |> expect == (3, 1);
              });
              test("remove from buffer map", () => {
                open VboBufferType;
                let (state, gameObject1, geometry1) =
                  DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeBoxGeometryVboBuffer(
                    state,
                  );
                let state = state |> DisposeJob.execJob(None);
                let {
                  boxGeometryVertexBufferMap,
                  boxGeometryTexCoordBufferMap,
                  boxGeometryNormalBufferMap,
                  boxGeometryElementArrayBufferMap,
                } =
                  VboBufferTool.getVboBufferRecord(state);
                (
                  boxGeometryVertexBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                  boxGeometryTexCoordBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                  boxGeometryNormalBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                  boxGeometryElementArrayBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                )
                |> expect == (false, false, false, false);
              });
            })
          )
        );
        describe("test disposeGameObjectCustomGeometryComponent", () =>
          describe("dispose data in dispose job", () =>
            describe("dispose vbo buffer data", () => {
              let _prepare = state => {
                let (state, gameObject1, geometry1) =
                  CustomGeometryTool.createGameObject(state^);
                let state =
                  VboBufferTool.addVboBufferToCustomGeometryBufferMap(
                    geometry1,
                    state,
                  );
                let state =
                  state |> GameObjectAPI.disposeGameObject(gameObject1);
                (state, gameObject1, geometry1);
              };
              test("add buffer to pool", () => {
                open VboBufferType;
                let (state, gameObject1, geometry1) = _prepare(state);
                let state = state |> DisposeJob.execJob(None);
                let {vertexArrayBufferPool, elementArrayBufferPool} =
                  VboBufferTool.getVboBufferRecord(state);
                (
                  vertexArrayBufferPool |> SparseMapService.length,
                  elementArrayBufferPool |> SparseMapService.length,
                )
                |> expect == (3 * 1, 1 * 1);
              });
              test("remove from buffer map", () => {
                open VboBufferType;
                let (state, gameObject1, geometry1) = _prepare(state);
                let state = state |> DisposeJob.execJob(None);
                let {
                  customGeometryVertexBufferMap,
                  customGeometryTexCoordBufferMap,
                  customGeometryNormalBufferMap,
                  customGeometryElementArrayBufferMap,
                } =
                  VboBufferTool.getVboBufferRecord(state);
                (
                  customGeometryVertexBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                  customGeometryTexCoordBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                  customGeometryNormalBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                  customGeometryElementArrayBufferMap
                  |> WonderCommonlib.SparseMapService.has(geometry1),
                )
                |> expect == (false, false, false, false);
              });
            })
          )
        );
        describe("test disposeGameObjectSourceInstanceComponent", () =>
          describe("dispose data in dispose job", () =>
            describe("dispose vbo buffer data", () => {
              let _prepare = state => {
                let (state, gameObject1, (_, _, _, sourceInstance1, _)) =
                  RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
                    sandbox,
                    state^,
                  );
                let state =
                  VboBufferTool.addVboBufferToSourceInstanceBufferMap(
                    sourceInstance1,
                    state,
                  );
                let state =
                  state |> GameObjectAPI.disposeGameObject(gameObject1);
                (state, gameObject1, sourceInstance1);
              };
              test("add buffer to pool", () => {
                open VboBufferType;
                let (state, gameObject1, sourceInstance1) = _prepare(state);
                let state = state |> DisposeJob.execJob(None);
                let {matrixInstanceBufferPool} =
                  VboBufferTool.getVboBufferRecord(state);
                matrixInstanceBufferPool
                |> SparseMapService.length
                |> expect == 1;
              });
              test("remove from buffer map", () => {
                open VboBufferType;
                let (state, gameObject1, sourceInstance1) = _prepare(state);
                let state = state |> DisposeJob.execJob(None);
                let {matrixInstanceBufferMap} =
                  VboBufferTool.getVboBufferRecord(state);
                matrixInstanceBufferMap
                |> WonderCommonlib.SparseMapService.has(sourceInstance1)
                |> expect == false;
              });
            })
          )
        );
      });
      describe("dispose gameObjects", () => {
        let _prepare = state =>
          DisposeForNoWorkerAndWorkerJobTool.prepareForDisposeGameObjects(
            state,
          );
        describe("test batchDisposeGameObject", () => {
          test("shouldn't dispose data", () => {
            let (state, gameObject1, gameObject2) = _prepare(state);
            let state =
              state
              |> GameObjectAPI.batchDisposeGameObject([|
                   gameObject1,
                   gameObject2,
                 |]);
            state
            |> MeshRendererTool.getBasicMaterialRenderArray
            |> Js.Array.length
            |> expect === 2;
          });
          test("dispose data in dispose job", () => {
            let (state, gameObject1, gameObject2) = _prepare(state);
            let state =
              state
              |> GameObjectAPI.batchDisposeGameObject([|
                   gameObject1,
                   gameObject2,
                 |]);
            let state = state |> DisposeJob.execJob(None);
            state
            |> MeshRendererTool.getBasicMaterialRenderArray
            |> Js.Array.length
            |> expect === 0;
          });
        });
        describe("test disposeGameObject", () => {
          test("shouldn't dispose data", () => {
            let (state, gameObject1, gameObject2) = _prepare(state);
            let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
            state
            |> MeshRendererTool.getBasicMaterialRenderArray
            |> Js.Array.length
            |> expect === 2;
          });
          test("dispose data in dispose job", () => {
            let (state, gameObject1, gameObject2) = _prepare(state);
            let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
            let state = state |> DisposeJob.execJob(None);
            state
            |> MeshRendererTool.getBasicMaterialRenderArray
            |> Js.Array.length
            |> expect === 1;
          });
        });
        describe("test disposeGameObjectKeepOrder", () => {
          let _prepare = state => {
            let (state, gameObject1, transform1) =
              GameObjectTool.createGameObject(state^);
            let (state, gameObject2, transform2) =
              GameObjectTool.createGameObject(state);
            let (state, gameObject3, transform3) =
              GameObjectTool.createGameObject(state);
            let (state, gameObject4, transform4) =
              GameObjectTool.createGameObject(state);
            let pos1 = (10., 20., 30.);
            let pos3 = (1., 2., 3.);
            let state =
              state
              |> TransformAPI.setTransformLocalPosition(transform1, pos1)
              |> TransformAPI.setTransformLocalPosition(transform3, pos3);
            let state =
              state
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(transform1),
                   transform2,
                 )
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(transform1),
                   transform3,
                 )
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(transform1),
                   transform4,
                 );
            (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (transform1, transform2, transform3, transform4),
              pos3,
            );
          };
          test("shouldn't dispose data", () => {
            let (
              state,
              (gameObject1, gameObject2, gameObject3, gameObject4),
              (transform1, transform2, transform3, transform4),
              pos3,
            ) =
              _prepare(state);
            let state =
              state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
            state
            |> TransformAPI.getTransformPosition(transform3)
            |> expect == (11., 22., 33.);
          });
          describe("dispose data in dispose job", () => {
            test("test dispose data", () => {
              let (
                state,
                (gameObject1, gameObject2, gameObject3, gameObject4),
                (transform1, transform2, transform3, transform4),
                pos3,
              ) =
                _prepare(state);
              let state =
                state |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject1);
              let state = state |> DisposeJob.execJob(None);
              state
              |> TransformAPI.getTransformPosition(transform3)
              |> expect == pos3;
            });
            test(
              "dispose data in dispose job that not change its current parent's children order",
              () => {
                let (
                  state,
                  (gameObject1, gameObject2, gameObject3, gameObject4),
                  (transform1, transform2, transform3, transform4),
                  pos3,
                ) =
                  _prepare(state);
                let state =
                  state
                  |> GameObjectAPI.disposeGameObjectKeepOrder(gameObject2);
                let state = state |> DisposeJob.execJob(None);
                state
                |> TransformAPI.unsafeGetTransformChildren(transform1)
                |> expect == [|transform3, transform4|];
              },
            );
          });
        });
      });
    });
    describe("clear all defer disposed data", () =>
      describe(
        "not dispose the same one again in the second job execution", () =>
        test("test dispose box geometry component", () => {
          TestTool.closeContractCheck();
          open GameObjectType;
          let (state, gameObject1, geometry1) =
            BoxGeometryTool.createGameObject(state^);
          let (state, gameObject2, geometry2) =
            BoxGeometryTool.createGameObject(state);
          let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
          let state = state |> DisposeJob.execJob(None);
          let (state, _, geometry3) =
            BoxGeometryTool.createGameObject(state);
          let state = state |> DisposeJob.execJob(None);
          (geometry3, BoxGeometryTool.isGeometryDisposed(geometry1, state))
          |> expect == (geometry1, false);
        })
      )
    );
  });