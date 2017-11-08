open Jest;

let _ =
  describe(
    "test get_camera_data job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithRenderConfig()
        }
      );
      test(
        "set current camera data to state.renderData.cameraData",
        () => {
          let prepareGameObject = (sandbox, state) => {
            open GameObject;
            open BasicMaterial;
            open BoxGeometry;
            open MeshRenderer;
            open Sinon;
            let (state, material) = createBasicMaterial(state);
            let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
            let (state, meshRenderer) = createMeshRenderer(state);
            let (state, gameObject) = state |> createGameObject;
            let state =
              state
              |> addGameObjectMaterialComponent(gameObject, material)
              |> addGameObjectGeometryComponent(gameObject, geometry)
              |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
            (state, gameObject, geometry, material, meshRenderer)
          };
          let createCameraGameObject = (sandbox, state) => {
            open GameObject;
            /* open BasicMaterial; */
            /* open BoxGeometry; */
            /* open MeshRenderer; */
            open CameraController;
            /* open Transform; */
            open Sinon;
            let (state, cameraController) =
              CameraControllerTool.createCameraController_perspectiveCamera(state);
            /* let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
               let (state, meshRenderer) = createMeshRenderer(state); */
            let (state, gameObject) = state |> createGameObject;
            let state =
              state
              /* |> addGameObjectMaterialComponent(gameObject, material) */
              /* |> addGameObjectGeometryComponent(gameObject, geometry) */
              |> addGameObjectCameraControllerComponent(gameObject, cameraController);
            (
              state,
              gameObject,
              getGameObjectTransformComponent(gameObject, state),
              cameraController
            )
          };
          let (state, _, _, _, _) = prepareGameObject(sandbox, state^);
          let (state, _, _, _, _) = prepareGameObject(sandbox, state);
          let (state, _, transform3, cameraController3) = createCameraGameObject(sandbox, state);
          let state = state |> Transform.setTransformLocalPosition(transform3, (1., 2., 3.));
          DebugUtils.log(transform3) |> ignore;
          let init = (state: StateDataType.state) =>
            state
            /* |> GeometryTool.initGeometrys */
            /* |> CameraControllerTool.init */
            /* |> TransformTool.init */
            |> DirectorTool.initSystem
            |> WebGLRenderSystem.init;
          let update = (state: StateDataType.state) => state |> DirectorTool.updateSystem;
          /* |> TransformTool.update
             |> CameraControllerTool.update; */
          let _buildConfigData = () => ([||], "");
          let render = (state: StateDataType.state) =>
            state
            |> GetCameraDataJobSystem.getJob(
                 _buildConfigData(),
                 [@bs] DeviceManagerSystem.getGL(state)
               );
          /* let shaderSource = createEmptyStubWithJsObjSandbox(sandbox); */
          /* let createProgram = createEmptyStubWithJsObjSandbox(sandbox); */
          let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = state |> init |> update |> render;
          /* let state = state |> init |> update; */
          /* DebugUtils.trace(TransformSystem.getLocalToWorldMatrix(transform3, state)) |> ignore; */
          state.renderData.cameraData
          |>
          expect == Some({
                      vMatrix:
                        CameraControllerTool.getWorldToCameraMatrix(cameraController3, state),
                      pMatrix: CameraControllerTool.getPMatrix(cameraController3, state)
                    })
        }
      )
    }
  );