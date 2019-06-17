open StateDataMainType;

let execJob = (configData, state) =>
  RenderBasicJob.execJob(configData, state);

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};

let prepareGameObjectWithGeometry = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open GeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject, geometry, (vertices, texCoords, normals, indices)) =
    GeometryTool.createGameObjectAndSetPointData(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};

let prepareGameObjectWithSharedGeometry = (sandbox, geometry, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  /* let (state, geometry) = BoxGeometryTool.createBoxGeometry(state); */
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};

let prepareGameObjectWithSharedMaterial = (sandbox, material, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open MeshRendererAPI;
  open Sinon;
  /* let (state, material) = createBasicMaterial(state); */
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};

let prepareForDrawElements = (sandbox, state) => {
  let (state, _, geometry, _, meshRenderer) =
    prepareGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, geometry, meshRenderer);
};

let buildNoWorkerJobConfig = () =>
  NoWorkerJobConfigTool.buildNoWorkerJobConfig(
    ~initPipelines=
      {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        },
        {
          "name": "start_time"
        },
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_state"
        },
        {
          "name": "init_basic_material"
        },
        {
          "name": "init_texture"
        }
        ]
    }
]
        |},
    ~initJobs=
      NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
    ~loopPipelines=NoWorkerJobConfigTool.buildNoWorkerLoopPipelineConfig(),
    ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
    (),
  );