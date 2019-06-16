let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open MeshRendererAPI;
  open Sinon;

  let (state, material) = createLightMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};

let prepareGameObjectWithDiffuseMap = (sandbox, diffuseMap, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    prepareGameObject(sandbox, state);
  let state =
    state |> LightMaterialAPI.setLightMaterialDiffuseMap(material, diffuseMap);
  (state, gameObject, geometry, material, meshRenderer, diffuseMap);
};

let prepareGameObjectWithCreatedDiffuseMap = (sandbox, state) => {
  let (state, map) = BasicSourceTextureAPI.createBasicSourceTexture(state);

  prepareGameObjectWithDiffuseMap(sandbox, map, state);
};

let prepareGameObjectWithCreatedMap = (sandbox, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    prepareGameObject(sandbox, state);
  let (state, (texture1, texture2)) =
    LightMaterialTool.createAndSetMaps(material, state);
  (
    state,
    gameObject,
    geometry,
    material,
    meshRenderer,
    (texture1, texture2),
  );
};

let prepareGameObjectWithSharedGeometry =
    (sandbox, geometry, addGameObjectGeometryComponentFunc, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open MeshRendererAPI;
  open Sinon;

  let (state, material) = createLightMaterial(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponentFunc(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
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
          "name": "init_light_material"
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
    ~loopPipelines=
      {|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "tick"
            },
            {
                "name": "dispose"
            },
            {
                "name": "reallocate_cpu_memory"
            },
            {
                "name": "update_transform"
            },
            {
                "name": "update_camera"
            },
            {
                "name": "get_camera_data"
            },
            {
                "name": "create_basic_render_object_buffer"
            },
            {
                "name": "create_light_render_object_buffer"
            },
            {
                "name": "clear_color"
            },
            {
                "name": "clear_buffer"
            },
            {
                "name": "clear_last_send_component"
            },
            {
                "name": "send_uniform_shader_data"
            },
            {
                "name": "render_basic"
            },
            {
                "name": "front_render_light"
            }
        ]
    }
]
        |},
    ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
    (),
  );