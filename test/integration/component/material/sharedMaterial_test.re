open Wonder_jest;

let _ =
  describe(
    "test shared material",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "shared material can be added to gameObject",
        () => {
          let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
          let (state, gameObject2, material2) =
            MaterialGroupTool.createGameObjectWithSharedMaterial(material1, state);
          state
          |> GameObject.getGameObjectBasicMaterialComponent(gameObject2)
          |> expect == material1
        }
      );
      test(
        "shared material can get the same gameObject(first gameObject)",
        () => {
          let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
          let (state, gameObject2, material2) =
            MaterialGroupTool.createGameObjectWithSharedMaterial(material1, state);
          (
            state |> BasicMaterial.getBasicMaterialGameObject(material1),
            state |> BasicMaterial.getBasicMaterialGameObject(material2)
          )
          |> expect == (gameObject1, gameObject1)
        }
      );
      describe(
        "test clone material component(share material)",
        () => {
          let _createGameObject = (state) => {
            let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state);
            (state, gameObject1, material1)
          };
          let _prepare = (count, state) => {
            open GameObjectType;
            let (state, gameObject1, material1) = _createGameObject(state);
            CloneTool.cloneWithBasicMaterial(state, gameObject1, material1, count, true)
          };
          open GameObject;
          test(
            "cloned materials share material with source material",
            () => {
              let (_, _, material, _, clonedMaterialArr) = _prepare(2, state^);
              clonedMaterialArr |> expect == [|material, material|]
            }
          );
          describe(
            "test init cloned material",
            () => {
              let _createAndInitGameObject = (state) => {
                let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state);
                let state = state |> initGameObject(gameObject1);
                (state, gameObject1, material1)
              };
              let _prepare = (state) => {
                open GameObjectType;
                let state = AllMaterialTool.prepareForInit(state);
                let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ()));
                let (state, gameObject1, material1) = _createAndInitGameObject(state);
                (
                  CloneTool.cloneWithBasicMaterial(state, gameObject1, material1, 2, true),
                  createProgram
                )
              };
              let _initClonedMaterials = (clonedMaterialArr, state) =>
                clonedMaterialArr
                |> ArraySystem.reduceState(
                     [@bs]
                     (
                       (state, clonedMaterial) =>
                         BasicMaterialTool.initMaterial(clonedMaterial, state)
                     ),
                     state
                   );
              test(
                "not init cloned material shader",
                () => {
                  open BasicMaterialType;
                  let ((state, _, material1, _, clonedMaterialArr), createProgram) =
                    _prepare(state^);
                  let callCount = createProgram |> getCallCount;
                  let state = state |> _initClonedMaterials(clonedMaterialArr);
                  createProgram |> getCallCount |> expect == callCount
                }
              )
            }
          );
          describe(
            "test dispose cloned material",
            () => {
              test(
                "not collect dispose index",
                () => {
                  open BasicMaterialType;
                  let (state, _, _, clonedGameObjectArr, clonedMaterialArr) = _prepare(1, state^);
                  let state = state |> BasicMaterialTool.dispose(clonedMaterialArr[0]);
                  let {disposedIndexArray} = BasicMaterialTool.getMaterialData(state);
                  disposedIndexArray |> expect == [||]
                }
              );
              test(
                "dispose all cloned material shouldn't cause really dispose",
                () => {
                  open BasicMaterialType;
                  let (state, _, _, clonedGameObjectArr, clonedMaterialArr) = _prepare(1, state^);
                  let state = state |> BasicMaterialTool.dispose(clonedMaterialArr[0]);
                  let {gameObjectMap} = BasicMaterialTool.getMaterialData(state);
                  gameObjectMap |> expect == [|0|]
                }
              );
              test(
                "dispose all cloned material and source material should cause really dispose",
                () => {
                  open BasicMaterialType;
                  let (state, gameObject1, material1, clonedGameObjectArr, clonedMaterialArr) =
                    _prepare(1, state^);
                  let state = state |> BasicMaterialTool.dispose(clonedMaterialArr[0]);
                  let state = state |> BasicMaterialTool.dispose(material1);
                  state |> BasicMaterialTool.isMaterialDisposed(material1) |> expect == true
                }
              )
            }
          );
          describe(
            "test batch dispose cloned material",
            () => {
              test(
                "not collect dispose index",
                () => {
                  open BasicMaterialType;
                  let (state, _, _, clonedGameObjectArr, clonedMaterialArr) = _prepare(1, state^);
                  let state =
                    state |> GameObject.batchDisposeGameObject([|clonedGameObjectArr[0]|]);
                  let {disposedIndexArray} = BasicMaterialTool.getMaterialData(state);
                  disposedIndexArray |> expect == [||]
                }
              );
              test(
                "dispose all cloned material shouldn't cause really dispose",
                () => {
                  open BasicMaterialType;
                  let (state, _, _, clonedGameObjectArr, clonedMaterialArr) = _prepare(1, state^);
                  let state =
                    state |> GameObject.batchDisposeGameObject([|clonedGameObjectArr[0]|]);
                  let {gameObjectMap} = BasicMaterialTool.getMaterialData(state);
                  gameObjectMap |> expect == [|0|]
                }
              );
              test(
                "dispose all cloned material and source material should cause really dispose",
                () => {
                  open BasicMaterialType;
                  let (state, gameObject1, material1, clonedGameObjectArr, clonedMaterialArr) =
                    _prepare(1, state^);
                  let state =
                    state
                    |> GameObject.batchDisposeGameObject([|gameObject1, clonedGameObjectArr[0]|]);
                  state |> BasicMaterialTool.isMaterialDisposed(material1) |> expect == true
                }
              )
            }
          );
          test(
            "source material's gameObject is cloned material's gameObject",
            () => {
              let (state, gameObject, _, clonedGameObjectArr, clonedMaterialArr) =
                _prepare(2, state^);
              (
                BasicMaterial.getBasicMaterialGameObject(clonedMaterialArr[0], state),
                BasicMaterial.getBasicMaterialGameObject(clonedMaterialArr[1], state)
              )
              |> expect == (gameObject, gameObject)
            }
          );
          describe(
            "should send shared materials' uniform cachable data only once",
            () => {
              let _prepareSendUinformData = (sandbox, state) => {
                let (state, gameObject, _, material, _) =
                  RenderJobsTool.prepareGameObject(sandbox, state);
                let (state, _, cameraTransform, cameraController) =
                  CameraControllerTool.createCameraGameObject(state);
                (
                  state,
                  gameObject,
                  (GameObject.getGameObjectTransformComponent(gameObject, state), material),
                  cameraTransform,
                  cameraController
                )
              };
              let _prepareGameObject = (material, state) => {
                open GameObject;
                open BasicMaterial;
                open BoxGeometry;
                open MeshRenderer;
                open Sinon;
                let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
                let (state, meshRenderer) = createMeshRenderer(state);
                let (state, gameObject) = state |> createGameObject;
                let state =
                  state
                  |> addGameObjectBasicMaterialComponent(gameObject, material)
                  |> addGameObjectGeometryComponent(gameObject, geometry)
                  |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
                (state, gameObject, geometry, meshRenderer)
              };
              let _render = (state: StateDataType.state) => state |> WebGLRenderTool.render;
              test(
                "test send u_color",
                () => {
                  let name = "u_color";
                  let (state, _, (_, material1), _, _) = _prepareSendUinformData(sandbox, state^);
                  let (state, gameObject2, _, _) = _prepareGameObject(material1, state);
                  let color = [|0., 1., 0.2|];
                  let state = state |> BasicMaterial.setBasicMaterialColor(material1, color);
                  let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~uniform3f, ~getUniformLocation, ())
                       );
                  let state =
                    state
                    |> RenderJobsTool.initSystemAndRender
                    |> RenderJobsTool.updateSystem
                    |> _render;
                  (
                    uniform3f |> withOneArg(pos) |> getCallCount,
                    uniform3f |> withOneArg(pos) |> getCall(0) |> getArgs
                  )
                  |> expect == (1, [pos, ...color |> Array.to_list |> Obj.magic])
                }
              )
            }
          )
        }
      )
    }
  );